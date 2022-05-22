import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EventList from '../../components/Events/EventList';
import EventsSearch from '../../components/Events/EventsSearch';
// import { getAllEvents, getFeaturedEvents, getFilteredEvents } from '../../dummyData';
import { getAllEvents, getFeaturedEvents } from '../../services/eventServices';

// Page should be understood by search-engine crawlers. As a visitor, would be nice to see content instantly. Data probably doesn't change too often.
// Not user-specific, not tied behind an authenticated user
// This makes it perfect candidate for pre-rendering. Which method, though?
// Don't need to pre-render for every request...so getStaticProps it is!
function EventsPage({ events }) {
  const router = useRouter();

  const handleSearch = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  return (
    <>
      <Head>
        <title>Next.js Events - All Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <EventsSearch onSearch={handleSearch} />
      <EventList events={events} />
    </>
  );
}

export default EventsPage;

export async function getStaticProps(context) {
  const response = await getAllEvents();

  return {
    props: {
      events: response,
    },
    revalidate: 60,
  };
}
