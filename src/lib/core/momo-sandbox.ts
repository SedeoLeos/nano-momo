import { AxiosHeaders } from "axios";
import { Environment } from "./environement";

export class CreateUser {
  url: string;
  method: string;
  data: { providerCallbackHost: string; };
  headers:AxiosHeaders;
  constructor(environment:Environment, callback_url:string) {
    // this.environment = environment;
    this.url = "/v1_0/apiuser";
    this.method = "post";
    this.data = {
      providerCallbackHost: callback_url,
    };
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/json')
    this.headers.set('X-Reference-Id',environment.xReferenceId)
    this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)

  }
}

export class GetCreatedUser {
  environment: any;
  url: string;
  method: string;
  headers: AxiosHeaders;
  constructor(environment:Environment, referenceID:string) {
    this.environment = environment;
    this.url = `/v1_0/apiuser/${referenceID}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
    this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)

  }
}

export class GetAPIKey {
  environment: any;
  url: string;
  method: string;
  headers:AxiosHeaders;
  constructor(environment, referenceID) {
    this.environment = environment;
    this.url = `/v1_0/apiuser/${referenceID}/apikey`;
    this.method = "post";
    this.headers = new AxiosHeaders();
    this.headers.set('Ocp-Apim-Subscription-Key', environment.options.subscription_key)

  }
}


