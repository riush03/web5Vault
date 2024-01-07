"use client"
import { Web5 } from "@web5/api";
import React, { useContext } from "react";
import { ShowToastContext } from "../../lib/ShowToastContext";
import { ParentFolderIdContext } from "../../lib/ParentFolderIdContext";

function UploadFileModal({ closeModal }) {
  const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
  const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext);

  const schema = {
    "context": 'http://dennotech.web5/files',
    get uri() { return this.context ; }
  }

  const fileUploadProtocol = {
    protocol: "http://dennotech.web5",
    published: true,
    types:{
      files:{
        schema: schema.uri,
        dataFormats: ["application/json"],
      },
    },
    structure: {
      file: {
        $actions: [{ who: "author", of: "file", can: "write" }],
      },
    },
  };

  const uploadFile = async(e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    const fileType = file.name.split(".").pop();

    const currentDate = new Date()
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const fileName = `FILE${currentDate}.${fileType}`;

    try {
      const { web5 } = await Web5.connect();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        if (!base64Image) {
          return;
        }
        const { record } = await web5.dwn.records.create({
          data: { 
            name: fileName,
            image: base64Image,
            size: file.size,
            imageUrl:file.imageUrl,
            parentFolderId:parentFolderId,
          },
          message: {
            schema: schema.uri,
            dataFormat: "application/json",
          },
        });
        if (record) console.log(await record.data.json());
      };
      reader.readAsDataURL(file);
      closeModal(true)
      setShowToastMsg("File Uploaded Successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }


  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center w-[360px]">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={uploadFile}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadFileModal;
