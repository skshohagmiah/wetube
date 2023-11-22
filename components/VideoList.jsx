import { connectToDatabase } from "@/libs/connectToMongodb";
import { Video } from "@/models/video";
import styles from "@/styles/videoList.module.css";
import Image from "next/image";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

const fetchVideos = async () => {
  try {
    connectToDatabase();
    const videos = await Video.find({}).populate("channelId");
    console.log(videos);
    return videos
  } catch (error) {
    console.log(error);
  }
};

const VideoList = async () => {
  const videos = await fetchVideos();


  return (
    <div className={styles.container}>
      {videos?.map((video) => (
        <Link key={video._id} href={`/addVideo/${video._id}`}>
           <div  className={styles.singleVideo}>
          <div className={styles.thumbnail}>
            <Image className={styles.img} src={video?.thumbnail} alt="thumnail" fill />
          </div>
          <div className={styles.videoInfo}>
            <div className={styles.channelImg}>
              <Image className={styles.channelLogo} src={video?.channelId?.img} alt="channal image" width={50} height={50} />
            </div>
            <div className={styles.channelInfo}>
              <h3>{video.title}</h3>
              <p className={styles.channelName}>{video.channelId.name} <TiTick /></p>
              <div className={styles.metaInfo}>
                <p> views {Math.floor(Math.random() * 10000 + 1)}k</p>
                <p>{Math.floor(Math.random() * 10 + 1)} weeks ago</p>
              </div>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
