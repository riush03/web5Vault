"use client";

const { useEffect, useState } = require("react");
import {webcrypto} from "node:crypto"
import { Web5 } from "@web5/api/browser";

const useWeb5 = () => {
  const [web5, setWeb5] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [did, setMyDid] = useState("");
  useEffect(() => {

    const initWeb5 = async () => {
      const { Web5 } = await import('@web5/api/browser');
      
      try {
        const { web5, did } = await Web5.connect({sync: '5s'});
        setWeb5(web5);
        setMyDid(did)
        console.log(web5);
        if (web5 && did) {
          console.log('Web5 initialized');
        }
      } catch (error) {
        console.error('Error initializing Web5:', error);
      }
    };

    initWeb5();
 
}, []);

  return { web5, did,isLoading, error };
};

export default useWeb5

export function useDid(){
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
 useEffect(() => {
    async function initialize() {
      try {
        const { web5, did } = await Web5.connect();
        console.log("Web5 initialized successfully", web5, did);
        setWeb5(web5);
        setMyDid(did);
      } catch (error) {
        console.error("Error initializing Web5:", error);
      }
    }
    initialize();
  }, []);

  return { web5, myDid };
}


export const useProfile = (did) => {
  const [profile, setProfile] = useState({});
  const { web5 } = useWeb5();

  const retrieveDWN = async () => {
    try {
      const { records } = await web5.dwn.records.query({
        from: did,
        message: {
          filter: {
            schema: "http://denotech.web5/files",
            dataFormat: "application/json",
          },
        },
      });
      for (let record of records) {
        const data = await record.data.json();
        const list = { record, data, id: record.id };
        setProfile(list);
      }
    } catch (error) {
      console.error("Error retrieving data from DWN:", error);
    }
  };

  useEffect(() => {
    retrieveDWN();
  }, []);

  return profile;
};