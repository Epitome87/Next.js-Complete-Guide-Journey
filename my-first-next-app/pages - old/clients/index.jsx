import React from 'react';
import Link from 'next/link';

function ClientsPage() {
  const clients = [
    { id: 'matthew', name: 'Matthew' },
    { id: 'caitlin', name: 'Caitlin' },
  ];
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link href={`/clients/${client.id}`}>{client.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientsPage;
