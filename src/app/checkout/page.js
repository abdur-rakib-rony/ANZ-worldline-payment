'use client';

import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function SimplifiedCheckout() {
  const [response, setResponse] = useState(null);

  const handleCheckout = async () => {
    try {
      const randomTotal = Math.floor(Math.random() * 91) + 10;

      const response = await fetch('/api/create-hosted-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: randomTotal }),
      });

      const data = await response.json();
      setResponse(data);

      if (data.body && data.body.redirectUrl) {
        console.log('Redirect URL:', data.body.redirectUrl);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="py-6 flex flex-col items-center">
      <button
        className="flex items-center justify-center w-64 p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleCheckout}
      >
        <CreditCard className="mr-2 h-5 w-5" /> Checkout Now
      </button>
      {response && (
        <div className="mt-4 p-4 border rounded-lg max-w-md overflow-x-auto">
          <p>API Response:</p>
          <pre className="mt-2 text-sm">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}