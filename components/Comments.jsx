import styles from '@/styles/comments.module.css';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Comments = ({ userId, videoId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/video/comment', { content:comment, userId, videoId });
      setComments('')
       await fetchComments()
    } catch (error) {
      console.log('error creating comment', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/video/comment/${videoId}`);
        setComments(response.data);
        console.log(response.data)
    } catch (error) {
      console.log('error fetching comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className={styles.container}>
      <h3>Add A Comment</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          name="comment"
          placeholder="write your comment"
        />
        <input type="submit" />
      </form>
      <h2>All Comments</h2>
      <div className={styles.container}>
        {comments?.length > 0 && comments?.map((comment) => (
          <div className={styles.singleComment} key={comment._id}>
            <div className={styles.user}>
                <Image src={comment?.userId?.img} alt='user pic' width={50} height={50}/>
                <h3>{comment.userId.name}</h3>
            </div>
            <p>{comment.content}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
