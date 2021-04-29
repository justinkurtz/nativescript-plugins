import {DemoSharedBase} from '../utils';
import {CreditCardView, PaymentMethod, Source, Stripe, StripeThreeDSUICustomization, Token} from '@triniwiz/nativescript-stripe';
import {EventData, fromObject, Button, Page, Frame} from "@nativescript/core";
import {publishableKey} from "../../../apps/demo/src/plugin-demos/nativescript-stripe-src/std-view/stripe.service";


export class DemoSharedNativescriptStripe extends DemoSharedBase {
  stripe: Stripe;
  token: any;
  source: any;
  payment: any;

  constructor(){
    super();
    StripeThreeDSUICustomization.init();
  }
  stdDemo(args: EventData) {
    Frame.topmost().navigate("~/plugin-demos/nativescript-stripe-src/std-view/std-view");
  }

  ccViewDemo(args: EventData) {
    Frame.topmost().navigate("~/plugin-demos/nativescript-stripe-src/cc-view/cc-view");
  }

  ccViewPageLoaded(args: EventData) {
    if (-1 !== publishableKey.indexOf("pk_test_yours")) {
      throw new Error("publishableKey must be changed from placeholder");
    }
    this.stripe = new Stripe(publishableKey);
    this.token = '';
    this.source = '';
  }

  ccViewCreateToken(args: EventData) {
    this.token = "Fetching token...";

    let page = (<Button>args.object).page;
    let ccView: CreditCardView = page.getViewById("card");
    this.stripe.createCardToken(ccView.cardParams, (error, token) => {
      console.log('createCardToken: ', token);
      console.log('createCardToken error: ', error);
      let value = error ? error.message : this.formatToken(token);
      this.set('token',value);
    });
  }

  ccViewCreateSource(args: EventData) {
    this.source = "Fetching Source...";

    let page = (<Button>args.object).page;
    let ccView: CreditCardView = page.getViewById("card");
    this.stripe.createSource(ccView.cardParams, (error, source) => {
      console.log('createSource: ', source);
      console.log('createCardToken error: ', error);
      let value = error ? error.message : this.formatSource(source);
      this.set('source',value);
    });
  }

  ccViewCreatePaymentMethod(args: EventData){
    this.source = "Fetching PaymentMethod...";

    let page = (<Button>args.object).page;
    let ccView: CreditCardView = page.getViewById("card");
    this.stripe.createPaymentMethod(ccView.cardParams, (error, method) => {
      console.log('createPaymentMethod: ', method);
      console.log('createPaymentMethod error: ', error);
      let value = error ? error.message : this.formatPaymentMethod(method);
      this.set('payment',value);
    });
  }

  formatToken(token: Token): string {
    return `ID: ${token.id}\nCard: ${token.card.brand} (...${token.card.last4})`;
  }

  formatSource(source: Source): string {
    return `ID: ${source.id}\nCard: ${source.cardDetails.brand} (...${source.cardDetails.last4})`;
  }

  formatPaymentMethod(source: PaymentMethod): string {
    return `ID: ${source.id}\nCard: ${source.card.brand} (...${source.card.last4})`;
  }

}
