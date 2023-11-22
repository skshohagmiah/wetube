import UploadVideo from "@/components/UploadVideo"

const page = ({params}) => {
  return (
    <div>
        <UploadVideo channelId={params.id}/>
    </div>
  )
}

export default page