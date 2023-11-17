
import { Payer } from './outputs.type';
export type CreateAccessInput = {
  readonly user_api: string;
  readonly api_key: string;
  readonly callback?: string;
};

export type ValidateAccountHolderStatusInput = CreateAccessInput & {
  readonly accountHolderIdType: string;
  readonly accountHolderId: string;
};
export type RequestToPayInput = CreateAccessInput & {
  readonly referenceId: string;
  readonly version?: 'v1_0' | 'v2_0';
};
export type RequestToDepotInput = RequestToPayInput;

export type RequestGetUserInfoInput = CreateAccessInput & {
  readonly accountHolderMSISDN: string;
};
export type RequestGetAccountBalanceInput = CreateAccessInput & {
  readonly currency?: string;
};
export type BodyRequestTopayInput = {
  readonly externalId: string;
  readonly amount: string;
  readonly currency: string;
  readonly payee: Payer;
  readonly payerMessage: string;
  readonly payeeNote: string;
};
export type BodyRequestToDepotInput = BodyRequestTopayInput;
export type BodyRequestToRefund = Omit<BodyRequestTopayInput, 'payee'> & {
  readonly BodyRequestTopayInput: string;
};
export type BodyInvoiceInput = Omit<
  BodyRequestTopayInput,
  'payerMessage' | 'payeeNote'
> & {
  readonly validityDuration: string;
  readonly intendedPayer: Payer;
  readonly description: string;
};
export type RequesttoPayDeliveryNotificationInput = RequestToPayInput & {
  readonly notificationMessage: string;
  readonly language?: string;
};
export type BodyRequesttoPayDeliveryNotificationInput = {
  readonly notificationMessage: string;
};
export type LoginHint = (msisdn: string) => string;
export const createLoginHint: LoginHint = (msisdn) => `ID:${msisdn}/MSISDN`;
export type BcAuthorizeInput = CreateAccessInput;

export class BodyBcAuthorize {
  readonly login_hint: string;
  readonly scope: string;
  readonly access_type: 'online' | 'offline';

  constructor(
    login_hint: string,
    scope: string,
    access_type: 'online' | 'offline'
  ) {
    this.login_hint = `ID:${login_hint}/MSISDN`;
    this.scope = scope;
    this.access_type = access_type;
  }
  toObject(): Record<
    string,
    | string
    | number
    | boolean
    | readonly number[]
    | readonly string[]
    | readonly boolean[]
    | null
  > {
    return {
      login_hint: this.login_hint,
      scope: this.scope,
      access_type: this.access_type
    };
  }
}
export class BodyOauth2Token {
  readonly grant_type: string;
  readonly auth_req_id: string;

  constructor(auth_req_id: string) {
    this.grant_type = `urn:openid:params:grant-type:ciba`;
    this.auth_req_id = auth_req_id;
  }
  toObject(): Record<
    string,
    | string
    | number
    | boolean
    | readonly number[]
    | readonly string[]
    | readonly boolean[]
    | null
  > {
    return {
      grant_type: this.grant_type,
      auth_req_id: this.auth_req_id
    };
  }
}
export type BodyPreApproval = {
  readonly payer: Payer;
  readonly payerCurrency: string;
  readonly payerMessage: string;
  readonly validityTime: number;
};
