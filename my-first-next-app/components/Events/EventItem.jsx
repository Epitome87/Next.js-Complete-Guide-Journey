import React from 'react';
import Link from 'next/link';
import styles from './EventItem.module.css';
import Button from '../UI/Button';

function EventItem({ id, image, date, location, title }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(' ', '\n');

  return (
    <div className={styles.item}>
      <img src={image} alt={title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={`events/${id}`}>Explore Event</Button>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
