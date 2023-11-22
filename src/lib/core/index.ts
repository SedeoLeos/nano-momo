import { AccessToken } from './access_token';
import { Environment } from './environement';
import { MMApiHttpClient } from './momo-client';
import { CreateUser, GetAPIKey, GetCreatedUser } from './momo-sandbox';
import { ObtainAnAccessTokenRequest } from './obtain-an-access-token-request';
import { FormEncoded } from './serializer';
import { TokenCache } from './token-cache';

class Sandbox {
  private _client: MMApiHttpClient;

  /**
   *
   * @param {Environment} environment - The environment data
   */
  constructor(environment: Environment) {
    this._client = new MMApiHttpClient(environment);
  }

  /**
   *
   * @param {string} callbackURL
   * @returns {Promise<CreateUser>}
   */
  async createUser(callbackURL: string): Promise<CreateUser> {
    let _request = new CreateUser(this._client.environment, callbackURL);
    let _response = await this._client.execute(_request);
    _response.data = {
      status: true,
      referenceId: this._client.environment.xReferenceId,
    };
    return _response;
  }

  /**
   *
   * @param {uuid} referenceID
   * @returns {Promise<GetCreatedUser>}
   */
  async getUserDetails(referenceID: string): Promise<GetCreatedUser> {
    let _request = new GetCreatedUser(this._client.environment, referenceID);
    return await this._client.execute(_request);
  }

  /**
   *
   * @param {uuid} referenceID
   * @returns {Promise<GetAPIKey>}
   */
  async createApiKey(referenceID: string): Promise<GetAPIKey> {
    let _request = new GetAPIKey(this._client.environment, referenceID);
    return await this._client.execute(_request);
  }
}

export const core = {
  Environment,
  AccessToken,
  ObtainAnAccessTokenRequest,
  MMApiHttpClient,
  TokenCache,
  FormEncoded,
  Sandbox,
};
