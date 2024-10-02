"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function PaymentResultPage() {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    if (paymentId) {
      fetch(`/api/payment-details/${paymentId}`)
        .then((response) => response.json())
        .then((data) => setPaymentDetails(data))
        .catch((error) =>
          console.error("Error fetching payment details:", error)
        );
    }
  }, [paymentId]);

  if (!paymentDetails) {
    return <div>Loading payment details...</div>;
  }

  const isSuccess = paymentDetails?.isSuccess;
  const status = paymentDetails?.status;
  const propertyName = paymentDetails?.body?.errors?.[0]?.propertyName;
  const errorMessage =
    paymentDetails?.body?.errors?.[0]?.message || "An unknown error occurred";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className={`p-6 ${isSuccess ? "bg-green-500" : "bg-red-500"}`}>
          <div className="flex justify-center">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-white" />
            ) : (
              <AlertCircle className="h-16 w-16 text-white" />
            )}
          </div>
          <h1 className="mt-4 text-center text-2xl font-bold text-white">
            {isSuccess ? "Payment Successful" : "Payment Failed"}
          </h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Status Code:</span> {status}
          </p>
          {!isSuccess && (
            <p className="text-red-600 mb-4">
              <span className="font-semibold">Error:</span> {errorMessage}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Property Name: {propertyName || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            {JSON.stringify(paymentDetails?.body?.errors?.[0])}
          </p>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <Link
            href="/"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
