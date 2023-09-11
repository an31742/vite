import type { AxiosRequestConfig, AxiosResponse } 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> { 
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch?: (error: any) => any
    responseInterceptor?: (res: T) => T
    responseInterceptorCatch?:(error: any)=>any    
}


export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: HYRequestInterceptors<T>
    showLoading?: boolean
  }