
# Axios Instance 리팩토링

![image](https://github.com/jaeyoung4019/Axios-Instance-Custom/assets/135151752/3126e776-ab8e-4413-819d-075cc9de2afe)

기존에 이렇게 설계되어 있었던 axios 를

```ts
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


```

```ts

import axios, {AxiosInstance, AxiosResponse} from "axios";
import {axiosInstance} from "../instance";

export const resourceUserAxiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_RESOURCE_USER_URL,
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

    return resourceUserAxiosInstance(config);
};

export const iamRequest = {
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

```

파일 이 많아지고 기능은 같은데 다른 방향을 바라본다는 이유만으로 새로운 파일을 가지는 것이 아니라고 생각되었다.

그래서 하나의 파일로 합쳐서 처리하도록 했다.

## 리팩토링 후

```ts
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
    ass: {
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
```


### Call Back

```ts

    const logoutButtonOnClick = () => {
        const api = new ApiConfig.Builder().setUrl("/test").build();
        apiRequest.iam.get(api)
    };

```
