import React from 'react'
import UploadForm from './_components/UploadForm'
const Upload = () => {
  return (
    <div className='p-5 px-8 md:px-28'>
        <h1 className='text-[20px] text-center m-5'>Start <strong className='text-primary'>Uploading</strong> File and <strong className='text-primary'>Share</strong> it.</h1>
        <UploadForm/>
    </div>
  )
}

export default Upload
