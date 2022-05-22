import React, { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState();

  const handleFeedbackClick = async (id) => {
    const res = await fetch(`/api/feedback/${id}`);
    const data = await res.json();

    setFeedbackData(data.feedback);
  };

  return (
    <div>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}
            <button onClick={(event) => handleFeedbackClick(item.id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackPage;

export async function getStaticProps(context) {
  // NOPE! Can't use fetch for internal server logic. Import our API helpers instead!
  //   const res = await fetch('/api/feedback');
  //   const data = await res.json();

  const data = extractFeedback(buildFeedbackPath());

  return {
    props: {
      feedbackItems: data,
    },
  };
}
