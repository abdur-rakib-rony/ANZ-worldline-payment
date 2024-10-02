import { NextResponse } from "next/server";
const onlinePaymentsSdk = require("onlinepayments-sdk-nodejs");

const client = onlinePaymentsSdk.init({
  host: "payment.anzworldline-solutions.com.au",
  apiKeyId: "YOUR KEY ID",
  secretApiKey: "YOUR SECRET KEY",
  integrator: "OnlinePayments",
});

const baseUrl = "YOUR SITE" || "http://localhost:3000";

export async function POST(request) {
  const { total } = await request.json();

  const createHostedCheckoutRequest = {
    order: {
      amountOfMoney: {
        amount: total * 100, //1000 cents aud converted value=10
        currencyCode: "AUD",
      },
    },
    hostedCheckoutSpecificInput: {
      returnUrl: `${baseUrl}/payment-result`,
    },
  };

  try {
    const createHostedCheckoutResponse =
      await client.hostedCheckout.createHostedCheckout(
        "YOUR PSPID",
        createHostedCheckoutRequest,
        null
      );

    console.log("createHostedCheckoutResponse", createHostedCheckoutResponse);

    return NextResponse.json(createHostedCheckoutResponse);
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment", details: error.message },
      { status: 500 }
    );
  }
}
