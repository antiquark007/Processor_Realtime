import { useState, useEffect } from "react";

const Network=()=>{
    const [wifiSpeed,setWifiSpeed]=useState("unknown");

    useEffect(()=>{
        const updateWifiSpeed=()=>{
            //wifi speed
            const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
            if (connection){
                setWifiSpeed(connection.downlink+"Mbps");
            }
        };

        updateWifiSpeed();

        const intervalId=setInterval(updateWifiSpeed,1000);

        return ()=>clearInterval(intervalId);

        
    },[]);

    return(
        <div className="container">
            <p><strong>Wifi Speed:</strong>{wifiSpeed}</p>
        </div>
    )

}

export default Network;