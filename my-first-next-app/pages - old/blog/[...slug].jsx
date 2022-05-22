import React from 'react';
import { useRouter } from 'next/router';

function BlogPostsPage() {
  const router = useRouter();
  const query = router.query;

  return <div>Blog Posts Page</div>;
}

export default BlogPostsPage;
