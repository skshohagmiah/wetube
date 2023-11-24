import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const loading = () => {
  return (
    <div style={{display:'flex',alignItems:'center', flexDirection:'column', height:"100vh"}}>
      <Skeleton width={'100%'}   height={100} count={5} />
    </div>
  )
}

export default loading