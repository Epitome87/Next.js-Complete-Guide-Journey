import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { getFilteredEvents } from '../../dummyData';
import { getFilteredEvents } from '../../services/eventServices';
import EventList from '../../components/Events/EventList';
import ResultsTitle from '../../components/EventDetail/ResultsTitle/ResultsTitle';
import Button from '../../components/UI/Button';
import ErrorAlert from '../../components/UI/ErrorAlert/ErrorAlert';

// Perhaps getServerSideProps is best here, since so many combinations of searches
// Standard client-side data fetching would be okay to add as well. Page would load quicker (no pre-render on server), but data would initially be missing, so we'd have to show loading state. Page also not important for search engines (they'd prefer Featured, All, or Event Details)
function FilteredEventsPage({ events, hasError, numYear, numMonth }) {
  const router = useRouter();

  // Access to URL takes time until component is rendered second time
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }

  // const [year, month] = filterData;
  // const numYear = Number(year);
  // const numMonth = Number(month);

  // if (isNaN(year) || isNaN(month) || numYear < 2021 || numYear > 2022 || numMonth < 1 || numMonth > 12) {
  //   return (
  //     <>
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values</p>
  //       </ErrorAlert>
  //       <div className='center'>
  //         <Button link='/events'>Show All Events</Button>
  //       </div>
  //     </>
  //   );
  // }

  const pageHeadData = (
    <Head>
      <title>Next.js Events - Filtered Events</title>
      <meta name='description' content={`All events for ${numMonth}/${numYear}`} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events;

  if (!filteredEvents?.length) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <p>{filteredEvents.length} events found</p>
      <EventList events={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  // Access to URL takes time until component is rendered second time
  const filterData = params.slug;

  const [year, month] = filterData;
  const numYear = Number(year);
  const numMonth = Number(month);

  if (isNaN(year) || isNaN(month) || numYear < 2021 || numYear > 2022 || numMonth < 1 || numMonth > 12) {
    return {
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
