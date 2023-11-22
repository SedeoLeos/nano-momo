import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Environment } from './environement';

export class HttpClient {
  environment: Environment;
  _injectors:((config: AxiosRequestConfig)=>any)[];
  baseURL: string;
  instance: AxiosInstance;
  constructor(environment:Environment) {
    this.environment = environment;
    this._injectors =[];
    this.baseURL = this.environment.baseUrl;
    this.instance = axios.create({
      baseURL: this.baseURL,
    });
  }

  execute(req: AxiosRequestConfig):Promise<AxiosResponse> {
    const injectorPromises = this._injectors.map((injector) => injector(req));
    return new Promise((resolve, reject) => Promise.all(injectorPromises).then(() => {
      this.instance.request(req)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.response) {
            reject(error.response);
          } else if (error.request) {
            reject(error.request);
          } else {
            reject(error.message);
          }
        });
    }));
  }

  addInjector(injector:(config: AxiosRequestConfig)=>any) {
    if (typeof injector !== 'function' || injector.length !== 1) {
      throw new Error('injector must be a function that takes one argument');
    }

    this._injectors.push(injector);
  }

  set setAPIKey(value:string) {
    this.environment.setAPIKey =value;
  }
}

