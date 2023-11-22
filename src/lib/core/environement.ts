const SANDBOX = "https://sandbox.momodeveloper.mtn.com";
const LIVE = "https://sandbox.momodeveloper.mtn.com";
export  enum EnvironmentType {
  PROD ="production",
  DEV ="developement"
}
export type SecurityOption = 'DEVELOPMENT_LEVEL' | 'STANDARD_LEVEL' | 'ENHANCED_LEVEL'
export type ProductTypeOption = 'collection' | 'disbursement' | 'remittance'

export type EnvironmentOption = {
  product_type:string,
  api_key?:string,
  subscription_key:string,
  subscription_key_2:string,
  security:SecurityOption
}
export class Environment {
  baseUrl: string;
  type: EnvironmentType;
  xReferenceId: string;
  securityOption: SecurityOption;
  callbackUrl: string;
  options?: EnvironmentOption;

  /**
   * @param {string} xReferenceId - Format - UUID. Resource ID for the API user to be created. UUID version 4 is required.
   * @param {EnvironmentType} type - The type of environment
   * @param {string} callbackUrl - The default callback URL for the environment
   * @param {EnvironmentOption} options - The additional options required for the environment
   * @param {string} options.product_type - The type of product for the environment
   * @param {string} options.api_key - API key for environment operations
   * @param {string} options.subscription_key - Main subscription key for environment operations
   * @param {string} options.subscription_key_2 - Alternate subscription key for environment operations | optional
   * @param {SecurityOption} options.security - The security level - DEVELOPMENT_LEVEL, STANDARD_LEVEL, or ENHANCED_LEVEL
   */
  constructor(
    xReferenceId: string,
    type: EnvironmentType,
    callbackUrl: string,
    options?: EnvironmentOption
  ) {
    this.baseUrl = type === "production" ? LIVE : SANDBOX;
    this.type = type;
    this.xReferenceId = xReferenceId;
    this.securityOption = options.security ? options.security : "DEVELOPMENT_LEVEL";
    this.callbackUrl = callbackUrl;
    delete options.security;
    this.options = options;
  }

  set setAPIKey(value:string) {
    this.options.api_key = value;
  }

  set setSubscriptionKey(value:string) {
    this.options.subscription_key = value;
  }

  set setSubscriptionKey2(value:string) {
    this.options.subscription_key_2 = value;
  }

  /**
   * Authorization header string for basic authentication with the current consumer key and secret
   * @return {string} - The authorization header value
   */
  authorizationString(): string {
    let apiKey = this.options.api_key;
    const encoded = Buffer.from(
      `${this.xReferenceId}:${apiKey}`
    ).toString("base64");
    return `Basic ${encoded}`;
  }
}


