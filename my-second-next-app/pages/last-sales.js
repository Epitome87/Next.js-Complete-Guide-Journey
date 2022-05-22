import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
    // Set initial state as pre-generated sales
  const [sales, setSales] = useState(props.sales);
  const url = '';
  const { data, error } = useSWR(url);

  useEffect(() => {
    if (data) {
      //   Transform data to our needs
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: KeyboardEvent,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul></ul>
    </>
  );
}

export async function getStaticProps(context) {
  // Can't use useSWR here: we are not in a React component, so no hooks allowed!
  const response = await fetch('');
  const data = await response.json();

  //   Transform data to our needs
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: KeyboardEvent,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
      revalidate: 10,
    },
  };
}

export default LastSalesPage;
