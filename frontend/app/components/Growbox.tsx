"use client"

import Rectangle from "@/app/components/Rectangle";
import { useState } from "react";

interface GrowboxProps {
  name: string;
  co2Value: number;
  temperatureValue: number;
  humidityValue: number;
}

const Growbox: React.FC<GrowboxProps> = ({ name, temperatureValue, humidityValue, co2Value }) => {


  const [isManual, setIsManual] = useState<boolean>(true)

  function handleManualClick(e: unknown) {
    e.preventDefault();
    setIsManual(true);
  }

  function handleTimerClick(e: unknown) {
    e.preventDefault();
    setIsManual(false);
  }

  return (
    <li className="w-100 border-[1px] rounded-[8px]">
      <h3 className="text-center mt-[16px] mb-[20px]">{name}</h3>
      <ul className="flex flex-col gap-[20px] mb-[10px]">
        <li>
          <p className="mx-[20px]">температура, С</p>
          <div className="mx-[20px]">
            <Rectangle minValue={0} maxValue={100} value={temperatureValue}/>
          </div>
        </li>
        <li>
          <p className="mx-[20px]">влажность воздуха, С</p>
          <div className="mx-[20px]">
            <Rectangle minValue={-20} maxValue={300} value={humidityValue}/>
          </div>
        </li>
        <li>
          <p className="mx-[20px]">CO2, С</p>
          <div className="mx-[20px]">
            <Rectangle minValue={0} maxValue={100} value={co2Value}/>
          </div>
        </li>
      </ul>
      <form className="mx-[30px] mb-[20px]">
        <p className="mx-[10px] my-[6px]">Режим управления:</p>
        <ul className="font-normal flex flex-col gap-[6px]">
          <li className="flex items-center text-[16px]">
            <div className={`h-[16px] w-[16px] ${isManual && 'bg-black'} rounded-full mr-[10px] border-[1px] border-black`}></div>
            <button onClick={handleManualClick}>Ручной</button>
          </li>
          <li className="flex items-center text-[16px]">
            <div className={`h-[16px] w-[16px] ${!isManual && 'bg-black'} rounded-full mr-[10px] border-[1px] border-black`}></div>
            <button onClick={handleTimerClick}>По таймеру</button>
          </li>
        </ul>
      </form>
    </li>
  );
};

export default Growbox