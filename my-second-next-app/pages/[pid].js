import React from 'react';
import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage(props) {
  const { product } = props;

  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetailPage;

async function getData() {
  // Build absolute path to our dummy backend file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  // return {
  //     paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }],
  //     fallback: true,
  // };
  const data = await getData();

  //   Just extra the ID of every product
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  //   // Build absolute path to our dummy backend file
  //   const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  //   const jsonData = await fs.readFile(filePath);
  //   const data = JSON.parse(jsonData);

  //   const productData = data.products.find((product) => product.id === productId);

  const data = await getData();
  const productData = data.products.find((product) => product.id === productId);

  if (!productData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: productData,
    },
  };
}
