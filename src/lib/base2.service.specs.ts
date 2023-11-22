
// import { SuccessResult } from '../types/outputs.type';
import { BaseService } from './base.service';

describe('Test du service de base', () => {
  const base = new BaseService({
    baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
    env: 'sandbox',
    subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
  });
  // test('initialization du base create token', async () => {

  //   const result = await base.createAccessToken({ api_key: 'a1a1b74f08e34014bf185417e009d138', user_api: '60f7437e-b01b-4133-b314-40545a0f5ca6' });
  //   expect(result).toBeInstanceOf(SuccessResult)
  //   expect(result.status).toBe(200);
  // })





})
