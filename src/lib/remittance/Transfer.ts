import { AxiosHeaders } from "axios";
import { RemittanceObject } from "./RemittanceObject";


/**
 * Transfer API
 *
 */
export class Transfer extends RemittanceObject {
  constructor(referenceId:string) {
    super();
    this.url = "/remittance/v1_0/transfer";
    this.method = "post";
    this.headers = new AxiosHeaders();
    this.headers.set("X-Reference-Id", referenceId)

  }

  body(body:any) {
    this.data = body;
  }

  callback(xCallbackUrl:string) {
    this.headers.set("X-Callback-URL", xCallbackUrl);
    return this;
  }

  contentType(contentType:string) {
    this.headers.set("contentType", contentType);
    return this;
  }
}

