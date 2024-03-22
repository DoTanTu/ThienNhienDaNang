import * as express from "express";
import { AttributeRouter } from "./attribute";
import { APIRouter } from "./api";
import { AppRouter } from "./app";
import { AuthRouter } from "./auth";
import { CategoryRouter } from "./category";
import { ContactRouter } from "./contact";
import { CustomerRouter } from "./customer";
import { CustomSiteRouter } from "./customSite";
import { DashboardRouter } from "./dashboard";
import { DocumentRouter } from "./document";
import { ContributeRouter } from "./contribute";
import { FileRouter } from "./file";
import { FileAppRouter } from "./fileapp";
import { FileEjsRouter } from "./fileejs";
import { LanguageRouter } from "./language";
import { MessageRouter } from "./message";
import { CommentRouter } from "./comment";
import { PageRouter } from "./page";
import { ProductRouter } from "./product";
import { SiteRouter } from "./site";
import { UserRouter } from "./user";
import { ShipMethodRouter } from "./shipMethod";
import { PaymentMethodRouter } from "./paymentMethod";
import { OrderRouter } from "./order";
import { MailRouter } from "./mail";
import { FileCustomRouter } from "./fileCustomer";
import { ExampleCodeRouter } from "./exampleCode";
import { PaymentRouter } from "./payment";
import { FileImageRouter } from "./fileImage";
import { FilePDFRouter } from "./filePDF";
import { FileSlideRouter } from "./fileSlide";
import { FileContributeCustomRouter } from "./fileContributeCustomer";
import { BackLinkSiteRouter } from "./backLink";
import { FileImageEditorRouter } from "./fileImageEditor";

export class Routes {
  constructor(private app: express.Application) {
    this.setRoutes();
  }

  static init(app: express.Application): Routes {
    return new Routes(app);
  }

  setRoutes() {

    LanguageRouter.init(this.app);
    AuthRouter.init(this.app);
    FileRouter.init(this.app);
    FileAppRouter.init(this.app);
    FileEjsRouter.init(this.app);
    FileCustomRouter.init(this.app);
    FileImageRouter.init(this.app);
    FilePDFRouter.init(this.app);
    FileSlideRouter.init(this.app);
    FileContributeCustomRouter.init(this.app);
    FileImageEditorRouter.init(this.app);
    
    APIRouter.init(this.app);
    // AdminSystem.init(this.app);
    DashboardRouter.init(this.app);
    PageRouter.init(this.app);
    CategoryRouter.init(this.app);
    ProductRouter.init(this.app);
    CustomerRouter.init(this.app);
    UserRouter.init(this.app);
    SiteRouter.init(this.app);
    AppRouter.init(this.app);
    ContactRouter.init(this.app);
    DocumentRouter.init(this.app);
    MessageRouter.init(this.app);
    CommentRouter.init(this.app);
    ContributeRouter.init(this.app);
    AttributeRouter.init(this.app);
    ShipMethodRouter.init(this.app);
    PaymentMethodRouter.init(this.app);
    OrderRouter.init(this.app);
    MailRouter.init(this.app);
    ExampleCodeRouter.init(this.app);
    PaymentRouter.init(this.app);
    
    CustomSiteRouter.init(this.app);

    BackLinkSiteRouter.init(this.app);

    this.app.get("*", function (req, res) {
      if (req.accepts("html")) {
        res.render("./error/page-404");
        return;
      }
      if (req.accepts("json")) {
        res.status(404).json({ success: true, message: "URL Not Exsits" });
        return;
      }
    });
  }
}
