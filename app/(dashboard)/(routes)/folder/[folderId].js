"use client"
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import SearchBar from '../../_components/SearchBar'
import FolderList from '../home/_components/FolderList';
import ParentFolderIdContext from '../../../lib/ParentFolderIdContext'
import { ShowToastContext } from '../../../lib/ShowToastContext';
import FileList from '../files/_components/FileList';

function FolderDetails() {
    const router=useRouter();
    const {name,id}=router.query;
    const {parentFolderId,setParentFolderId} = useContext(ParentFolderIdContext)

    const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext);

    const [folderList,setFolderList]=useState([]);
    const [fileList,setFileList]=useState([]);
     
     useEffect(()=>{
        setParentFolderId(id);
        if(showToastMsg!=null)
        {
          setFolderList([]);
          setFileList([]);
            getFolderList();
            getFileList();
        }
     },[id,showToastMsg])

    const deleteFolder=async()=>{
      await web5.dwn.records.delete({
        message:{
            filter: {
                schema: "http://dennotech.web5/folders",
                dataFormat: "application/json",
            },
        },
        dateSort: 'createdAscending',
    });
    setShowToastMsg('Folder Deleted !')
    router.back();
    }

       
  const getFolderList = async() => {
    try{
        const folderLists = [];

        const { records } = await web5.dwn.records.query({
            message:{
                filter: {
                    schema: "http://dennotech.web5/folders",
                    dataFormat: "application/json",
                },
            },
            dateSort: 'createdAscending',
        });

        if(records){
            let recordId = records.map((record)=> {
                return record.id;
            });
            for(let i =0; i < recordId.length; i++){
                let { record } = await web5.dwn.records.read({
                    message: {
                        filter: {
                            recordId: recordId[i]
                        },
                    },
                });
                const data = await record.data.json();
                folderLists.push(data);
            }
            setFolderList(folderLists);
        }
    }catch(error){
        console.log("Error getting files from the DWN:",error);
    }

 };

 const getFileList = async() => {
  try{
      const fileLists = [];

      const { records } = await web5.dwn.records.query({
          message:{
              filter: {
                  schema: "http://dennotech.web5/files",
                  dataFormat: "application/json",
              },
          },
          dateSort: 'createdAscending',
      });

      if(records){
          let recordId = records.map((record)=> {
              return record.id;
          });
          for(let i =0; i < recordId.length; i++){
              let { record } = await web5.dwn.records.read({
                  message: {
                      filter: {
                          parentFolderId:parentFolderId.recordId[i]
                      },
                  },
              });
              const data = await record.data.json();
              fileLists.push(data);
          }
          setFileList(fileLists);
      }
  }catch(error){
      console.log("Error getting files from the DWN:",error);
  }

};


  return (  
    <div className='p-5'>
        <SearchBar/>
        <h2 className='text-[20px] font-bold mt-5'>{name}
        <svg xmlns="http://www.w3.org/2000/svg" 
        onClick={()=>deleteFolder()}
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor"
           className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all cursor-pointer">
       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </h2>
   
       {folderList.length>0? <FolderList 
        folderList={folderList}
        isBig={false}/>:
        <h2 className='text-gray-400
        text-[16px] mt-5'>No Folder Found</h2>}

        <FileList fileList={fileList} />
    </div>
  )
}

export default FolderDetails