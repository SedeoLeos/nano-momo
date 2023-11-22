import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to check the status of the particular refund
 */
export class GetRefundStatus extends CoreRequest{
  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the refund   request
   */
  constructor(referenceId:string) {
    super();
    this.url = `/disbursement/v1_0/refund/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}


