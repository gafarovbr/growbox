"use client"
import Growbox from "@/app/components/Growbox"

import { useState, useEffect } from "react";
import { getValueFromRequestString } from "./utils/utils";

export default function Home() {

  const [data, setData] = useState(null);

  const [humidityValue, setHumidityValue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/mqtt-data");
        const obj = await response.json();
        setData(obj);
        console.log(obj)

        const str = obj?.payload || "";
        setHumidityValue(Number(getValueFromRequestString(str)))

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data every second
    const interval = setInterval(fetchData, 2000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(interval);
  }, []);


  // const response = await fetch("http://localhost:5000/mqtt-data");
  // const obj = await response.json()
  // console.log(obj.payload)
  // const str = obj.payload;

  /**
   
  const str = data?.payload || "";

  setHumidityValue(Number(getValueFromRequestString(str)))
  
   */
  // Remove the extra quotes at the start and end
  


  return (
    <main className="mb-[20px]">
      <div className="text-black max-w-[1200px] m-auto">
        <h2 className="my-[16px] text-[24px] mx-[20px]">Управляй GrowBox</h2>

        <ul className="grid grid-cols-3 mx-[30px] mt-[40px] gap-[20px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          <Growbox name={"growbox 1"} temperatureValue={24} humidityValue={humidityValue} co2Value={10}/>
          <Growbox name={"growbox 1"} temperatureValue={25} humidityValue={40} co2Value={10}/>
          <Growbox name={"growbox 1"} temperatureValue={25} humidityValue={40} co2Value={10}/>
          <Growbox name={"growbox 1"} temperatureValue={25} humidityValue={40} co2Value={10}/>
        </ul>
      </div>
    </main>
  );
}
