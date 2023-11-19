export type PlayloadAccessToken = {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
};
export type PlayloadOauth2 = PlayloadAccessToken & {
  readonly scope: string;
  readonly refresh_token: string;
  readonly refresh_token_expired_in: number;
};
export type Payer = {
  readonly partyIdType: string;
  readonly partyId: string;
};
export type PlayloadBalance = {

    availableBalance: string,
    currency: string

}
export type ErrorReason = {
  readonly code: string;
  readonly message: string;
};
export type PlayloadRequestToPayResult = {
  readonly amount: string;
  readonly currency: string;
  readonly financialTransactionId: string;
  readonly externalid: string;
  readonly ppayee: Payer;
  readonly payerMessage: string;
  readonly payeeNote: string;
  readonly status: string;
  readonly reason: ErrorReason;
};
export type PlayloadUserinfoWithConsent = {
  readonly sub: string;
  readonly name: string;
  readonly given_name: string;
  readonly family_name: string;
  readonly middle_name: string;
  readonly email: string;
  readonly email_verified: true;
  readonly gender: string;
  readonly locale: string;
  readonly phone_number: string;
  readonly phone_number_verified: true;
  readonly address: string;
  readonly updated_at: 0;
  readonly status: string;
  readonly birthdate: string;
  readonly credit_score: string;
  readonly active: true;
  readonly country_of_birth: string;
  readonly region_of_birth: string;
  readonly city_of_birth: string;
  readonly occupation: string;
  readonly employer_name: string;
  readonly identification_type: string;
  readonly identification_value: string;
};
export type PlayloadCashTransfer = {
  readonly payerGender: string;
  readonly payerMsisdn: string;
  readonly payerEmail: string;
  readonly payerLanguageCode: string;
  readonly payerSurName: string;
  readonly payerFirstName: string;
  readonly payerIdentity: string;
  readonly payerIdentificationNumber: string;
  readonly payerIdentificationType: string;
  readonly payeeNote: string;
  readonly payerMessage: string;
  readonly originalCurrency: string;
  readonly originalAmount: string;
  readonly orginatingCountry: string;
  readonly externalId: string;
  readonly payee: Payer;
  readonly currency: string;
  readonly amount: string;
  readonly reason: string;
  readonly status: string;
  readonly financialTransactionId: string;
};
export type PlayloadRequestTopay = {
  readonly amount: string;
  readonly currency: string;
  readonly externalId: string;
  readonly payer: Payer;
  readonly payerMessage: string;
  readonly payeeNote: string;
};
export type PlayloadUserInfo = {
  readonly given_name: string;
  readonly family_name: string;
  readonly birthdate: string;
  readonly locale: string;
  readonly gender: string;
  readonly status: string;
};
export type PlayloadBcauthorizeResponse = {
  readonly auth_req_id: string;
  readonly interval: string;
  readonly expires_in: string;
};
export type PreApprovalResult = Pick<
  PlayloadRequestTopay,
  'payer' | 'payerMessage'
> & {
  readonly payerCurrency: string;
  readonly status: string;
  readonly expirationDateTime: number;
  readonly reason: ErrorReason;
};
export type PaymentResult = {
  readonly referenceId: string;
  readonly status: string;
  readonly financialTransactionId: string;
  readonly reason: ErrorReason;
};
