import { Container } from "typedi";
import config from "../config";
import { IProductQuery } from "../models/interfaces/IProduct";
import AppService from "../services/app";
import PaymentMethodService from "../services/paymentMethod";
import ProductService from "../services/product";
import ShipMethodService from "../services/shipMethod";
import { PAYMENT_METHOD } from "../utils/payment";

export default class CustomerController {
  public async ExamplePayment(req, res) {
    const serviceInstance = Container.get(ProductService);
    const appInstance = Container.get(AppService);
    const paymentInstance = Container.get(PaymentMethodService);
    const shipInstance = Container.get(ShipMethodService);
    let paymentStripe = await paymentInstance.getPaymentInfoByMethod(PAYMENT_METHOD.STRIPE)
    let shipMethods = await shipInstance.getShipMethods()
    
    let app = await appInstance.getApp();
    if (app.module.isPaymentOnline == true) {
      var products = await serviceInstance.getProducts({
        pageId: req.query["page"],
        query: "",
        start: 0,
        limit: 2,
        role: req.session.user.role,
        language: "",
        cateId: "",
      } as IProductQuery);

      res.render("./admin/example/payment", {
        siteConfig: config.siteConfig,
        app: app,
        paymentStripe : encodeURI(JSON.stringify(paymentStripe)),
        products: products.items,
        shipMethods: encodeURI(JSON.stringify(shipMethods)),
        role: req.session.user.role,
        username: req.session.user.name,
      });
    } else {
      res.render("./error/page-404");
    }
  }
}
