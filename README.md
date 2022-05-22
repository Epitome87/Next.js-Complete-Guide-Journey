# Next.js & React - The Complete Guide

My journey and notes through the Udemy course by Maximilian Schwarzmüller

`Started Course: 5/19/2022`

# Section 01 - Getting Started

## Key Features

### Key Feature #1 - Server-Side Rendering

- Automatic page-prendering
  - Preparing the content of the page on the server instead of client
  - _Finished_ page served to the client
  - Great for SEO and initial load
- Blending client-side and server-side: Fetch data on the server and render finished pages

### Key Feature #2 - File-Based Routing

- Define pages and routes with files and folders instead of code (typically React Router in vanilla React)
- Less code, less work, highly-understandable

### Key Feature # - "Fullstack" Capabilities

- Easily add backend (server-side) code to Next / React apps
- Storing data, getting data, authentication, etc, can be added to your React projects

## Installation

```js
npx create-next-app
```

It's that easy!

# Section 02 - React Refresher

A nearly 4-hour refresher on React. Watched at 2x speed and nothing appeared new and note-worthy! 🙂

# Section 03 - File-Based Routing

## Introduction

In this section, we will learn:

- Understanding file-based routing
- Static & dynamic routes
- Navigation between pages

## What is File-Based Routing?

- Vanilla React uses code-based routing (typically through the use of React Router)
- With Next.js, we create React component files and let Next.js infer the routes from the **folder structure**
  - This is done inside the special **/pages** folder

Example folder structure:

```js
/pages
    index.js        => Main starting page   => domain.com/
    about.js        => About page           => domain.com/about
    /products
        index.js    => All products page    => domain.com/products
        [id].js     => Single product page  => domain.com/products/69 (if id is 69)
```

- Note we use lower-case filenames, rather than starting with a capital like typical components
- At the root level of _pages_ folder, _index.js_ serves as the route (home) page of the site
- In any other folder, the _index.js_ serves as the route page _of that particular route_
- The [id] is a **dynamic path**. Note we don't have to use "id" -- it can be any identifier
- We could also create the _about_ folder by having it be in a folder named _about_ and placing its logic in a _index.js_ file inside of it

With React Router, the same routing would be done in code like:

```js
const MyApp = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/products/:id' element={<ProductDetailsPage />} />
      <Route path='/about' element={<AboutPage />} />
    </Routes>
  );
};
```

Inside these files, we define typical React components (using any name we want). We export them as _default_, letting Next.js know that is the component to be rendered at that route.

## Extracting Dynamic Path Segment Data (Dynamic Routes)

- We import **useRouter** hook from **next/router** for functional components, or
- We import **withRouter** higher-order-component from **next/router** for class-based components:

```js
import { useRouter, withRouter } from 'next/router';
```

And declare like:

```js
const router = useRouter();
```

From here we have access to the following (assuming we're at domain.com/products/1)

```js
router.query; // Object: { id: 1 } for instance
router.pathname; // "/products/[id]" for instance

// Typical use-case:
const { id } = router.query;
fetch(`/api/products/${id}`);
```

## Catch-All Routes

We can create routes with not just dynamic segments, but also the number of segments are dynamic.

Let's say we want to create a blog listing where the URL can be in a variety of formats. For instance, /blog/2022 to get just blog entries for the year 2022, or maybe /blog/2021/12 to get only entries from December of 2021. We can use a new format for the file name: `[...slug].js` (again, identifier doesn't have to be _slug_)

- Now, no matter what comes after /blog in the URL, we render this [...slug].js file
- And now, `router.query` will contain an object with _slug_ as a property, as to be expected. But rather than returning one string like our previous routes, it includes an array of strings
- Example: Going to /blog/2020/10 would have _router.query_ return: `{ slug: ["2022", "10" ]}`
- We can use this array to appropriate make requests to our database, filter, etc and present the information as required

## Navigating with the Link Component

