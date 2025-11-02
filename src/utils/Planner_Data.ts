export type PLANNER_DATA_TYPE = {
  SchNo: number;
  SchStartTime: string;
  SchEndTime: string;
  SchName: string;
  SchPerformCheck: boolean;
  SchWeekChk: boolean;
  SchWeekList: number[];
  SchkWeekName: string[];
};

export type PLANNER_PERFORM_TYPE = {
  PerSvNo: number;
  PerSvFailScnNoList: number[];
  PerSvSucSchNoCount: number;
  PerSvSchCount: number;
  PerSvTime: string;
}

export const AddPlannerCommonStyle = 'w-full h-[130px] flex flex-col justify-between items-start';

export const AddPlannerCommonTextStyle = 'text-[15px] font-bold text-cyan-950';

export const AddPlannerCustomTimePickerStyle = 'w-full h-[100px] flex flex-row justify-between items-center gap-[25px]';

export const AddPlannerCustomTimePickerBoxStyle = 'flex-1 h-full flex flex-col justify-between items-center';

export const AddPlannerCustomArrowBoxStyle = 'w-full flex-1  flex flex-col justify-center items-center';

export const AddPlannerCustomNumberBoxStyle = 'w-full flex-3 bg-[#E1DCFC] flex flex-col justify-center items-center'

export const AddPlannerCustomInputBoxStyle = 'w-full flex-3 bg-[#E1DCFC] text-center font-bold'



export const commonTimePickerUpFunc = (data: number, setData: React.Dispatch<React.SetStateAction<number>>, setStr: React.Dispatch<React.SetStateAction<string>>, type: string, hour: number, hourStr: string, minuteStr: string, setHour: React.Dispatch<React.SetStateAction<number>>, setHourStr: React.Dispatch<React.SetStateAction<string>>, setTimeData: React.Dispatch<React.SetStateAction<string>>) => {
  if(type === 'hour') {
    if(data + 1 < 10) {
        setData(data + 1);
        setStr('0' + (data + 1).toString());
        setTimeData('0' + (data + 1).toString() + ':' + minuteStr);
      }else {
        setData(data + 1);
        setStr((data + 1).toString());
        setTimeData((data + 1).toString() + ':' + minuteStr);
      }
      if(data + 1 > 23) {
        setData(0);
        setStr('00');
        setTimeData('00:' + minuteStr);
      }
  }else {
    if(data + 1 < 10) {
        setData(data + 1);
        setStr('0' + (data + 1).toString());
        setTimeData(hourStr + ':0' + (data + 1).toString());
      }else {
        setData(data + 1);
        setStr((data + 1).toString());
        setTimeData(hourStr + ':' + (data + 1).toString());
      }
      if(data + 1 > 59) {
        const num = hour + 1;
        if(hour + 1 > 23) {
          setHour(0);
          setHourStr('00');
          setTimeData('00:00');
        };
        if(num < 10) {
          setHour(num);
          setHourStr('0' + num.toString());
          setTimeData('0' + num.toString() + ':00');
        }else {
          setHour(num);
          setHourStr(num.toString());
          setTimeData(num.toString() + ':00');
        }
        setData(0);
        setStr('00');
        setTimeData(hourStr +':00');
      }
  }
}


export const commonTimePickerDownFunc = (data: number, setData: React.Dispatch<React.SetStateAction<number>>, setStr: React.Dispatch<React.SetStateAction<string>>, type: string, hour: number, hourStr: string, minuteStr: string, setHour: React.Dispatch<React.SetStateAction<number>>, setHourStr: React.Dispatch<React.SetStateAction<string>>, setTimeData: React.Dispatch<React.SetStateAction<string>>) => {
  if(type === 'hour') {
    if(data - 1 < 10) {
        setData(data - 1);
        setStr('0' + (data - 1).toString());
        setTimeData('0' + (data - 1).toString() + ':' + minuteStr);
      }else {
        setData(data - 1);
        setStr((data - 1).toString());
        setTimeData((data - 1).toString() + ':' + minuteStr);
      }
      if(data - 1 < 0) {
        setData(0);
        setStr('00');
        setTimeData('00:' + minuteStr);
      }
  }else {
    if(data - 1 < 10) {
        setData(data - 1);
        setStr('0' + (data - 1).toString());
        setTimeData(hourStr + ':0' + (data - 1).toString());
    }else {
      setData(data - 1);
      setStr((data - 1).toString());
      setTimeData(hourStr + ':' + (data - 1).toString());
    }
    if(data - 1 < 0) {
      const num = hour - 1;
      if(num < 10) {
        setHour(num);
        setHourStr('0' + num.toString());
        setTimeData('0' + num.toString() + ':00');
      }
      if(hour - 1 < 0) {
        setHour(23);
        setHourStr('23');
        setTimeData('23:59');
      }
      else {
        setHour(num)
        setHourStr(num.toString());
        setTimeData(num.toString() + ':00');
      }
      setData(59);
      setStr('59');
      setTimeData(hourStr +':59');
    }
  }
}