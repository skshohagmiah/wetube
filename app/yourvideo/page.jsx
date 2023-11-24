import { connectToDatabase } from "@/libs/connectToMongodb";
import { getUser } from "@/libs/getUser";
import { Channel } from "@/models/channel";
import { User } from "@/models/user";
import { Video } from "@/models/video";
import styles from "@/styles/videoList.module.css";
import Image from "next/image";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

const fetchVideos = async (user) => {
  try {
    connectToDatabase();
    const fetchUser = await User.findOne({'email':user.email});
    const videos = await Video.find({'userId':fetchUser._id})
    //just imported channel model otherwise get error : mongoose error modal not register
    Channel;

    return videos;
  } catch (error) {
    console.log(error);
  }
};

const YourVideo = async () => {
  const user = await getUser();
  const videos = await fetchVideos(user);

  return (
    <>
      <h2 style={{textAlign:"center", fontSize:'1.5rem', padding:".5rem"}}>{videos?.length > 0 ? 'these are your uploaded video' : "You have not uploaded any video yet"}</h2>
    <div className={styles.container}>
      {videos?.map((video) => (
        <Link key={video._id} href={`/addVideo/${video._id}`}>
          <div className={styles.singleVideo}>
            <div className={styles.thumbnail}>
              <Image
                className={styles.img}
                src={video?.thumbnail}
                alt="thumnail"
                fill
              />
            </div>
            <div className={styles.videoInfo}>
              <div className={styles.channelImg}>
                <Image
                  className={styles.channelLogo}
                  src={user.image}
                  alt="channal image"
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.channelInfo}>
                <h3>{video.title}</h3>
                <p className={styles.channelName}>
                  {video.channelId.name} <TiTick />
                </p>
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
    </>
  );
};

export default YourVideo;
