import React from "react";
import { useSearchParams } from "react-router-dom";

const Failure = () => {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");

  // Decode the base64 encoded data
  const decodedData = data ? JSON.parse(atob(data)) : null;

  return (
    <div>
      <h1>Payment Failed</h1>
      {decodedData ? (
        <div>
          <p>Transaction Code: {decodedData.transaction_code}</p>
          <p>Status: {decodedData.status}</p>
          <p>Total Amount: {decodedData.total_amount}</p>
          <p>Transaction UUID: {decodedData.transaction_uuid}</p>
          <p>Product Code: {decodedData.product_code}</p>
        </div>
      ) : (
        <p>No payment data found.</p>
      )}
    </div>
  );
};

export default Failure;
