import { AxiosHeaders } from "axios";
import { Environment } from "./environement";
import { FormEncoded } from "./serializer";


/**
 * An OAuth2 client credentials grant access token request
 */

export class ObtainAnAccessTokenRequest {
  url: string;
  method: string;
  data: any;
  headers: AxiosHeaders
  // { 'Content-Type': string; Authorization: string; 'Ocp-Apim-Subscription-Key': string; };
  /**
   * @param {MobileMoneyApiEnvironment} environment -
   * The environment for this request (sandbox or live)
   */
  constructor(environment:Environment) {
    const body = {
      grant_type: 'client_credentials',
    };
    // let subscription_key = environment.options.subscription_key;
    this.url = `/${environment.options.product_type}/token/`;
    this.method = 'post';
    this.data = new FormEncoded().encode(body);
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/x-www-form-urlencoded');
    this.headers.setAuthorization(environment.authorizationString());
    this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)
  }
}

