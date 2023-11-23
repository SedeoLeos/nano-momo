import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

export class GetInvoice extends CoreRequest {
  constructor(referenceId:string){
    super();
    this.url = `collection/v2_0/invoice/${referenceId}`;
    this.headers = new AxiosHeaders();
   
  }
}
