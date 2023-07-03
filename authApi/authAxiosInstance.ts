import axios, {AxiosInstance, AxiosResponse} from "axios";

export const authAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_URL,
    timeout: 1000 * 10
})

const apiRequestMethod: (
    method: string,
    config: Pick<ApiProps , 'url' | 'params' >
) => Promise<AxiosResponse<any>> = (method: string, config : Pick<ApiProps , 'url' | 'params' >) => {
    const {url , params} = config;
    const apiConfig: any = {
        url: url,
        timeout: 1000 * 10,
        method: method
    }
    apiConfig.headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }
    method === 'get' || method === 'delete'
        ? (apiConfig.params = params)
        : (apiConfig.data = params);

    return authAxiosInstance(apiConfig)
}

export const authRequest = {
    get: (config: Pick<ApiProps , 'url' | 'params' >) => {
        return apiRequestMethod('get', config );
    },
    post: (config: Pick<ApiProps , 'url' | 'params' >) => {
        return apiRequestMethod('post', config);
    }
}
