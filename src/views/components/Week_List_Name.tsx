import { useState } from "react";

interface nameProps {
  setNameList: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

const WeekListName = ({setNameList, index}: nameProps) => {
  const [name, setName] = useState('');
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameList(prevList => {
      const newList = [...prevList];
      newList[index] = e.target.value;
      return newList;
    });
  }

  return (
    <input type="text" className="w-[80%] h-full outline-none border-1 rounded-[8px] text-[13px] pl-[15px] pr-[15px] text-black" value={name} onChange={onNameChange}/>
  );
}

export default WeekListName;