import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

export class GetCashTransferStatus extends CoreRequest {
  /**
  **** @param {string} referenceId -
  **/
  constructor(referenceId:string){
    super();
    this.url =`remittance/v2_0/cashtransfer/${referenceId}`;
    this.headers = new AxiosHeaders();
  }
}
