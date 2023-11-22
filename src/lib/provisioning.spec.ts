import { SuccessResult, isSuccessResult } from '../types/outputs.type';

import { Provisioning } from './provisioning';

describe('ProvisioningController', () => {
  const provisioning = new Provisioning(
    'b0f5afe7e38f499383c49cb472ba60b9',
    'https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7'
  );

  test('createUserId should...', async () => {
    const result = await provisioning.createUserId();
    if (isSuccessResult(result)) {
      expect(result).toBeInstanceOf(SuccessResult);
      expect(result.status).toBe(201);
      expect(result.success).toBe(true);
    }
  }, 30000);

  test('createApikey should...', async () => {
    const result = await provisioning.createApikey();
    if (isSuccessResult(result)) {
      expect(result.status).toBe(201);
      expect(result).toBeInstanceOf(SuccessResult);
      expect(result.data).toBeInstanceOf(Object);
    }
  }, 30000);
});
