"use client"

import React,{ useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import create from '../auth/page'
import Constants from '../_utils/Constant'

const Hero = () => {

  return (
    <div>
        <section className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        <span className='text-primary'>Upload, Save </span>and easily <span className='text-primary'>share</span> your files in one place.
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
         {Constants.desc}
      </p>
      
       <div className="mt-8 flex flex-wrap justify-center gap-4">
             <a href='/createaccount' className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
              Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
        </div>
          </div>
        </section>
    </div>
  )
}

export default Hero