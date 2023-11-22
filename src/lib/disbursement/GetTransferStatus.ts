import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Request to check the Status of the particular Transfer
 */
export class GetTransferStatus extends CoreRequest {
  /**
   *
   * @param {uuid} referenceId - The unique reference ID of the transfer request
   */
  constructor(referenceId:string) {
    super();
    this.url = `/disbursement/v1_0/transfer/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}


