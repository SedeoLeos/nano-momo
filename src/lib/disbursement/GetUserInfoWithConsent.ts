import { AxiosHeaders } from "axios";
import { Environment } from "../core/environement";
import { CoreRequest } from "../core/core-request";

/**
 * Request to claim a consent by the account holder for the requested scopes
 */
export class GetUserInfoWithConsent extends CoreRequest {
    /**
     * @param {Environment} environment - The environment for this request (sandbox or live)
     * @param {string} token - The auth2 token
     *
     */
    constructor(environment:Environment, token:string) {
      super();
      this.url = `/disbursement/oauth2/v1_0/userinfo`;
      this.method = 'get';
      this.headers = new AxiosHeaders();
      this.headers.setContentType('application/x-www-form-urlencoded')
      this.headers.setAuthorization(token);
      this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)

    }
  }

  
