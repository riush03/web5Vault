import Image from "next/image";
import { Web5 } from "@web5/api";
import React, { useContext, useEffect, useState } from "react";
import {ParentFolderIdContext} from '../../lib/ParentFolderIdContext';
import {ShowToastContext} from '../../lib/ShowToastContext';

function CreateFolderModal() {
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext);
  const {parentFolderId,setParentFolderId}=useContext(ParentFolderIdContext);

  const schema = {
    "context": 'http://dennotech.web5/folders',
    get uri() { return this.context ; }
  }

  const onCreate=async()=>{
    console.log(folderName)
    try {
      const { web5 } = await Web5.connect();
    
        const { record } = await web5.dwn.records.create({
          data: { 
            name: folderName,
          },
          message: {
            schema: schema.uri,
            dataFormat: "application/json",
          },
        });
        if (record) console.log(await record.data.json());
        setShowToastMsg('Folder Created!')
    } catch (error) {
      console.error("Error creating folder:", error);
    }
}

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className="w-full items-center 
        flex flex-col justify-center gap-3">
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
                
          />
          <button className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
          onClick={()=>onCreate()}
          >Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateFolderModal;
