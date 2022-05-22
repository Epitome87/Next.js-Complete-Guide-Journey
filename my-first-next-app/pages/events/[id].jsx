import React from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { getEventById } from '../../dummyData.js';
import EventSummary from '../../components/EventDetail/EventSummary';
import EventLogistics from '../../components/EventDetail/EventLogistics';
import EventContent from '../../components/EventDetail/EventContent';
import ErrorAlert from '../../components/UI/ErrorAlert/ErrorAlert.js';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../services/eventServices';
import Comments from '../../components/Input/Comments';
// import { getFeaturedEvents } from '../../dummyData';

// An individual Event page definitely requires its content to be search-engine crawlable! So we for sure want pre-rendering. Which type?
// getStaticProps is a good candidate
function EventDetailPage({ event }) {
  // const router = useRouter();
  // const event = getEventById(router.query.id);

  if (!event) {
    return (
      // <ErrorAlert>
      //   <p>No event found</p>
      // </ErrorAlert>
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Next.js Events - {event.title}</title>
        <meta name='description' content={event.description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const response = await getEventById(context.params.id);

  return {
    props: {
      event: response,
    },
    revalidate: 60, // Every minute
  };
}

// export async function getStaticPaths() {
//   const events = await getAllEvents();
//   const calculatedPaths = events.map((event) => ({ params: { id: event.id } }));

//   return {
//     paths: calculatedPaths,
//     fallback: false,
//   };
// }

// Actually, let's just pre-gen our featured events!
// But now we will need a fallback, as we have valid event data for non-pre-generated pages
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const calculatedPaths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: calculatedPaths,
    fallback: true,
  };
}