Much like with vanilla React, we do not want to just use anchor tags for links! And also much like with vanilla React, we make use of a **Link** component -- though this time we import it from **next/link** (as a default import) rather than from 'react-router-dom':

```js
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <Link href='/'>Home</Link>
    </div>
  );
}
```

- Note like with standard HTML, we use an `href` property
- Link provides benefits over an anchor tag, including automatically pre-fetching data off the page we might navigate to when we hover over the Link!
- We can add the `replace` property to prevent the ability to go back (we _replace_ the page rather than _pushing_ onto it)

## Alternative Way of Setting Link Hrefs

Instead of:

```js
<Link href={`/clients/${client.id}`}>Go Somewhere</Link>
```

You can provide an object:

```js
<Link href={{ pathname: '/clients/[id]', query: { id: client.id } }}>Go Somewhere</Link>
```

- Note we pass \*href\*\* an object of key-value pairs
- Note the _pathname_ key is the URL as we would see it in the folder structure of our project

## Navigating Programmatically

Sometimes, we want to navigate with a button click or after some action is triggered (like submitting a form). Doing so is simple:

```js
const router = useRouter();

const handleClick = () => {
  router.push('some/path/name');
};
```

- This acts just like the _Link_ component, and as such can accept the alternative object form:

```js
router.push({ pathName: 'clients/[id]/[clientProjectId]', query: { id: 'matthew', clientProjectId: 'projectOne' } });
```

## Adding a Custom 404 Page

If we enter an address with no supported route, we might want to show a 404 page. This is easy in Next.js:

- In root level of _pages_ folder, create a `404.js` file.
  - This name is **mandatory**!

## Section Summary

File-Based vs Code-Based

| File-Based Routing (Next.js)                                  | Code-Based Routing (React + React Router)                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| No extra boilerplate code required                            | Boilerplate setup in code required                                                   |
| Intuitive system                                              | Straightforward, but includes new components + concepts (Switch, Routes, etc)        |
| File + folder structure (in pages/ folder) influences routes) | File + folder setup does not matter at all                                           |
| Navigation works with <Link> component and imperatively       | Navigation works with <Link> component and imperatively (though different component) |

Both have their subjective pros and cons!

### `Section Completed: 5/19/2022`

# Section 04 - Project Time - Working with File-Based Routing

