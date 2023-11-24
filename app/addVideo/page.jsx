import { connectToDatabase } from "@/libs/connectToMongodb";
import { getUser } from "@/libs/getUser";
import { Channel } from "@/models/channel";
import { User } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";


async function fetchChannel() {
  try {
    connectToDatabase();
    const currentUser = await getUser();
    const user  = await User.findOne({email:currentUser?.email})
    const channels = await Channel.find({"userId" : user?._id});
    return channels;
  } catch (error) {
    console.log(error);
  }
}

const ChannelOptions = async () => {
  
  const channels = await fetchChannel();

  return (
    <div className={styles.container}>
      <h2>{channels?.length > 0 ?"Select a channel to upload video":"Create an channel to upload video"}</h2>
      <div  className={styles.channels}>
        {channels?.length > 0 ? (
          channels.map((item) => 
          <Link href={`/addChannel/${item._id}`} key={item._id}>
          <button >
            <Image src={item.img} alt='thumbnail' height={50} width={50}/>
            {item.name} </button>
          </Link>)
        ) : (
          <Link href="/addChannel">
            <p>No Channel is Found !</p>
            <button className="">Create a Channel</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChannelOptions;
