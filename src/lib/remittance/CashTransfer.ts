import { AxiosHeaders } from "axios";
import { CoreRequest } from "../core/core-request"
type Party = {
  partyIdType: 'MSISDN' | 'EMAIL' | 'PARTY_CODE',
  partyId: string
}
export type CashTransferBody = {
  amount: string;
  currency: string,
  payee: Party
  externalId: string
  orginatingCountry: string;
  originalAmount: string


  originalCurrency: string,



  payerMessage: string,


  payeeNote: string,


  payerIdentificationType: "PASS" |
  "CPFA" |
  "SRSSA" |
  "NRIN" |
  "OTHR" |
  "DRLC" |
  "SOCS" |
  "AREG" |
  "IDCD" |
  "EMID";


  payerIdentificationNumber: string


  payerIdentity: string


  payerFirstName: string


  payerSurName: string


  payerLanguageCode: string


  payerEmail: string


  payerMsisdn: string


  payerGender: string
}
export class CashTransfer extends CoreRequest {
  /**
   *  @param {string} referenceId - Format - UUID. Recource ID of the created ‘request-to-pay’ transaction. This ID is
   *  used for e.g. validating the status of the request. Universal Unique ID for the transaction generated using UUID version 4.
   *  @param {CashTransferBody} option
   *  @param {string} option.amount @required - Amount that will be debited from the payer account.
   *  @param {string} option.currency  - ISO4217 Currency
   *  @param {Party} option.payee - Party identifies a account holder in the wallet platform. Party consists of two parameters, type and partyId. Each type have its own validation of the partyId
   *  @param {'MSISDN' | 'EMAIL' | 'PARTY_CODE'} option.payee.partyIdType MSISDN - Mobile Number validated according to ITU-T E.164. Validated with IsMSISDN
   *  EMAIL - Validated to be a valid e-mail format. Validated with IsEmail
   *  PARTY_CODE - UUID of the party. Validated with IsUuid
   *  @param {string} option.payee.partyId - id of payee
   *  @param {uuid} option.externalId - External id is used as a reference to the transaction. External id is used for reconciliation. The external id will be included in transaction history report.
   *  External id is not required to be unique.
   *  @param {string} option.orginatingCountry - Country where the request came from
   *  @param {string} option.originalAmount - Amount that was sent before any foreign exchange
   *  @param  {string} option.originalCurrency - ISO4217 Currency of the originalAmount
   *  @param {string} option.payerMessage - Message that will be written in the payer transaction history message field
   *  @param {string} option.payeeNote - Message that will be written in the payee transaction history note field.
   *  @param {"PASS" |"CPFA" |"SRSSA" |"NRIN" |"OTHR" |"DRLC" | "SOCS" |"AREG" | "IDCD" |"EMID} option.payerIdentificationType - Identification type of the payer
   *  @param {string} option.payerIdentificationNumber - Identification type of the payer
   *  @param {string} option.payerIdentity  - Identification of the payer
   *  @param {string} option.payerFirstName - FirstName
   *  @param {string} option.payerSurName - SurName
   *  @param {string} option.payerLanguageCode - LanguageCode
   *  @param {string} option.payerEmail - Email
   *  @param {string} option.payerMsisdn - Msisdn
   *  @param {string} option.payerGender - GenderCode according to ISO 20022
   *
   * **/
  constructor(referenceId: string, option: CashTransferBody) {
    super();
    this.url = '/remittance/v2_0/cashtransfer';
    this.method = 'post'
    this.data = option;
    this.headers = new AxiosHeaders();
    this.headers.set('X-Reference-Id',referenceId)
    this.headers.setContentType('application/json')
  }
}
