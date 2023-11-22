
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddChannel = () => {

const [name, setName] = useState();
const [thumb, setThumbnail] = useState();
const [thumbnailUrl, setThumbnailUrl] = useState();
const [loading, setLoading] = useState(false);

const {data:session} = useSession();
const router = useRouter()

const email = session?.user?.email

const notify = () => toast("Your Channel is Being Created !");

async function createChannal(data){
    try {
        setLoading(true)
         await axios.post('api/channel',data)
         setLoading(false)
        router.push('/addVideo')

    } catch (error) {
        console.log(error)  
        throw error;     
    }
}


function handleImage(){
  setLoading(true)
    const storage = getStorage(app)
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'thumbnails/' + thumb.name);
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setThumbnailUrl(downloadURL);
          setLoading(false)
          if(thumbnailUrl){
            createChannal({name,thumbnailUrl,email})

          }
        });
      }
      );
}

 function handleSubmit(e){
    e.preventDefault()
    handleImage()
    notify()

}
  return (
    <div className={styles.container}>
      <ToastContainer />
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="name">Channel Name:</label>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="title" id="title" />
            <label className={styles.thumbnail} htmlFor="thumb">{thumb ?"Image selected" :"Channel Image"}
              <FaCloudUploadAlt size={100}/>
            </label>
            <input onChange={(e) => setThumbnail(e.target.files[0])}  type="file" name="thumbnail" id="thumb" />
            <input type="submit" />
        </form>
    </div>
  )
}

export default AddChannel;