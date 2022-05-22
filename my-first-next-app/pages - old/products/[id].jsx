import React from 'react';
import { useRouter } from 'next/router';

function ProductDetailsPage() {
  const router = useRouter();

  console.table(router.query);

  return (
    <div>
      <h1>Product Details Page</h1>
      <p>router.pathname: {router.pathname}</p>
    </div>
  );
}

export default ProductDetailsPage;
