/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { app } from '@/libs/firebase';
import styles from '@/styles/uploadVideo.module.css';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiVideoUploadFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';

const UploadVideo = ({channelId}) => {

const [title, setTitle] = useState();
const [description, setDescription] = useState();
const [thumb, setThumbnail] = useState();
const [video, setVideo] = useState();
const [videoUrl, setVideoUrl] = useState();
const [thumbnailUrl, setThumbnailUrl] = useState();
const [loading, setLoading] = useState(false)

const {data:session} = useSession();
const router = useRouter()

async function postVideo(data){

    try {
          setLoading(true)
          await axios.post('/api/addVideo',data)
          setLoading(false)
          router.push('/')
          router.refresh()

    } catch (error) {
        console.log(error)
        setLoading(false)
    }

}

const notify = () => toast("Your Video is Uploading!");

function handleImage(){
   return new Promise((resolve, reject) => {
    const storage = getStorage(app)
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + thumb.name);
    const uploadTask = uploadBytesResumable(storageRef, thumb);
    
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
    
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => resolve(downloadURL))
        .catch(reject);
    });
   })
}




function handleVideo(){
  return new Promise((resolve,reject) => {
    const storage = getStorage(app)
// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'videos/' + video.name);
const uploadTask = uploadBytesResumable(storageRef, video);

uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {

    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {

    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => resolve(downloadURL))
      .catch(reject);
  });
  })

}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    notify();
    setLoading(true)
    const [thumbnailUrl, videoUrl] = await Promise.all([handleImage(), handleVideo()]);
    

    // Now you can use thumbnailUrl and videoUrl to post your data or perform any other actions.
    postVideo({ title, description, thumbnail: thumbnailUrl, videoUrl, email: session?.user?.email, channelId });
    setLoading(false)
  } catch (error) {
    console.error("Error during form submission:", error);
  }
}


  return (
    <div className={styles.container}>
      <ToastContainer />
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Upload Video</h2>
            <label htmlFor="title">Title:</label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" id="title" />
            <label htmlFor="desc">Description:</label>
            <input onChange={(e) => setDescription(e.target.value)} value={description}  type="text" name="desc" id="desc" />
            <label className={styles.thumbnail} htmlFor="thumb">{thumb ? 'Thumbnail Selected':'Select a Thumbnail'}
              <FaCloudUploadAlt size={100}/>
            </label>
            <input onChange={(e) => setThumbnail(e.target.files[0])}  type="file" name="thumbnail" id="thumb" />
            <label className={styles.video} htmlFor="video">{video ?"Video Selected" : "Upload a Video"}
              <RiVideoUploadFill size={100}/>
            </label>
            <input onChange={(e) => setVideo(e.target.files[0])}   type="file" name="video" id="video" />
            <input type="submit" disabled={loading} value={loading?"Uploading..." :"Upload"} />
        </form>
    </div>
  )
}

export default UploadVideo