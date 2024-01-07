"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import {ArrowLeftSquare} from 'lucide-react'
import FileInfo from './_components/FileInfo'
import ShareForm from './_components/ShareForm'

function ShareFile() {
    useEffect(() => {
        console.log()
    },[])
  return (
    <div className='py-10 px-20'>
        <Link href='upload' className='flex gap-3'><ArrowLeftSquare/></Link>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
            <FileInfo/>
            <ShareForm/>
        </div>
    </div>
  )
}

export default ShareFile