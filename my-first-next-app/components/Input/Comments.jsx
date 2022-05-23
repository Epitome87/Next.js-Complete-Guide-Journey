import { useContext, useEffect, useState } from 'react';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import NotificationContext from '../../store/notificationContext';

function Comments(props) {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { showNotification, notification, hideNotification } = useContext(NotificationContext);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being sent off!',
      status: 'pending',
    });

    // send data to API
    try {
      const res = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went terribly, terribly wrong!');
      }

      showNotification({
        title: 'Success!',
        message: 'Successfully sent your comment!',
        status: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong!',
        status: 'error',
      });
    }
    // We could also update the state so we can see the newly-added comment without having to refresh
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Fetching Comments...</p>}
    </section>
  );
}

export default Comments;
