import { Container } from "typedi";
import config from "../config";
import { IOrder, IOrderInputDTO } from "../models/interfaces/IOrder";
import AppService from "../services/app";
import MailService from "../services/mail";
import OrderService from "../services/order";
import PageService from "../services/page";
import PaymentMethodService from "../services/paymentMethod";
import { PAYMENT_METHOD, PAYMENT_STATUS } from "../utils/payment";
import { ORDERSTATUS } from "../utils/status";

export default class PaymentController {
  public async CreatePayment(req, res) {
    try {
      const serviceInstance = Container.get(OrderService);
      const appInstance = Container.get(AppService);
      var itemProducts = [];
      if (req.body.products) {
        itemProducts = JSON.parse(req.body.products);
      }

      var billingAddress;
      var shippingAddress;
      if (req.body.billingAddress) {
        billingAddress = JSON.parse(req.body.billingAddress);
      }
      if (req.body.shippingAddress) {
        shippingAddress = JSON.parse(req.body.shippingAddress);
      }

      let app = await appInstance.getApp();
      if (app.module.isOrder){
        const item = await serviceInstance.addOrder({
          customerId: req.body.customerId,
          products: itemProducts,
          note: req.body.note,
          billingAddress: billingAddress,
          shippingAddress: shippingAddress,
          shipId: req.body.shipId,
          discount: req.body.discount,
          paymendId: req.body.paymendId,
          subTotal: req.body.subTotal,
          total: req.body.total,
          status: ORDERSTATUS.OPEND,
          userPost : req.body.userId
        } as IOrderInputDTO);
        if (item) {
          let sessionId = await this.checkoutSession(item, req, app);
          res.status(200).json({ success: true, id: sessionId });
        } else {
          res.status(200).json({ success: false, data: "" });
        }
    }else{
      res.status(200).json({ success: false, error: "Not support order" });
    }
    } catch (e) {
      res.status(200).json({ success: false, data: "" });
    }
  }

  public async checkoutSession(item: IOrder, req, app): Promise<any> {
    const serviceInstance = Container.get(OrderService);
    const paymentMethodInstance = Container.get(PaymentMethodService);
    let order = await serviceInstance.getOrderInfo(item);
    let stripeMethod = await paymentMethodInstance.getPaymentMethodInfoById(
      item.paymendId
    );
    if (stripeMethod) {
      const stripe = require("stripe")(
        stripeMethod.sKey
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: this.getLineItems(order),
        mode: "payment",
        shipping_options: this.getshippingOptions(order),
        locale : req.body.language,
        success_url: `https://`+app.hostName+`/paymentSuccess?orderId=${item._id}`,
        cancel_url:  `https://`+app.hostName+`/paymentCancel?orderId=${item._id}`,
      });
      return session.id;
    }
    return null;
  }

  public async PaymentSuccess(req, res) {
    try {
      const serviceInstance = Container.get(OrderService);

      const data = await serviceInstance.updateOrder({
        _id: req.query["orderId"],
        paymentStatus: PAYMENT_STATUS.PAID,
      } as IOrder);
      if (data) {
        const mailInstance = Container.get(MailService);
        var email = data.billingAddress.email;
        if (email == undefined || email == null || email == "") {
          email = data.shippingAddress.email;
        }
        await mailInstance.sendPaymentSuccess(email ,data);
      }
      res.render("./app/payment-success")
    } catch (e) {
      res.render("./app/payment-success")
    }
  }

  public async PaymentCancel(req, res) {
    try {
      const serviceInstance = Container.get(OrderService);

      const data = await serviceInstance.updateOrder({
        _id: req.query["orderId"],
        paymentStatus: PAYMENT_STATUS.FAILED,
      } as IOrder);
     
      res.render("./app/payment-fail")
    } catch (e) {
      res.render("./app/payment-fail")
    }
  }

  private getLineItems(order : any) : any {
    var lineItems = [];
    order.products.forEach((product) => {
      var currentProductInfo = order.productList.find(
        (x) => x._id == product.productId
      );
      var ecommerce = currentProductInfo.ecommerce;
      if (
        product.ecommercePlusId != undefined &&  product.ecommercePlusId != "" &&
        currentProductInfo != null && currentProductInfo.ecommercePlus != null) {
        ecommerce = currentProductInfo.ecommercePlus.find((x) => x._id == product.ecommercePlusId);
      }

      lineItems.push({
        price_data: {
          currency: "vnd",
          product_data: {
            name: currentProductInfo.name,
          },
          unit_amount: ecommerce.price,
        },
        quantity: product.quantity,
      });
    });
    return lineItems;
  }

  private getshippingOptions(order : any) : any {
    if (order.ship){
      return  [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: order.ship.price,
              currency: 'vnd',
            },
            display_name:  order.ship.name,
          },
        },
      ]
    }
    return [];
  }
}
