"use client"
import React from 'react'
import SharedItem from './SharedItem'
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    VStack,
    CSSReset,
    extendTheme,
    Alert,
    AlertIcon,
    Flex,
  } from "@chakra-ui/react";
import useWeb5 from '../../../../hooks/constants'

function SharedList() {
    const {did} = useWeb5();
     const fileList=[
        {
             id:1,
             name:'UX Principal.docx',
             type:'doc',
             size:'6272 kB',
             modifiedAt:'Nov 23,2020'
         },
         {
             id:2,
             name:'Data Structure.pdf',
             type:'pdf',
             size:'672 kB',
             modifiedAt:'Nov 23,2022'
         },
         {
             id:3,
             name:'smaple Image.png',
             type:'image',
             size:'400 kB',
             modifiedAt:'Nov 23,2023'
         },
         {
             id:4,
             name:'React Principal.docx',
             type:'doc',
             size:'6272 kB',
             modifiedAt:'Nov 23,2020'
         },
        
     ]
   
  return (
    <div className='bg-white mt-5 p-5
    rounded-lg'>
        <h2 className='text-[18px] font-bold'>Shared Files</h2>
        <div className='grid grid-cols-1
        md:grid-cols-2 
        text-[13px] 
        font-semibold
        border-b-[1px]
        pb-2 mt-3
        border-gray-300
         text-gray-400'>
            <h2>Name</h2>
            <div className='grid grid-cols-3'>
            <h2>Modified</h2>
            <h2>Size</h2>
            <h2></h2>
            
            </div>
        </div>
        <h2>Your DID: {did}</h2>
        {fileList&&fileList.map((item,index)=>(
            <div key={index}>
           
            <SharedItem file={item} key={index}/> 
            </div>  
             
        ))}

        <div>
             {did && (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <Text>Your DID: {did}</Text>
            </Alert>
          )}
          </div>
    </div>
  )
}

export default SharedList