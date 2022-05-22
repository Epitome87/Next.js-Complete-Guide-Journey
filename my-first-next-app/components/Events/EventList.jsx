import React from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.css';

function EventList({ events }) {
  if (!events) {
    return <p>Loading Events</p>;
  }

  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <li key={event.id}>
          <EventItem
            id={event.id}
            image={event.image}
            date={event.date}
            location={event.location}
            title={event.title}
          />
        </li>
      ))}
    </ul>
  );
}

export default EventList;
