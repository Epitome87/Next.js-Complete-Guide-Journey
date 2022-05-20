import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/Events/EventList';
import EventsSearch from '../../components/Events/EventsSearch';
import { getAllEvents, getFeaturedEvents, getFilteredEvents } from '../../dummyData';

function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState(getAllEvents());

  const handleSearch = (year, month) => {
    console.log('SEARCHING', year, month);
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  return (
    <>
      <EventsSearch onSearch={handleSearch} />
      <EventList events={events} />
    </>
  );
}

export default EventsPage;
