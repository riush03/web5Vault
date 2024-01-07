import React from 'react'

function ShareButton({userDid}) {
    return (
        <div className='p-3 bg-blue-50 
        rounded-lg text-center mt-5 bottom-0'>
            <h2 className='font-semibold text-[17px]'>Need To Share Files?</h2>
            <h2 className='text-[13px]'>{userDid}</h2>
            <button className='bg-blue-500 p-2 px-4
            text-[14px] rounded-lg text-white mt-3'>Share</button>
        </div>
      )
}

export default ShareButton