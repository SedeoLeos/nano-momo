import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Environment, ProductTypeOption } from "./environement";
import { HttpClient } from "./http-client";
import { TokenCache } from "./token-cache";
import { AccessToken, OptionToken } from "./access_token";
import { ObtainAnAccessTokenRequest } from "./obtain-an-access-token-request";

/**
 * MMApiHttpClient
 */
export class MMApiHttpClient extends HttpClient {
  _cache: any;
  /**
   * @param {Environment} environment - The environment for this client
   * @param {string} refreshToken - The refreshToken to be used to generate the access Token.
   */
  constructor(environment: Environment, refreshToken?: string) {
    console.log(refreshToken)
    super(environment);

    this._cache = TokenCache.cacheForEnvironment(environment);

    this.addInjector(authInjector.bind(this));
  }

  async execute(request: AxiosRequestConfig) {
    try {
      const response = await super
        .execute(request);
      // console.log(`CNS NAME - ${request.constructor.name}`);
      if (request.constructor.name === "CreateAccessToken") {
        const token_data = response.data;
        token_data.product_type = this.environment.options.product_type;
        const token = new AccessToken(token_data);
        this._cache.setToken(token);
        this._cache.notify();
        this._cache.unlock();
      }
      return await Promise.resolve(response);
    } catch (err) {
      if (err.status === 401) {
        if (this.environment.securityOption !== "DEVELOPMENT_LEVEL") {
          return this._retryRequest(request);
        }
      }
      return Promise.reject(err);
    }
  }

  _retryRequest(request: AxiosRequestConfig<any>) {
    const promise = this._cache.wait(request).then(() => {
      this._setAuthHeader(request);
      return super.execute(request);
    });

    if (this._cache.isLocked()) {
      return promise;
    }

    // Avoids node UnhandledPromiseRejectionWarning on access token failure.
    return Promise.race([this.ObtainAnAccessTokenRequest(), promise]).then(
      () => promise
    );
  }

  ObtainAnAccessTokenRequest = async () => {
    this._cache.lock();
    // console.log("No Auth, retrying!!!");
    return super
      .execute(new ObtainAnAccessTokenRequest(this.environment))
      .then((response: AxiosResponse) => {

        response.data.product_type = this.environment.options.product_type;
        const token = new AccessToken(response.data);
        this._cache.setToken(token);
        this._cache.notify();
        this._cache.unlock();
        return Promise.resolve(token);
      })
      .catch((err) => {
        this._cache.setToken(null);
        this._cache.notify(err);
        this._cache.unlock();
        return Promise.reject(err);
      });
  };

  /**
   * Sets the Authorization header for this request based on the client token
   * @param {AxiosRequestConfig} request - The request to modify
   * @private
   * @return {void}
   */
  private _setAuthHeader(request: AxiosRequestConfig): void {
    const token = this._cache.getToken();

    request.headers = request.headers || {};
    request.headers.Authorization = token.authorizationString();
  }

  /**
   *
   */
  setToken(product_type: ProductTypeOption, token: { data: OptionToken }) {
    this._cache.lock();
    token.data.product_type = product_type;
    const _token = new AccessToken(token.data);
    this._cache.setToken(_token);
    this._cache.notify();
    this._cache.unlock();
  }

  /**
   *
   */
  unsetToken(err: any) {
    this._cache.lock();
    this._cache.setToken(null);
    this._cache.notify(err);
    this._cache.unlock();
  }
}

function authInjector(request: AxiosRequestConfig) {
  // console.log(`AUTH INJ - ${request.constructor.name}`);

  if (request.hasOwnProperty("headers")) {
    if (request.headers.hasOwnProperty("X-Callback-URL")) {
      request.headers["X-Callback-URL"] =
        request.headers["X-Callback-URL"] === null
          ? this.environment.callbackUrl
          : request.headers["X-Callback-URL"];
    }
  }

  switch (request.constructor.name) {
    case "GetAPIKey":
    case "CreateUser":
    case "GetCreatedUser":
    case "CreateAccessToken":
    case "ObtainAnAccessTokenRequest":
      return;
    default:
      break;
  }

  switch (this.environment.securityOption) {
    case "DEVELOPMENT_LEVEL":
    // request.headers['Ocp-Apim-Subscription-Key'] = this.environment.options.subscription_key;
    // request.url = `${request.url}`;
    // request.headers.Authorization = this.environment.authorizationString();
    // break;
    case "STANDARD_LEVEL":
    case "ENHANCED_LEVEL":
      request.headers["Ocp-Apim-Subscription-Key"] =
        this.environment.options.subscription_key;
      request.headers["X-Target-Environment"] = this.environment.type;
      request.url = `${request.url}`;

      if (request.headers.Authorization) {
        return;
      }

      if (this._cache.isValid()) {
        return this._setAuthHeader(request);
      } else if (this._cache.isLocked()) {
        return this._cache
          .wait(request)
          .then(() => this._setAuthHeader(request));
      } else if (!this._cache.isValid()) {
        return Promise.all([
          this._cache.wait(request),
          this.ObtainAnAccessTokenRequest(),
        ]).then(() => this._setAuthHeader(request));
        // .catch(() => { });
      }
      break;
    default:
      request.url = `${request.url}`;
      break;
  }
}

