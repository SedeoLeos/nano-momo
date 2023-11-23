import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";
export type CancelInvoiceBody = {
  externalId:string
}
export class CancelInvoice extends CoreRequest {

  /**
   * @param {string} referenceId
   * @param {CancelInvoiceBody} option
   * @param {string} option.externalId
   * **/
  constructor(referenceId:string,reference:string,option:CancelInvoiceBody){
    super();
    this.url = `collection/v2_0/invoice/${referenceId}`;
    this.method = 'delete';
    this.data = option;
    this.headers = new AxiosHeaders();
    this.headers.set('X-Reference-Id',reference);
    this.headers.setContentType('application/json');
  }
}
