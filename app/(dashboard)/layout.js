"use client"
import React,{ useState } from "react";
import SideNav from "./_components/SideNav";
import TopHeader from "./_components/TopHeader";
import SideNavBar from "./_components/SideNav";
import SearchBar from "./_components/SearchBar";
import UserProfile from "./_components/Profile/UserProfile";
import Toast from "./_components/Toast";
import {ParentFolderIdContext} from '../lib/ParentFolderIdContext'
import { ShowToastContext } from "../lib/ShowToastContext";

function layout({children}) {
    const [showToastMsg,setShowToastMsg]=useState();
    const [parentFolderId,setParentFolderId]=useState();
    return (
        <div>
            <ParentFolderIdContext.Provider value={{parentFolderId,setParentFolderId}}>
                      <ShowToastContext.Provider value={{showToastMsg,setShowToastMsg}}>
            <div className="h-full w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
                <SideNavBar/>
            </div>
            <div className="ml-64">
                <SearchBar/>
            </div>
            <div className="ml-64 items-center flex">
               <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                 <div className="col-span-2">
                           {children}
                 </div>
                 <div className="bg-white p-5 order-first md:order-last">
                         <UserProfile/>
                     </div>
               </div>
            </div>
            {showToastMsg?<Toast msg={showToastMsg} />:null}
                     </ShowToastContext.Provider>
           </ParentFolderIdContext.Provider>
        </div>
    )
}

export default layout