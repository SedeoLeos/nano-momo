import { ProvioningController } from './provisionning';


describe('ProvioningController', () => {
   let provioningController:ProvioningController;

  beforeEach(() => {
    // Initialiser une nouvelle instance avant chaque test
    provioningController = new ProvioningController('b0f5afe7e38f499383c49cb472ba60b9', 'yourProviderCallbackHost');
  });

  test('createUserId should...', async () => {
    // Écrire des tests pour createUserId
    const result = await provioningController.createUserId();
    expect(result).toEqual(!null);
  });

  test('createApikey should...', async () => {
    // Écrire des tests pour createApikey
    const result = await provioningController.createApikey();
    expect(result).toEqual(!null);
  });
});