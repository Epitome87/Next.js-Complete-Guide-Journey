const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-01-15',
    image: 'https://source.unsplash.com/random/950×700/?programming',
    isFeatured: false,
  },
  {
    id: 'e2',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-08',
    image: 'https://source.unsplash.com/random/900×750/?programming',
    isFeatured: false,
  },
  {
    id: 'e3',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'https://source.unsplash.com/random/920×700/?programming',
    isFeatured: false,
  },
  {
    id: 'e4',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-25',
    image: 'https://source.unsplash.com/random/900×720/?programming',
    isFeatured: false,
  },
  {
    id: 'e5',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2022-02-05',
    image: 'https://source.unsplash.com/random/910×700/?programming',
    isFeatured: false,
  },
  {
    id: 'e6',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2022-03-14',
    image: 'https://source.unsplash.com/random/900×710/?programming',
    isFeatured: false,
  },
  {
    id: 'e7',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2022-04-15',
    image: 'https://source.unsplash.com/random/960×700/?programming',
    isFeatured: false,
  },
  {
    id: 'e8',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'https://source.unsplash.com/random/900×760/?programming',
    isFeatured: true,
  },
  {
    id: 'e9',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'https://source.unsplash.com/random/920×720/?programming',
    isFeatured: false,
  },
  {
    id: 'e10',
    title: 'Programming for everyone',
    description: 'Everyone can learn to code!',
    location: 'Somestreet, 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'https://source.unsplash.com/random/910×710/?programming',
    isFeatured: false,
  },
  {
    id: 'e11',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image: 'https://source.unsplash.com/random/910×710/?programming',
    isFeatured: false,
  },
  {
    id: 'e12',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'https://source.unsplash.com/random/910×710/?programming',
    isFeatured: true,
  },
  {
    id: 'e13',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'https://source.unsplash.com/random/910×710/?programming',
    isFeatured: true,
  },
];

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export default DUMMY_EVENTS;
