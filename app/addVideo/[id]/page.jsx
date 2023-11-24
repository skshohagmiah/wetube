'use client'
import Comments from "@/components/Comments";
import axios from "axios";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { AiFillDislike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaShare } from "react-icons/fa";
import styles from './page.module.css';

const Video = ({params}) => {
  const [video, setVideo] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/api/addVideo/${id}`, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const updateVideo = async () => {
      try {
        const updatedVideo = await axios.put('/api/video/like', video, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        router.refresh();
      } catch (error) {
        console.error("Error updating video:", error);
      }
    };

    const updateVideoTimeout = setTimeout(updateVideo, 5000);

    return () => clearTimeout(updateVideoTimeout);
  }, [video, router]);

  const handleLike = () => {
    setLikeCount((prevLike) => (prevLike === 0 ? 1 : 0));
    setDislikeCount(0);

    setVideo((prevVideo) => ({
      ...prevVideo,
      like: likeCount === 0 ? prevVideo.like + 1 : prevVideo.like - 1,
      dislike: dislikeCount === 1 ? prevVideo.dislike - 1 : prevVideo.dislike,
    }));
  };

  const handleDislike = () => {
    setLikeCount(0);
    setDislikeCount((prevDislike) => (prevDislike === 0 ? 1 : 0));

    setVideo((prevVideo) => ({
      ...prevVideo,
      like: likeCount === 1 ? prevVideo.like - 1 : prevVideo.like,
      dislike: dislikeCount === 0 ? prevVideo.dislike + 1 : prevVideo.dislike - 1,
    }));
  };



  return (
    <div className={styles.container}>
      <video className={styles.video} src={video?.videoUrl} controls></video>
      <div className={styles.optionContainer}>
        <div className={styles.firstOption}>
          <Image src={video?.channelId?.img} alt="channel logo" width={70} height={70} />
          <div className={styles.name}>
            <div className={styles.description}>{video?.title}</div>
            <p className={styles.channel}>{video?.channelId?.name}</p>
          </div>
        </div>
        <div className={styles.secondOption}>
          <div className={styles.likebox}>
            <div onClick={handleLike}>
              {likeCount ? <FaHeart style={{ color: 'red', paddingRight: ".5rem" }} /> : <AiOutlineLike />}
              <span className={styles.likeCount}>{video?.like}</span>
            </div>
            <div onClick={handleDislike}>
              {dislikeCount ? <AiFillDislike style={{ color: 'red', padding: ".2rem" }} /> : <AiOutlineDislike />}
            </div>
          </div>
          <div>
            {<FaShare />}
          </div>
          <div>
            {<BsThreeDotsVertical />}
          </div>
        </div>
      </div>
      <div className={styles.comments}>
          {video._id && <Comments userId={video.userId} videoId={video._id}/>}
      </div>
    </div>
  );
};

export default Video;
