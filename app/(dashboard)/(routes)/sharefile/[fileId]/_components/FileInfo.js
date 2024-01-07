import React, {useState, useEffect } from 'react'
import Image from 'next/image'

function FileInfo({file})  {
    const [fileType,setFileType] = useState();
    useEffect(()=>{
       file&&setFileType(file?.fileType.split('/')[0]);
       console.log(fileType)
    },[])
  return file&&(
    <div className='text-center border flex justify-center m-4 flex-col items-center p-2 rounded-md border-blue-200'>
        <Image src='/docx.png'
          width={200} height={200} className='h-200px rounded-md object-contain'/>
          <div>

          </div>
    </div>
  )
}

export default FileInfo