- The `public` folder is where you store anything you want served statically by Next.js. Images, fonts, etc. This means you can reference those assets in your CSS / HTML code. Next.js will serve anything in that folder as part of your overall application.
  - Files and folders stored **outside of public/** are **NOT made accessible** by Next.js -- visitors can **not** load files from there.
- Unlike vanilla React, in Next.js non-page component files do not need to begin with uppercase letters!
  - Example: Rather than an EventList.jsx component, some may use an event-list.jsx naming convention.
- Stylesheets do not have to be located in the default `/styles` folder. In fact, it is best practice to keep them next to the component they actually style instead.

# Section 05 - Page Pre-Rendering & Data Fetching

## Introduction

In this section, we will learn:

- What is "Data Fetching"?
- Static vs Server-side Page Generation
- How to Fetch Data

## The Problem with Traditional React Apps

- In React, we fetch data in our component _after_ the component was loaded. We fetch it from the client-side, send request to server, and receive it. The initial HTML page given to the user when they first visit the page does not contain this data
- If our content matters, and we want search engines to see and index content, React is not ideal for data-fetching
- Blog, shop, etc are types of sites where we want our content to be indexed

## How Next.js Prepares & Pre-Renders Pages

- Request is sent to route. Returns a pre-rendered page (not empty HTML / all JS code like in React)
- Instead of loading data only after the page was sent back to the client, Next.js pre-renders and pre-renders all the HTML content with all the data that might be needed, loads it in advanced, and pre-generates the finished HTML page. Finished, pre-populated HTML page sent back to the client
- Great for SEO
- But we still want to have an interact React app! So Next.js doesn't just send back pre-rendered page, but all the JS code that belongs to it.
- It will also **Hydrate** the page with React code once loaded
  - That code takes over that pre-rendered page and let React do its job, i.e interactivity!
- This pre-rendering only affects the initial load
  - If we re-visit or visit a different page of the website, that page is not pre-rendered; created with React in the client. It's just the initial page we visit that is pre-rendered
- Two forms of pre-rendering: 1) Static Generation (recommended). 2) Server-side Rendering. Can also mix.
  - Static: All pages pre-rendered in advance during build time
  - Server-side: Pages created just in time after deployment when a request reaches server
- **By default, Next.js pre-renders all pages that have no dynamic data**

# Introducing Static Generation with getStaticProps

Static Generation

- Pre-generate a page (with data prepared on the server-side) **during build time**, before you deploy app
- Pages are prepared ahead of time and can be cached by the server / CDN serving the app
- Inside page components (and **only inside page components**) we can let Next.js know we wish to utilize static generation with:

```js
export async function getStaticProps(context) { ... }
```

- Returns a promise
- Inside this function, can run any code that would normally run on the server-side only
- No access to certain client-side API, like the Window object
- Code here will not be included in the code bundle that's sent back to the clients -- they will never see it!
  - Good for credentials

## Adding getStaticProps to Pages

To our index route, let's add:

```js
export async getStaticProps() {
  return {
    props:
    {
      products: [{ id: 'p1', title: 'Product 1' }]
    },
  }
}
```

- This function must return an object with a props key
- This function gets called before the component renders, prepares the component's props for use within the component
- Ideal location to fetch / expose data through props
- Code never visible to client
- In the above example, we have access to props.products inside the _page_ component getStaticProps is in:

```js
function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}
```

- Note how we **must pass `props`** to the component in order for it to have access to the props object returned by _getStaticProps_

## Running Server-Side Code & Using the Filesystem

We are allowed to import system modules, like `fs`!

- Note at first our compiler might give us an error, such as _module not found_ if we simply import such a module without specifying what we do with it
  - But once we use it, and specifically use it **only** in getStaticProps, Next.js intelligently figures out that we are using it server-side, and allows it

## A Look Behind the Scenes

`npm run build` to build it
`npm start` to run the production build

- Creates an optimized production build
- Shows list of Pages and which ones are static, server-side, SSG, ISR (incremental static generation)
- .next folder will contain static and server folders with our files
- Can preview production-ready site with `npm start`
  - Starts it with a Node.js server

## Utilizing Incremental Static Generation (ISR)

What if you have data that changes frequently? We would have to re-build and re-deploy the page all the time

Solution #1:

- Pre-build page, use standard React code like useEffect to fetch the latest data
- Update loaded page after data has arrived

Solution #2: Incremental Static Generation

- Pre-generate page -> regenerate it on every request, at most every X seconds
  - Serve _old_ page if re-generation is not needed yet, **or**
  - Generate, store, and serve _new_ page otherwise
- Coninuous, on-going pre-rendering

To utilize solution #2, we also include a `revalidate` key on the getStaticProps returned object:

```js
return {
  props: {
    products: data.products,
  },
  revalidate: 10, // Time in seconds to wait for re-generation
};
```

- Note that when we are running our app on the development server, revalidate does not have an effect -- we **always** receive the latest page with the latest data

## A Closer Look at getStaticProps & Configuration Options

Two other keys you can set on the returned object in getStaticProps:

- `notFound`: Boolean value
  - Value of true returns the 404 page
  - Can check for certain requirements and set `notFound` to true if data not found, for example
- `redirect`: Allows you to re-direct the user to another route
  - It is an object where you can set `destination` to another route: `redirect: { destination: '/noData' }`
  - Again, maybe data was unavailable for fetching

Full example:

```js
export async function getStaticProps(context) {
  const data = ...some fetching...

  if (!data) {
    return {
      redirect: {
        destination: '/noData',
      }
    }
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
      revalidate: 10,
    }
  }
}
```

- Also note that `getStaticProps` can receive an argument, which Next.js which will provide useful values with. More on that later!

## Working with Dynamic Parameters

Much like when using `useRouter` inside a component, we can work with dynamic parameters server-side (in `getStaticProps`) by referencing the object Next.js provides to us when we pass `getStaticProps` an argument:

```js
// Inside [pid] page file
export function ProductDetailPage(props) {
  const { product } = props;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  // Build absolute path to our dummy backend file
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const productData = data.products.find((product) => product.id === productId);

  return {
    props: {
      product: productData,
    },
  };
}
```

- Note we get access to the product in the component itself, which was composed on the server
- But also note we get an error! `getStaticPaths is required for dynamic SSG pages`

## Introducing getStaticPaths for Dynamic Pages

Remember, Next.js pre-regenerates pages by default.
However, this is _not_ the case for dynamic pages! The default behavior is to not pre-generate. Why?

- Next.js doesn't know in advance how many pages it needs to pre-generate, as it doesnt know which values for the dynamic pages will be supported
- Generated just-in-time on the server instead
- So when we add `getStaticProps` we tell Next.js to pre-render, when it initially wants not to for dynamic pages
- We need to give Next.js more information...

Pre-Generated Paths (Routes)

- Dynamic pages ([id].js) don't just need data: You also need to know which [id] values will be available
- Multiple concrete [id] page instances (e.g. id = 1, id = 2, etc.) are pre-generated
- Need to add `export async function getStaticPaths() { ... }`

## Using getStaticPaths

```js
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }],
    fallback: false,
  };
}
```

The above tells Next.js that this dynamic page should be pre-generated 3x with the 'p1', 'p2' and 'p3' values as the identifier

## getStaticPaths and Link Prefetching Behind the Scenes

Say we have a Products page, and it has links that will lead to routes such as products/1, products/2, and so on. And that route is defined in a file named [pid].js.
While on the Products page, Next.js intelligently pre-fetches the data required for products/1, products/2, etc to!

## Working with Fallback Pages

Pre-generating a bunch of pages might take a long time. And there might be pages that are very rarely even visited. This would be a waste of time and resources. This is where `fallback` becomes important.

- We can set it to _true_ and decide to only pre-render some pages
- The pages not explicitly listed under `paths` will still load successfully, just not pre-generated. They are generated just-in-time when a request reaches the server

However, note that if we were to manually visit /products/3 (not listed in `paths`) rather than click a link to it, we would receive errors. This is because this just-in-time regeneration does not finish instantly. So we should be prepared to handle a fallback state in the component:

```js
const { loadedProducts } = props;
if (!loadedProducts) return <p>Loading...</p>;
```

Next.js will automatically update the component page when the data is filled.

Can also set `fallback: 'blocking'`

- Now we don't need any conditional checks!
- Next.js just waits until the data is ready before even serving the page
- Takes a bit longer

## Loading Paths Dynamically

Obviously, we wouldn't want to hard-code every possible path we want to support in the `paths` property! Even more, we can't possibly predict every possible value, especially when most databases return long, unpredictable IDs for our data. We can set it equal to array with key-value pairs calculated for us. The keys would be the the identifier found in the corresponding [id].js file, i.e "id", or "slug" if we have [slug].js, or "productId" if we have [productId].js, etc.

```js
export async function getStaticPaths() {
  // Get data in the shame of an array of { id: "p1', title: "Product 1' }
  const data = await getDataFromSomewhere();

  // We want only the id property of the returned object
  const ids = data.products.map((product) => product.id);
  const calculatedPaths = ids.map((id) => ({ params: { productId: id } }));

  return {
    paths: calculatedPaths,
    fallback: false,
  };
}
```

## Fallback Pages & Not Found Pages

What if we want to provide a `fallback` of _true_ or _'blocking'_ for dynamic paths that actually exist in the fetched _calculatedPaths_ array above, but which we don't wish to pre-generate, as they are not visited very often? That's fine, but in cases where we don't have a valid dynamic path, we would run into an error!

When the [id].js component loads for an id that is not part of our fetched data, our component attempts to call upon data that won't exist. This is a useful case for setting the `notFound` boolean in the `getStaticProps` function!

```js
const product = getProductById(someIdThatDoesntExit);

if (!product) {
  return {
    notFound: true,
  };
}

return {
  props: {
    product: product,
  },
};
```

<!-- End of study session for 5/20/2022 -->

## Introducing getServerSideProps

Sometimes, static pre-generation isn't enough; you need real server-side rendering.
Sometimes, you need to pre-render for _every_ request _or_ you need access to the request object (e.g. for cookies)

Next.js allows you to run "real server-side code" as well!

- Gives you a function which you can add to page components, which is _really_ executed whenever a request for this page reaches server
  - Not during build-time, or every x amount of minutes like pre-generation
- This function is `export async function getServerSideProps() { ... }`
- Use _either_ getServerSideProps or getStaticProps, not both in same page

## Using getServerSideProps for Server-Side Rendering

```js
import React from 'react';

function UserProfilePage(props) {
  return (
    <>
      <h1>{props.username}</h1>
    </>
  );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  return {
    props: {
      username: 'Matthew',
    },
    // These can also be allowed
    // notFound: {}
    // redirect: {}
  };
}
```

- Very similar to getStaticProps
- Returns an object with a props key, and optionally notFound and redirect
- Object returned does not contain a _revalidate_ key, as we send a file for each new request already

## getServerSideProps and its Context

- Unlike context in getStaticProps, we don't just have access to _params_ and etc, we get access to the _full request object_ as well, as well as the response which will be sent back

```js
export asyn function getServerSideProps(context) {
  const { params, req, res } = context;
return {
    props: {
      username: 'Matthew',
    },
  };
}
```

- Next.js will send back a response for you (unlike in Node Express apps). But we can use the res objet and manipulate it
- Can read incoming data from the `req` object
- The `req` and `res` objects returned are the Node.js _default_ objects. So those with familiarity with Node.js will feel right at home!

## Dynamic Pages & getServerSideProps

For dynamic pages that make use of getServerSideProps, we do **not** need to make use of getStaticPaths!
It runs only on the server anyways, so Next.js does not pre-generate any pages, so it doesn't need to know which pages to pre-generate!

## Introducing Client-Side Data Fetching (And When to Use It)

So, why even use client-side data fetching?

- Some data just doesn't need to be pre-rendered. For instance...
  - Data changing with high frequency (e.g. stock data)
  - Highly user-specific data (e.g. last orders in an online shop)
  - Partial data (e.g. data that's only used on a part of a page, like a dashboard page)
- Pre-fetching the data for page generation might not work or be required
- "Traditional" client-side data fetching (e.g. useEffect() with fetch() is fine)
- Might not make sense to pre-gen it because it's personal data or because it's changing a lot
- Waiting a second for data to load on the client, but having a quicker navigation to the page might be preferential in these scenarios

In this way, we have a page that behaves similar to a normal React page. But since by default pages are pre-generated in some form, we need to ensure we have conditional logic that will prevent our waiting-to-be-fetched data from causing any errors when accessing that data before it is ready. We typically do this in React apps, any way.

## Combining Pre-Fetching with Client-Side Fetching

Combining client-side data fetching with server-side pre-rendering. Pre-render a basic snapshot, but still fetch the latest data from the client.

Here is what a working example would look like:

```js
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  // Set initial state as pre-generated sales
  const [sales, setSales] = useState(props.sales);
  const { data, error } = useSWR('someURL');

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
  const response = await fetch('someURL');
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
```

With the example above, lets assume at the time we pre-generate the page, we have a database that shows two recent sales. The user visits the page and is immediately given HTML with those 2 sales as part of it, as they were pre-fetched and pre-generated at build-time. The user is on the page for several minutes, during which are database collects several more new sales. If the user were to refresh his page, he would immediately see the same 2 pre-generated sales as last time. He would also see the new sales, though, as they are being re-fetched client-side. They will not be part of the HTML, though, and may take a moment to be sent to the user. So, we get the 2 sales that were recognized when getStaticProps ran, and then the new ones when the component mounts on the client and begins fetching the new data.

Also note, that since we `npm install swr` and use `useSWR` (a hook created by the Next.js developers, but can be used in regular React as well), the user's page will refresh when it loses and regains focus!

### `Section Completed: 5/21/2022`

# Section 06 - Page Pre-Rendering & Data Fetching

In this module, we will revisit the "Events" project started earlier in the course, this time approaching it with what we learned:

- Adding static site generation & server-side rendering
- When to use which
- Adding client-side data fetching

Some notes observed during completion of this project:

- Doesn't really make too much sense to use client-side data fetching **and** getServerSideProps at once, unless you want to look into request headers

### `Section Completed: 5/21/2022`

# Section 07 - Optimizing Next.js Apps

This section includes Lectures 122 - 133

In this section, we will learn:

- Adding Meta and <head> Tags
- Re-using Components, Logic & Configuration
- Optimizing Images

## Analyzing the Need for <head> Metadata

- Enhance user experience
- Crucial for search engines (Title, Description, etc)

## Configuring the <head> Content

You can use a special component:

```js
import Head from 'next/head';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Next.js Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve!' />
      </Head>
    </Fragment>
  );
}
```

- Note it does not have to be at the top level
- Can add any HTML elements that would normally go between the head section of your HTML
- Each page can add one!

## Merging <head> Content

- Next.js automatically merges head elements! So if you define a head around the entire app, and then again inside a particular page component, they will be merged
- It is merged even if you have multiple head within the same component, too
- But there can be conflicts -- what if both have a title tag?
  - Only one will show up -- the one that appeared later

## The `_document.js` File (And What it Does)

App.js is your application shell. Root component inside of the body section of your HTML document, if you will.

There is also an optional `_document.js` file, which you must add yourself.

- Allows you to customize the _entire_ HTML document. All the elements that make it up
- Add class-based component in it (must be class-based to extend Document from 'next/document')

```js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

- This is the default structure

Why might you want to customize this?

- Add lang attribute to Html tag
- Maybe add an overlay div inside body
  - Add HTML content outside of app component tree. For example, using those elements with React portal. Portal modals / overlays to this element

## A Closer Look At Images

Easily optimize images by just using the `Image` component in `next/image`!

- Use it to replace the standard `<img />` element
- Creates multiple version of our images on the fly, opt for OS and device sizes that are making requests
- Not generated in advance, generated when needed, but...
- Cached for future requests for similar devices
- Default is lazy loading images
  - If image not visible, Next.js won't download them until required

```js
<Image src alt width height />
```

- Width and height are the size you want to be displayed, **not** the size of the image source

We can view these optimized images in the /.next/cache/images folder

If your images use external resources, must add this in the next.config.js file:

```js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
    formats: ['image/webp'],
  },
};
```

## Section Summary

- Optimize meta data with Head component
- Optimize images
- \_app, \_document

### `Section Completed: 5/21/2022`

## Section Introduction

We will look finally go beyond page rendering and explore...

- API Routes
  - What are API Routes?
  - Adding & Using API Routes
  - Working with Requests & Responses

## What are API Routes?

Some websites are about more than just serving pages.

- Accept user feedback submission, newsletter signups, etc
- Don't necessarily want to show a different page, just provide feedback based on input
- Need to send data to some server to store in a database, not a request for a new HTML page

What is an API?

- Application Programming Interface

Rest API

- Representational State Transfer (a specific form / structure for web APIs)

| URL / Path              | HTTTP Method                                 | Action                                                                          |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------- |
| my-domain.com/some-path | POST, GET, DELETE ...                        | Server-side code executes -- possibly different code for different HTTP methods |
|                         | Data is typically transferred in JSON format | { "some-field": "some-value" }                                                  |

Client sends request with data, server (using REST API) sends back a response with data to client

What are API Routes?

- URLs that don't return pages (HTML) but instead provide a (REST) API
- Support things like /api/feedback with various types of HTTP requests, to send request to store feedback, to get feedback, etc
- Requests are typically not sent by entering URL in browser but via JavaScript code (Ajax)

## Writing Our First API Route

- Need a `api` folder inside of `pages` folder
  - This name is **mandatory!**
  - These files inside here will be treated as RESTful routes
- Should create a function (typically called **handler** that accepts a request and response)
  - Code in this function runs only on the server -- will never end up in any client-side code bundle
- Here we write Node.js code that is enhanced by the Next.js team to look a little like Express.js code

```js
// Inside /api/feedback.js

function handler(req, res) {
  res.status(200).json({
    message: 'This works!',
  });
}

export default handler;
```

The above code runs when we send a request to '/api/feedback' -- sends back a JSON data as a response.

A more complete API example might look like:

```js
import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

function handler(req, res) {
  let data;

  switch (req.method) {
    case 'GET':
      data = extractFeedback(buildFeedbackPath());
      res.status(200).json({ feedback: data });
      break;
    case 'POST':
      const { email, feedback } = req.body;

      const newFeedback = {
        id: new Date().toISOString(),
        email,
        feedback,
      };

      data = extractFeedback(buildFeedbackPath());

      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({
        message: 'Success!',
        feedback: newFeedback,
      });
      break;
    default:
      res.status(200).json({ message: 'Test' });
      break;
  }
}

export default handler;
```

## Using API Routes For Pre-Rendering Pages

- **VERY IMPORTANT**: We do not use fetch or axios or make any HTTP request inside getStaticProps or getServerSideProps!
  - Why make an HTTP request to our server, when these functions run inside the server to begin with?
  - Therefore, we typically just export helper API functions that will run the logic we need
  - But we don't want these helper functions to do the typical API logic of responding with a status or a JSON response

## Creating & Using Dynamic API Routes

Continuing with our previous _feedback_ resource example, we can handle dynamic API routes as follows:

```js
// In api/[feedbackId].js
import { buildFeedbackPath, extractFeedback } from './feedback';

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { feedbackId } = req.query;
      const feedbackData = extractFeedback(buildFeedbackPath());
      const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);

      res.status(200).json({
        feedback: selectedFeedback,
      });
      break;
    default:
      res.status(200).json({ message: 'Test ' });
  }
}

export default handler;
```

Fairly similar to before, and fairly similar to how we would do so in an Express app. Except we extract the dynamic identifier inside `req.query` here, whereas in an Express app we would do so in `req.params`.

## Exploring Different Ways of Structuring API Route Files

Like with page components, we can use the `[...identifier].js` format for an API file to handle _catch-all_ API routes.
Like with page components, Next.js is intelligent enough to know that a request to '/api/feedback' should be handled by any API route that matches that name exactly, and not by the '[feedbackId].js' API route. It gives preference to the more specific path over the more generic ones.

You also have options with how you strucutre your files and folders, again similar with page components:

1. api/feedback/index.js and api/feedback/[feedbackid].js
2. api/[feedbackId].js and api/feedback.js

However, it is **important** to note that in our particular example, '[feedbackId]' was getting hit at '/api/someId' route. With the second folder structure, it is now hit at '/api/feedback/feedbackId' -- which is more aligned with RESTful conventions, anyway.

## Section Summary

What we learned:

- Backend functionality triggered through client-side code, then API routes are useful
- Don't have to build an API backend / second project
- Easily inject API routes by using special API folder
- Write server-side code here
- Find out what type of request was sent, send back responses
- Static and dynamic API routes
- How to structure files and folders in api folder

### `Section Completed: 5/21/2022`

# Section 08 - Adding Backend Code with API Routes (Fullstack React)

# Section 09 - Project Time - API Routes

# Section 10 - Working with App-wide State (React Context)

# Section 11 - Complete App Example - Building a Full Blog

# Section 12 - Deploying Next.JS Apps

# Section 13 - Adding Authentication

# Section 14 - Next.js Summary
