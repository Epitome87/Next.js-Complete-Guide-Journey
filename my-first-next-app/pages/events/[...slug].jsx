import React from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummyData';
import EventList from '../../components/Events/EventList';
import ResultsTitle from '../../components/EventDetail/ResultsTitle/ResultsTitle';
import Button from '../../components/UI/Button';
import ErrorAlert from '../../components/UI/ErrorAlert/ErrorAlert';

function FilteredEventsPage() {
  const router = useRouter();

  // Access to URL takes time until component is rendered second time
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const [year, month] = filterData;
  const numYear = Number(year);
  const numMonth = Number(month);

  if (isNaN(year) || isNaN(month) || numYear < 2021 || numYear > 2022 || numMonth < 1 || numMonth > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents?.length) {
    return (
      <>
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
      <ResultsTitle date={date} />
      <p>{filteredEvents.length} events found</p>
      <EventList events={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
