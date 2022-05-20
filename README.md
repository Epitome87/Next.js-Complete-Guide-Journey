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

# Section 06 - Page Pre-Rendering & Data Fetching

# Section 07 - Optimizing Next.js Apps

# Section 08 - Adding Backend Code with API Routes (Fullstack React)

# Section 09 - Project Time - API Routes

# Section 10 - Working with App-wide State (React Context)

# Section 11 - Complete App Example - Building a Full Blog

# Section 12 - Deploying Next.JS Apps

# Section 13 - Adding Authentication

# Section 14 - Next.js Summary
