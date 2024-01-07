
import moment from "moment/moment";
import React from "react";
import Image from "next/image";

function FileItem({file ,deleteFile}) {
  const openFile = (filePath) => {
    const fileExtension = filePath.split('.').pop().toLowerCase();
  
    switch (fileExtension) {
      case 'pdf':
        // Open PDF using a new window or a PDF viewer library
        window.open(filePath, '_blank');
        break;
      case 'docx':
      case 'pptx':
        // Handle DOCX and PPTX files based on your specific requirements
        // You might want to use a third-party library or viewer for these formats
        // For simplicity, just opening in a new window here
        window.open(filePath, '_blank');
        break;
      case 'png':
      case 'jpg':
      case 'jpeg':
        // Open image using an <Image> component or in a new window
        // Example using an <Image> component
        // Make sure to handle other image formats as needed
        return <Image src={filePath} alt="Image" />;
      default:
        // Handle other file types as needed
        console.error(`Unsupported file type: ${fileExtension}`);
    }
  };
  
  const fPath =  `data:image/png;base64,${file.name}`
  

  return (
    <div
      className="grid grid-cols-1
    md:grid-cols-2 justify-between
    cursor-pointer hover:bg-gray-100
    p-3 rounded-md"

    >
      <div className="flex gap-2 items-center" >
        <Image
          src='/docx.png'
          alt="file-icon"
          width={26}
          height={20}
          on
        />
         <h2 className="text-[15px] truncate" onClick={()=>window.open(fPath)}>
           {file.image == 'data:image/png;base64' ? (
              <Image src={`data:image/png;base64,${file.image}`} alt="uploaded"/>
           ):(
            <div>
               {file.name}
            </div>
           )}
         
          </h2>
      </div>
      <div className="grid grid-cols-3 place-content-start">
        <h2 className="text-[15px]">
           {moment(file.modifiedAt).format("MMMM DD, YYYY")} 
        </h2>
        
        <h2 className="text-[15px]">
          {(file.size / 1024 ** 2).toFixed(2) + " MB"}
          <svg  xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor"
           className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all" onClick={()=>deleteFile()}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
       
        <svg  xmlns="http://www.w3.org/2000/svg" 
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor"
           className="w-5 h-5 float-right gap-2 text-blue-500
           hover:scale-110 transition-all" onClick={()=>deleteFile(file)}>
           <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="blue"/>
        </svg>
        </h2>
         

      </div>
      
    </div>
  );
}

export default FileItem;
