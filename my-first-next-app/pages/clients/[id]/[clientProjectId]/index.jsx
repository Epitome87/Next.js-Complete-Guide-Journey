import React from 'react';
import { useRouter } from 'next/router';

function ClientProjectPage() {
  const router = useRouter();
  const { id, clientProjectId } = router.query;

  return (
    <div>
      Project ID {clientProjectId} for Client ID {id}{' '}
    </div>
  );
}

export default ClientProjectPage;
