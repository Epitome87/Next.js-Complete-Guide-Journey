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

What if we want to provide a `fallback` of _true_ or _'blocking'_ for dynamic paths that actually exist in the fetched _calculatedPaths_ array above, but for ones which we don't wish to pre-generate, as they are not visited very often? That's fine, but in cases where we don't have a valid dynamic path, we would run into an error!

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

# Section 06 - Page Pre-Rendering & Data Fetching

# Section 07 - Optimizing Next.js Apps

# Section 08 - Adding Backend Code with API Routes (Fullstack React)

# Section 09 - Project Time - API Routes

# Section 10 - Working with App-wide State (React Context)

# Section 11 - Complete App Example - Building a Full Blog

# Section 12 - Deploying Next.JS Apps

# Section 13 - Adding Authentication

# Section 14 - Next.js Summary
