import axios, {AxiosInstance, AxiosResponse} from "axios";


export const authAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_URL,
    timeout: 1000 * 10
})

export const resourceUserAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_RESOURCE_USER_URL,
    timeout: 1000 * 10
})

export const resourceAASAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_RESOURCE_AAS_URL,
    timeout: 1000 * 10
})


const apiConfigSetting: (
    method: string,
    APIConfig: APIProps,
    instance: AxiosInstance
) => Promise<AxiosResponse<any>> = (method: string, APIConfig: APIProps , instance: AxiosInstance) => {
    const { url, param, multipartUse } = APIConfig;
    const config: any = {
        url: url, // + '?lang=' + nowLanguage()
        method: method,
    };

    multipartUse
        ? (config.headers = {
            'Content-Type': 'multipart/form-data; charset=utf-8',
        })
        : (config.headers = {
            'Content-Type': 'application/json; charset=utf-8',
        });
    method === 'get' || method === 'delete'
        ? (config.params = param)
        : (config.data = param);

    return instance(config);
}

export const apiRequest = {
    iam: {
        get: (APIConfig: APIProps) => {
            return apiConfigSetting('get', APIConfig , resourceUserAxiosInstance );
        },
        post: (APIConfig: APIProps) => {
            return apiConfigSetting('post', APIConfig , resourceUserAxiosInstance);
        },
        patch: (APIConfig: APIProps) => {
            return apiConfigSetting('patch', APIConfig , resourceUserAxiosInstance);
        },
        delete: (APIConfig: APIProps) => {
            return apiConfigSetting('delete', APIConfig , resourceUserAxiosInstance);
        }
    },
    aas: {
        get: (APIConfig: APIProps) => {
            return apiConfigSetting('get', APIConfig , resourceAASAxiosInstance);
        },
        post: (APIConfig: APIProps) => {
            return apiConfigSetting('post', APIConfig  ,resourceAASAxiosInstance);
        },
        patch: (APIConfig: APIProps) => {
            return apiConfigSetting('patch', APIConfig , resourceAASAxiosInstance);
        },
        delete: (APIConfig: APIProps) => {
            return apiConfigSetting('delete', APIConfig , resourceAASAxiosInstance);
        }
    },
    auth: {
        get: (APIConfig: APIProps) => {
            return apiConfigSetting('get', APIConfig , authAxiosInstance );
        },
        post: (APIConfig: APIProps) => {
            return apiConfigSetting('post', APIConfig , authAxiosInstance);
        },
    }

};