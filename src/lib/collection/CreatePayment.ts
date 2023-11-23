import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";
export type CreatePaymentsBody = {
  externalTransactionId:string;
  money:Money;
  customerReference:string;
  serviceProviderUserName:string;
  couponId:string;
  productId:string;
  productOfferingId:string;
  receiverMessage:string;
  senderNote:string;
  maxNumberOfRetries:number;
  includeSenderCharges:boolean;
}
type Money = {
  amount:string;
  currency:string;
}
export class CreatePayment extends CoreRequest {

  constructor(referenceId:string,option:CreatePaymentsBody){
 super();
 this.url ='collection/v2_0/payment';
 this.data = option;
 this.method = 'post'
 this.headers = new AxiosHeaders();
 this.headers.set('X-Reference-Id',referenceId);

  }
}
