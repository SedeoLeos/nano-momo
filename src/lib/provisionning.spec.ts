import { ProvioningController } from './provisionning';


describe('ProvioningController', () => {

    const provioningController = new ProvioningController('b0f5afe7e38f499383c49cb472ba60b9', 'https://webhook.site/5f14ce76-d699-4b14-933a-f58f82a910c7');


  test('createUserId should...', async () => {
    const result = await provioningController.createUserId();
    expect(result.status).toBe(201);
    expect(result.success).toBe(true);
    expect(result.error).toBe(false);
    expect(result.message).toBe('');
    expect(result.data).toBeInstanceOf(Object);
  },30000);

  test('createApikey should...', async () => {
    const result = await provioningController.createApikey();
    expect(result.satus).toBe(201);
    expect(result.success).toBe(true);
    expect(result.error).toBe(false);
    expect(result.message).toBe('');
    expect(result.data).toBeInstanceOf(Object);
  },30000);
});
