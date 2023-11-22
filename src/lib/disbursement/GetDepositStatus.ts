import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to check the status of the particular Deposit
 */
export class GetDepositStatus extends CoreRequest {
  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the transfer request
   */
  constructor(referenceId:string) {
    super();
    this.url = `/disbursement/v1_0/deposit/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}

