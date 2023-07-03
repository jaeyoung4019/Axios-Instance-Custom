import axios, {AxiosInstance, AxiosResponse} from "axios";
import {axiosInstance} from "../instance";

export const resourceAASAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_RESOURCE_AAS_URL,
    timeout: 1000 * 10
})

const apiRequestMethod: (
    method: string,
    APIConfig: APIProps
) => Promise<AxiosResponse<any>> = (method: string, APIConfig: APIProps) => {
    const { url, param, multipartUse } = APIConfig;
    const config: any = {
        url: url, // + '?lang=' + nowLanguage()
        timeout: 1000 * 10,
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

    return resourceAASAxiosInstance(config);
}

export const AASRequest = {
    get: (APIConfig: APIProps) => {
        return apiRequestMethod('get', APIConfig );
    },
    post: (APIConfig: APIProps) => {
        return apiRequestMethod('post', APIConfig);
    },
    patch: (APIConfig: APIProps) => {
        return apiRequestMethod('patch', APIConfig);
    },
    delete: (APIConfig: APIProps) => {
        return apiRequestMethod('delete', APIConfig);
    }
};
