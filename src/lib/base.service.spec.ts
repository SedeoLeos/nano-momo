import { BodyBcAuthorize, BodyOauth2Token } from '../types/inputs.type';
import { SuccessResult } from '../types/outputs.type';
import { BaseService } from './base.service';

describe('Test du service de base', () => {
  const base = new BaseService({
    baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
    env: 'sandbox',
    subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
  });
  test('initialization du base create token', async () => {

    const result = await base.createAccessToken({ api_key: 'a1a1b74f08e34014bf185417e009d138', user_api: '60f7437e-b01b-4133-b314-40545a0f5ca6' });
    expect(result).toBeInstanceOf(SuccessResult)
    expect(result.status).toBe(200);
  })
  test('initialization du base get user info token', async () => {
    const result = await base.getBasicUserInfo({
      user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
      api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
      accountHolderMSISDN: "242066900110"
    });
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.status).toBe(200);

  })

  test('initializations du base get balance', async () => {
    const result = await base.getAccountBalance({
      user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
      api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
      callback: "",

    });
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.status).toBe(200);
    expect(result.data).toBeInstanceOf(Object);
  })
  test('initialization du bcAuthorize', async () => {


    const body = new BodyBcAuthorize('242066904110', 'all_info', 'offline');
    const result = await base.bcAuthorize({
      user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
      api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
      callback: ''
    }, body)
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.status).toBe(200);
    expect(result.data).toBeInstanceOf(Object);
  }, 50000)

  test('initialization du oauth2', async () => {
    const body = new BodyOauth2Token('200001cc-3632-49ef-b42f-c213673c7f5b');
    const result = await base.createOauth2Token({
      user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
      api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
    }, body);
    expect(result).toBeInstanceOf(SuccessResult);
    expect(result.status).toBe(200);
    expect(result.data).toBeInstanceOf(Object);
  }, 50000)


  test('initialization du validation', async () => {
    const result = await base.validateAccountHolderStatus({
      user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
      api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
      accountHolderIdType: 'msisdn',
      accountHolderId: '0242066900110'
    });
    expect(result).toBeInstanceOf(SuccessResult);
  }, 50000)

  test('initialization du validation', async () => {
    const result = await base.getUserInfoWithConsent({
      Authorization:''
    });
    expect(result).toBeInstanceOf(SuccessResult);
  }, 50000)

})
