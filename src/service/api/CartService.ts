import { SessionDataStorage } from '@/controller/session/server';
import { ApiService } from '@/service/api/ApiService';
import { Cart } from '@commercetools/platform-sdk';
import { createApiRoot } from './client';

export default class CartService extends ApiService {
  public async getActiveCart() {
    try {
      const response = await this.apiRoot.me().activeCart().get().execute();
      this.updateCartProdsQty(response.body);
      return response.body;
    } catch {
      const response = await this.createCart();
      this.updateCartProdsQty(response);
      return response;
    }
  }

  public async getAllCarts() {
    const response = await this.apiRoot.me().carts().get().execute();
    return response.body;
  }

  public async addProductToCart(productId: string) {
    const activeCart = await this.getActiveCart();
    const activeCartID: string = activeCart ? activeCart.id : '';
    const activeCartVersion = activeCart ? activeCart.version : 1;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
  }

  public async removeProductFromCart(lineItemId: string) {
    const activeCart = await this.getActiveCart();
    const activeCartID: string = activeCart ? activeCart.id : '';
    const activeCartVersion = activeCart ? activeCart.version : 1;
    const req = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: activeCartID })
      .post({
        body: {
          version: activeCartVersion,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
              quantity: 1,
            },
          ],
        },
      })
      .execute();
    this.updateCartProdsQty(req.body);
  }

  public cartProdsQty() {
    const session = new SessionDataStorage().getData();
    return session.qty;
  }

  public updateCartProdsQty(cart: Cart) {
    const storage = new SessionDataStorage();
    const session = storage.getData();
    session.qty = cart.totalLineItemQuantity;
    storage.save(session);
  }

  public async createCart() {
    this.apiRoot = createApiRoot();
    const cartDraft = {
      currency: 'USD',
    };
    const result = await this.apiRoot.me().carts().post({ body: cartDraft }).execute();
    return result.body;
  }
}
