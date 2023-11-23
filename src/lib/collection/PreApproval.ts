import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";
export type PreApprovalBody = {
  payer:Payer;
  payerCurrency:string;
  payerMessage:string;
  validityTime:number;
}
type Payer = {
  partyIdType:string;
  partyId:string;
}
export class PreApproval extends CoreRequest {

  constructor(referenceId:string,option: PreApprovalBody){
 super();
 this.url ='collection/v2_0/preapproval';
 this.data = option;
 this.method = 'post'
 this.headers = new AxiosHeaders();
 this.headers.set('X-Reference-Id',referenceId);
 this.headers.setContentType('application/json');

  }
}
