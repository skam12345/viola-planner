import { useState } from "react";
import { IoMdArrowDropleft,  IoMdArrowDropright } from "react-icons/io";

interface CustomProps {
  setWeekList: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}

const CustomWeekPicker = ({setWeekList, index}: CustomProps) => {
  const weekName = ['일', '월', '화', '수', '목', '금', '토'];

  const [weekStr, setWeekStr] = useState('월');

  const rightControl = () => {

    let weekIndex = weekName.indexOf(weekStr)

    weekIndex += 1;
    if (weekIndex > weekName.length - 1) {
      weekIndex = 0;
      setWeekStr(weekName[weekIndex]); 
      setWeekList(prevList => {
        const newList = [...prevList];
        newList[index] = weekIndex;
        return newList;
      });     
    }else {
      setWeekStr(weekName[weekIndex]);
      setWeekList(pevList => {
        const newList = [...pevList];
        newList[index] = weekIndex;
        return newList;
      });
    }
    
  }
  const leftControl = () => {

    let weekIndex = weekName.indexOf(weekStr)

    weekIndex -= 1;
    if (weekIndex < 0) {
      weekIndex = weekName.length - 1;
      setWeekStr(weekName[weekIndex]); 
      setWeekList(pevList => {
        const newList = [...pevList];
        newList[index] = weekIndex;
        return newList;
      });     
    }else {
      setWeekStr(weekName[weekIndex]);
      setWeekList(prevList => {
        const newList = [...prevList];
        newList[index] = weekIndex;
        return newList;
      });
    }
    
  }


  return (
    <div className="w-[68px] h-full flex flex-row justify-between items-center">
      <div className="flex-1 h-full flex flex-col justify-center items-center" onClick={leftControl}>
        <IoMdArrowDropleft fontSize={20} color={'#6A15D3'}/>
      </div>
      <div className="flex-2 h-full flex flex-col justify-center items-center bg-[#E1DCFC] text-center font-bold text-black">
        {weekStr}
      </div>
      <div className="flex-1 h-full flex flex-col justify-center items-center" onClick={rightControl}>
        <IoMdArrowDropright fontSize={20} color={'#6A15D3'}/>
      </div>
    </div>
  )
}

export default CustomWeekPicker