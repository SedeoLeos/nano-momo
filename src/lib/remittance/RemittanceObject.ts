import { CoreRequest } from "../core/core-request";

/**
 * Remittance object definition
 */
export class RemittanceObject extends CoreRequest {
  constructor() {
    super();
    this.data = {};
  }

  notificationMessage(notificationMessage:string) {
    this.data["notificationMessage"] = notificationMessage;
    return this;
  }

  amount(amount:string) {
    this.data["amount"] = amount;
    return this;
  }

  currency(currency:string) {
    this.data["currency"] = currency;
    return this;
  }

  externalId(externalId:string) {
    this.data["externalId"] = externalId;
    return this;
  }

  payee(payee:string) {
    this.data["payee"] = payee;
    return this;
  }

  payerMessage(payerMessage:string) {
    this.data["payerMessage"] = payerMessage;
    return this;
  }

  payeeNote(payeeNote:string) {
    this.data["payeeNote"] = payeeNote;
    return this;
  }

  authReqId(authReqId:string) {
    this.data["authReqId"] = authReqId;
    return this;
  }

  loginHint(msisdn:string) {
    this.data["login_hint"] = `ID:${msisdn}/MSISDN`;
    return this;

  }

  scope(scope:string) {
    this.data["scope"] = scope;
    return this;

  }

  accessType(accessType:string) {
    this.data["access_Type"] = accessType;
    return this;
  }
}

