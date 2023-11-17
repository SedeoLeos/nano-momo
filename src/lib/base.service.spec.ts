import { BaseService } from './base.service';
import { ProvioningController } from './provisionning';

test('Initialisation du service de base avec le produit collection', async () => {
  const base = new BaseService({
    baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
    env: 'sandbox',
    subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
  });
  const data = await base.createAccessToken({ api_key: '', user_api: '' });
  expect(data).toEqual(null);
});
test('Initialisation du service de base av', async () => {
  const callbackhost =
    "https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7";
  const subriction_id = "b0f5afe7e38f499383c49cb472ba60b9";
  const provisionning = new ProvioningController(subriction_id, callbackhost);
  const apiToken = await provisionning.createApikey();
  console.log(apiToken)
  // const userApi = await provisionning.createUserId();
  // console.log(userApi)
  // const base = new BaseService({
  //   baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
  //   env: 'sandbox',
  //   subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9'
  // });
  // const second = await base.createAccessToken({ api_key: apiToken.apikey, user_api: userApi.userApi});
  // console.log(second);
  // expect(second).toEqual(!null);
});
