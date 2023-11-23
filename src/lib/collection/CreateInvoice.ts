import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";
export type CreateInvoiceBody = {
  externalId:string
  amount:string;
  currency:string;
  validityDuration:string;
  intendedPayer:Party;
  payee:Party;
  description:string;
}
type Party = {
  partyIdType: string,
  partyId:string
}
export class CreateInvoice extends CoreRequest {

  /***
   *   @constructor
   *   @param {string} referenceId
   *   @param  {CreateInvoiceBody} option
   *
   * **/
  constructor(referenceId:string,option:CreateInvoiceBody){
    super();
    this.url = 'collection/v2_0/invoice';
    this.method = 'post'
    this.data = option;
    this.headers = new AxiosHeaders();
    this.headers.setContentType('application/json');
    this.headers.set('X-Reference-Id',referenceId);
  }
}
