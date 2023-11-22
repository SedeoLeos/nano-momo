import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to get the balance of the account in a specific currency
 */
export class GetAccountBalanceInSpecificCurrency extends CoreRequest {
  /**
   *
   * @param {string} currency - ISO4217 Currency Code
   */
  constructor(currency: string) {
    super();
    this.url = `/disbursement/v1_0/account/balance/${currency}`;
    this.method = 'get';
    this.headers = new AxiosHeaders();
  }
}


