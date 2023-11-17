

import { BaseService } from "./base.service"




test('Initialisation du service de base avec le produit collection', async () => {
    const base = new BaseService({baseUrl:'https://sandbox.momodeveloper.mtn.com/collection',env:'sandbox',subscriptionId:'b0f5afe7e38f499383c49cb472ba60b9'})
    const data = await base.createAccessToken({api_key:'',user_api:''})
    expect(data).toEqual(null)
  });