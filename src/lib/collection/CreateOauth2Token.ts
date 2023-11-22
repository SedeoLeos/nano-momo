import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";
import { Environment } from "../core/environement";

const { FormEncoded } = require("../core/serializer");

/**
 * Request to claim a consent by the account holder for the requested scopes
 */
export class CreateOauth2Token extends CoreRequest {
  /**
   * @param {Environment} environment - The environment for this request (sandbox or live)
   * @param {string} auth_req_id - The authorization request ID
   */
  constructor(environment:Environment, auth_req_id:string) {
    super();
    const body = {
      grant_type: "urn:openid:params:grant-type:ciba",
      auth_req_id: auth_req_id,
    };
    this.url = "/collection/oauth2/token/";
    this.method = "post";
    this.data = new FormEncoded().encode(body);
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/x-www-form-urlencoded');
    this.headers.setAuthorization(environment.authorizationString())
    this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)

  }
}

