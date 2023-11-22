import { Colloction } from './lib/collection';
import { ProvioningController } from './lib/provisioning';

export * from './lib/number';


async function main() {
  const callbackhost =
    "https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7";
  const subriction_id = "b0f5afe7e38f499383c49cb472ba60b9";
  const provi = new ProvioningController(subriction_id, callbackhost);
  console.log("+++++++++++");
  const userApi = await provi.createUserId();
  const apikey = await provi.createApikey();
  if (apikey == null) {
    return null;
  }
  if (userApi == null) {
    return null;
  }
  console.log(apikey, userApi);
  const collection = new Colloction({
    env: 'sandbox',
    baseUrl: 'https://sandbox.momodeveloper.mtn.com/collection',
    subscriptionId: 'b0f5afe7e38f499383c49cb472ba60b9',
  });
  await collection.createAccessToken({
    api_key: apikey.apikey,
    user_api: userApi.userApi,
  });

  const basicUser = await collection.getBasicUserInfo({
    user_api: userApi.userApi,
    api_key: apikey.apikey,
    accountHolderMSISDN: "242066900110"
  });
  console.log(basicUser)
  // await provi.createApikey()
}
main();
