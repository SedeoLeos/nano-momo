import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

export class GetPayment extends CoreRequest {
  constructor(referenceId:string){
    super();
    this.url = `collection/v2_0/payment/${referenceId}`;
    this.headers = new AxiosHeaders();

  }
}
