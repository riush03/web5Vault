import React from 'react'
import { Copy } from 'lucide-react'

function ShareForm() {
  return (
    <div className='flex flex-col gap-2'>
        <div>
            <label className='text-[14px] text-gray-500'>Short URL</label>
            <div className='flex gap-5 p-2 border rounded-md'>
                <input type='text' value={0} className='disabled:text-gray-500 outline-none'/>
                <Copy className='text-gray-400 hover:text-gray-800'/>
            </div>
        </div>

        <div className='gap-3 flex mt-5'>
            <input type='checkbox' />
            <label>Enable Password</label>
        </div>
    </div>
  )
}

export default ShareForm