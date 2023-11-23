import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request";

export class GetPreApprovalStatus extends CoreRequest {
  constructor(referenceId:string){
    super();
    this.url = `collection/v2_0/preapproval/${referenceId}`;
    this.headers = new AxiosHeaders();

  }
}
