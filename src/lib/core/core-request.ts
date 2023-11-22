import { AxiosHeaders, AxiosRequestConfig } from "axios";

export class CoreRequest  implements AxiosRequestConfig {
  url: string;
  method: string;
  data: any;
  headers:AxiosHeaders;
  


}
