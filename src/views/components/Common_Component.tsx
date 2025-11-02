import { useCallback, useEffect } from "react";
import { AddPlannerCustomArrowBoxStyle, AddPlannerCustomNumberBoxStyle, AddPlannerCustomTimePickerBoxStyle, commonTimePickerDownFunc, commonTimePickerUpFunc } from "../../utils/Planner_Data";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

interface CommonProps {
  type: string;
  hour: number;
  setHour: React.Dispatch<React.SetStateAction<number>>;
  minute: number;
  setMinute: React.Dispatch<React.SetStateAction<number>>;
  hourStr: string;
  setHourStr: React.Dispatch<React.SetStateAction<string>>;
  minuteStr: string;
  setMinuteStr: React.Dispatch<React.SetStateAction<string>>;
  setTimeData: React.Dispatch<React.SetStateAction<string>>
  click: boolean
}

const CommonComponent = ({ type, hour, setHour, minute, setMinute, hourStr, setHourStr, minuteStr, setMinuteStr, setTimeData, click}: CommonProps) => {
    useEffect(() => {
      const pattern = /^0[0-9].*/;
      if(type === 'hour') {
        switch (pattern.test(hourStr)) {
          case true:
            setHourStr(hourStr);
            setHour(parseInt(hourStr[1]));
            setTimeData(hourStr + ':' + minuteStr);
            break;
            case false:
              if(parseInt(hourStr) > 23) {
               setTimeData('00:' + minuteStr);
                setHour(0);
                setHourStr('00');
            }else {
              setHourStr(hourStr);
              setHour(parseInt(hourStr));
              setTimeData(hourStr + ':' + minuteStr);
            }
            break;
        }
      }else {
        switch (pattern.test(minuteStr)) {
          case true:
            setMinuteStr(minuteStr);
            setMinute(parseInt(minuteStr[1]));
            setTimeData(hourStr + ':' + minuteStr);
            break;
          case false:
            if(parseInt(minuteStr) > 59) {
              setMinuteStr('00');
              setMinute(0);
              setTimeData(hourStr + ':00');
            }else {
              setMinuteStr(minuteStr);
              setMinute(parseInt(minuteStr));
              setTimeData(hourStr + ':' + minuteStr);
            }
            break;
        }
      }
    }, [hourStr, minuteStr, setHour, setHourStr, setMinute, setMinuteStr, setTimeData, type]);
    
    useEffect(() => {
      if(!click) {
        setHour(0)
        setMinute(0)
        setHourStr('00')
        setMinuteStr('00')
        setTimeData('00:00')
      }
    }, [click, setHour, setHourStr, setMinute, setMinuteStr, setTimeData])

    const handleUpTimeChange = () => {
      if(type === 'hour') {
        commonTimePickerUpFunc(hour, setHour, setHourStr, type, hour, hourStr, minuteStr, setHour, setHourStr, setTimeData);
      } else {
        commonTimePickerUpFunc(minute, setMinute, setMinuteStr, type,  hour, hourStr, minuteStr, setHour, setHourStr, setTimeData);
      }
    }

    const handleDownTimeChange = () => {
      if(type === 'hour') {
        commonTimePickerDownFunc(hour, setHour, setHourStr, type, hour,hourStr, minuteStr, setHour, setHourStr, setTimeData);
      } else {
        commonTimePickerDownFunc(minute, setMinute, setMinuteStr, type, hour, hourStr, minuteStr, setHour, setHourStr, setTimeData);
      }
    }

    const timeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      
      if(type === 'hour') {
        setHourStr(e.target.value);
      }else {
        setMinuteStr(e.target.value);
      }
    }, [setHourStr, setMinuteStr, type]);


    return (
      <div className={AddPlannerCustomTimePickerBoxStyle}>
        <div className={AddPlannerCustomArrowBoxStyle} onClick={handleUpTimeChange}>
          <IoMdArrowDropup fontSize={22} color={'#6811D2'}/>
        </div>
        <div className={AddPlannerCustomNumberBoxStyle}>
          <input className="w-full h-full p-[7px] focus:bg-[#9265B6] outline-none text-6x1 text-center font-bold text-black focus:text-white" type="text" name={`${type === 'hour' ? 'hourStr' : 'minuteStr'}`} maxLength={2} value={type === 'hour' ? hourStr: minuteStr} onChange={timeChange} />
        </div>
        <div className={AddPlannerCustomArrowBoxStyle} onClick={handleDownTimeChange}>
          <IoMdArrowDropdown fontSize={22} color={'#6811D2'}/>
        </div>
      </div>
    );
  }

  export default CommonComponent;