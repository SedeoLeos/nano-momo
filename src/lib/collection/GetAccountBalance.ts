import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * An OAuth2 client credentials grant access token request
 */
export class GetAccountBalance extends CoreRequest{
  /**
   *
   *
   */
  constructor() {
    super()
    this.url = '/collection/v1_0/account/balance';
    this.method = 'get';
    this.headers = new AxiosHeaders();
  }
}

