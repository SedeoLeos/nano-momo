import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

/**
 * Remittance transfer status API
 */
export class GetTransferStatus extends CoreRequest{
  /**
   * @param {string} referenceId - Reference id used when creating the request to pay.
   *
   */
  constructor(referenceId:string) {
    super();
    this.url = `/remittance/v1_0/transfer/${referenceId}`;
    this.method = "get";
    this.headers = new AxiosHeaders();
  }
}

