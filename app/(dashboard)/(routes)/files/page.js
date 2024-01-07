"use client"

import React ,{useEffect,useState,useContext} from 'react'
import { Upload } from 'lucide-react'
import useWeb5 from '../../../hooks/constants';
import { Context } from '../../../lib/Web5Provider'
import FileList from './_components/FileList'
const page = () => {
  const { web5 } = useWeb5();
  const [files,setFiles] = useState([]);


  
  const getFiles = async() => {
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
                            recordId: recordId[i]
                        },
                    },
                });
                const data = await record.data.json();
                fileLists.push(data);
                console.log("New data:",fileLists)
            }
            setFiles(fileLists);
            console.log("Yor files:",fileLists)
        }
    }catch(error){
        console.log("Error getting files from the DWN:",error);
    }

 };
  
 const deleteFiles = async() => {
    try{
        if(files){
            let recordId = files.map((file)=> {
                return file.id;
            });
            for(let i =0; i < recordId.length; i++){
                 await web5.dwn.records.delete({
                    message: {
                        filter: {
                            recordId: recordId[i]
                        },
                    },
                });
            }
            console.log("Deleted")
        }
    }catch(error){
        console.log("Error getting files from the DWN:",error);
    }

 };

 useEffect(() => {
    getFiles();
 },[web5]);
  return (
    <div>
       <FileList files={files} deleteFile={deleteFiles}/>
    </div>
  )
}

export default page
