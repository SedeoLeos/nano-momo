import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to check the Status of the particular Payment Transaction
 */
export class RequestToPayTransactionStatus extends CoreRequest {
  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the payment request
   */
  constructor(referenceId:string) {
    super();
    this.url = `/collection/v1_0/requesttopay/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}

