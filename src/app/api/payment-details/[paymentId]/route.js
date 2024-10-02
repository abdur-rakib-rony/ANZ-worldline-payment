import { NextResponse } from "next/server";
const onlinePaymentsSdk = require("onlinepayments-sdk-nodejs");

const client = onlinePaymentsSdk.init({
  host: "payment.anzworldline-solutions.com.au",
  apiKeyId: "YOUR KEY ID",
  secretApiKey: "YOUR SECRET KEY",
  integrator: "OnlinePayments",
});

export async function GET(request, { params }) {
  const hostedCheckoutId = params.paymentId;

  console.log("hostedCheckoutId from params:", hostedCheckoutId);

  if (!hostedCheckoutId) {
    return NextResponse.json(
      { error: "Hosted Checkout ID is required" },
      { status: 400 }
    );
  }

  try {
    const hostedCheckoutStatus = await client.hostedCheckout.getHostedCheckout(
      "YOUR PSPID",
      hostedCheckoutId,
      null
    );

    return NextResponse.json(hostedCheckoutStatus);
  } catch (error) {
    console.error("Error getting payment details:", error);
    return NextResponse.json(
      { error: "Failed to get payment details", details: error.message },
      { status: 500 }
    );
  }
}
