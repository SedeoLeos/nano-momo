import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * An OAuth2 client credentials grant access token request
 */
export class GetAccountBalanceInSpecificCurrency extends CoreRequest {
  /**
   *
   * @param {string} currency - ISO4217 Currency Code
   */
  constructor(currency:string) {
    super()
    this.url = `/collection/v1_0/account/balance/${currency}`;
    this.method = 'get';
    this.headers = new AxiosHeaders();
  }
}

