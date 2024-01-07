"use client"

import React, { createContext, useEffect, useState } from "react";
import protocolDefinition from "../_utils/protocolDefinition";

export const Context = createContext();

export const Web5Provider = (props) => {
    const [web5, setWeb5] = useState(null);
    const [userDid, setUserDid] = useState("");
    const [fullname, setFullName] = useState("")
    const [records, setRecords] = useState([]);
    const [connecting, setConnecting] = useState(false);


    const connectWeb5 = async () => {
        const { Web5 } = await import('@web5/api/browser');
        setConnecting(true);

        console.log("connecting to web5")
        const { web5, did } = await Web5.connect({ sync: '5s' });
        console.log("userDid: ", did);

        const timestamp = new Date().getTime();
        localStorage.setItem("lastConnectionTimestamp", timestamp);
        
        setWeb5(web5);
        setUserDid(did);

        const { protocol, status: configStatus } = await Web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });

        console.log("Local protocol installation was successful:", protocol, configStatus);
        const { status: configRemoteStatus } = await protocol.send(did);
        console.log("Protocol installation status",configRemoteStatus);
        return {web5,did};
    }

    const userProfile = (did) => {
        const [profile, setProfile] = useState({});
        const { web5 } = connectWeb5();
      
        const retrieveDWN = async () => {
          try {
            const { records } = await web5.dwn.records.query({
              from: did,
              message: {
                filter: {
                  schema: "http://dennotech.web5/userprofile",
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

    const disconnectAccount = async () => {
        localStorage.setItem("lastConnectionTimestamp", null);
        console.log("Disconnect")
        setWeb5("");
        setUserDid("");
    
    }

    useEffect(() => {
        const lastConnectionTimestamp = localStorage.getItem(
            "lastConnectionTimestamp"
        );

        if (lastConnectionTimestamp) {
            const thirtyMinutesInMillis = 30 * 60 * 1000;
            const currentTime = new Date().getTime();
            const timeSinceLastConnection = currentTime - lastConnectionTimestamp;

            if (timeSinceLastConnection < thirtyMinutesInMillis) {
                connectWeb5();
            }
        }

        return () => {
            console.log("Getting account")
        }
    }, [])

    const value = {
        web5, setWeb5, userDid, setUserDid, connectWeb5, connecting, setConnecting,userProfile, disconnectAccount,
        fullname, setFullName,  records, setRecords,
    };

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
