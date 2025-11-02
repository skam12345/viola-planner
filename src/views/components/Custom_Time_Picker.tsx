import { useState } from "react";
import CommonComponent from "./Common_Component";
import { AddPlannerCustomTimePickerStyle } from "../../utils/Planner_Data";


interface CustomTimePickerProps {
 setTimeData: React.Dispatch<React.SetStateAction<string>>
 click: boolean;
}

const CustomTimePicker = ({setTimeData, click}: CustomTimePickerProps) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hourStr, setHourStr] = useState('00');
  const [minuteStr, setMinuteStr] = useState('00');

  return (
    <div className={AddPlannerCustomTimePickerStyle}>
      <CommonComponent type={'hour'} hour={hour} setHour={setHour} hourStr={hourStr} setHourStr={setHourStr} minute={minute} setMinute={setMinute} minuteStr={minuteStr} setMinuteStr={setMinuteStr} setTimeData={setTimeData} click={click} />
      <span className="text-6xl text-center mt-[-20px] text-[#6811D2]">:</span>
      <CommonComponent type={'minute'} hour={hour} setHour={setHour} hourStr={hourStr} setHourStr={setHourStr} minute={minute} setMinute={setMinute} minuteStr={minuteStr} setMinuteStr={setMinuteStr} setTimeData={setTimeData} click={click} />
    </div>
  );
}

export default CustomTimePicker;