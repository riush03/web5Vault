import React from 'react'
import { AlignJustify } from 'lucide-react'

const TopHeader = () => {
  return (
    <div className='flex p-5 border-b items-center justify-between md:justify-end'>
       <AlignJustify className='md:hidden'/>
    </div>
  )
}

export default TopHeader
