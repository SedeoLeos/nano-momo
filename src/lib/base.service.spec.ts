import { BaseService } from './base.service';

describe('Test du service de base',()=>{

  test('initialisation du base create token',async ()=>{
    const base = new BaseService({
      baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
      env: 'sandbox',
      subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
    });
    const result = await base.createAccessToken({ api_key: 'a1a1b74f08e34014bf185417e009d138', user_api: '60f7437e-b01b-4133-b314-40545a0f5ca6'});
    expect(result.satus).toBe(200);
    expect(result.success).toBe(true);
  })
  test('initialisation du base get user info token',async ()=>{
    const base = new BaseService({
      baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
      env: 'sandbox',
      subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
    });
    const result = await base.getBasicUserInfo({
        user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
        api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
        accountHolderMSISDN: "242066900110"
      });
      expect(result.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Object);
  })

  test('initialisation du base get balance',async ()=>{
    const base = new BaseService({
      baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
      env: 'sandbox',
      subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
    });
    const result = await base.getAccountBalance({
        user_api: 'bc216ec6-7e07-4d7a-a4c6-2c847772c1b9',
        api_key: 'fb5230f2206b4ddb98bd325f58c885b6',
        callback: "www.example",

      });

      expect(result.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Object);
  })


})
