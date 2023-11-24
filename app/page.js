
import VideoList from '@/components/VideoList'

export default async function Home({searchParams}) {
  const params = searchParams.search
  return (
      <VideoList searchParams={params} />
  )
}
