import { AxiosHeaders } from "axios";
import { Environment } from "../core/environement";
import { CoreRequest } from "../core/core-request";

const { FormEncoded } = require('../core/serializer');

/**
 * An OAuth2 client credentials grant access token request
 */
export class CreateAccessToken  extends CoreRequest{

  /**
   * @param {Environment} environment -
   * The environment for this request (sandbox or live)
   */
  constructor(environment:Environment) {
    super();
    const body = {
      grant_type: 'client_credentials',
    };
    this.url = '/collection/token/';
    this.method = 'post';
    this.data = new FormEncoded().encode(body);
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/x-www-form-urlencoded')
    this.headers.setAuthorization( environment.authorizationString())
    this.headers.set('Ocp-Apim-Subscription-Key',environment.options.subscription_key)

  }
}


