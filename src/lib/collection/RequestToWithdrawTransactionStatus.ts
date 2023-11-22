import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * An OAuth2 client credentials grant access token request
 */
export class RequestToWithdrawTransactionStatus extends CoreRequest {
  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the payment request
   */
  constructor(referenceId:string) {
    super();
    this.url = `/collection/v1_0/requesttowithdraw/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}


