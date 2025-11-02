import { useCallback, useState } from "react";
import { AddPlannerCommonStyle, AddPlannerCommonTextStyle, type PLANNER_DATA_TYPE } from "../utils/Planner_Data";
import { MdAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import CustomTimePicker from "./components/Custom_Time_Picker";
import CustomWeekPicker from "./components/Custom_Week_Picker";
import WeekListName from "./components/Week_List_Name";
import { firestore } from "../utils/firebase_config";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

const PlannerView = () => {
  const [isMakePlan, setIsMakePlan] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [changeIcon, setChangeIcon] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');
  const [schName, setSchName] = useState<string>('');
  const [isWeekChk, setIsWeekChk] = useState<boolean>(false);
  const [weekCount, setWeekCount] = useState<number>(2);
  const [weekList, setWeekList] = useState<number[]>([1, 1]);
  const [weekNameList, setWeekNameList] = useState<string[]>(['']);
  const [performCheck, setPerformCheck] = useState<boolean[]>([]);

  const {
    data: plannerDataList,
    refetch: plannerRefetch,
  } = useQuery<PLANNER_DATA_TYPE[], Error>({
    queryKey: ['plannerData'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(firestore, "planner"));
      const dataList: PLANNER_DATA_TYPE[] = [];
      snapshot.forEach((doc) => {
        dataList.push(doc.data() as PLANNER_DATA_TYPE);
      });

      dataList.sort((a, b) => a.SchNo - b.SchNo);
      const checkedList: boolean[] = [];
      dataList.map((items) => {
        checkedList.push(items.SchPerformCheck);
      })

      setPerformCheck(checkedList);
      return dataList;
    },
  });


  const openMakePlanModal = useCallback(() => {
    setClick(!click);
    setTimeout(() => {
      setChangeIcon(!changeIcon);
    }, 1000);
    setTimeout(() => {
      setIsMakePlan(!isMakePlan);
    }, 1000);
    if(!click) {
      setWeekList([1, 1]);
      setWeekNameList(['']);
      setSchName('');
      setIsWeekChk(false);
      setWeekCount(2);
    }
  }, [changeIcon, click, isMakePlan]);

  const onChangeSchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchName(e.target.value);
  }

  const onChangeWeekSchCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeekCount(parseInt(e.target.value));
    const list = Array(parseInt(e.target.value)).fill(1);
    const nameList = Array(parseInt(e.target.value)).fill('');  
    setWeekList(list);
    setWeekNameList(nameList);
  }

  const addPlanner = useCallback(async () => {
  
    if(isWeekChk) {
      weekNameList.map((item) => {
        if(schName === '') {
          return alert('일정명을 입력해주세요.');
        }
        if(item === '') {
          return alert('일정명들을 입력해주세요.');
        }
        const weekHasDuplicate = new Set(weekList).size !== weekList.length;
        const nameHasDuplicate = new Set(weekNameList).size !== weekNameList.length;
        if(weekHasDuplicate) {
          return alert('일정 요일 구간에 중복된 요일이 있습니다. 정확히 요일을 조정해주시기 바랍니다.');
        }
      
        if(nameHasDuplicate) {
          return alert('일정명들에 중복된 이름이 있습니다. 정확히 이름을 입력해주시기 바랍니다.');
        }
      });

    }
    if(schName === '') {
      return alert('일정명을 입력해주세요.');
    }
    if(startTime === '00:00' && endTime === '00:00') {
      return alert('정확한 시간을 조정해주시기 바랍니다.');
    }
    const snapshot  = await getDocs(collection(firestore, "planner"));
    
    await setDoc(doc(firestore, "planner", "planner" + (snapshot.size + 1)), 
    {
        SchNo: snapshot.size + 1,
        SchStartTime: startTime, 
        SchEndTime: endTime, 
        SchName: schName, 
        SchPerformCheck: false,  
        SchWeekChk: isWeekChk, 
        SchWeekList: weekList, 
        SchkWeekName: weekNameList
    });

    plannerRefetch();

    setPerformCheck([...performCheck, false]);
    setIsMakePlan(!isMakePlan);
    setWeekList([1, 1]);
    setWeekNameList(['']);
    setSchName('');
    setIsWeekChk(false);
    setWeekCount(2);
    setClick(!click);
  }, [isWeekChk, schName, startTime, endTime, weekList, weekNameList, plannerRefetch, performCheck, isMakePlan, click]);

  // console.log("스크린 크기 : " + window.innerHeight);


  return (
    <div  className=" w-full h-full pt-[60px] pb-[60px] flex flex-col justify-start items-center bg-gray-200">
      <div style={isMakePlan ? {'display': 'flex' } : {display: 'none'} }  className="z-20 fixed w-full h-full bg-black-opacity-50 flex-col justify-center items-center">
        <div style={{ marginTop: (window.innerHeight >= 100 && window.innerHeight <= 1500) ? '-30%' : 0}} className={`w-[80%] h-[75%] overflow-scroll p-[20px] bg-white rounded-md`}>
          <div className="w-full overflow-scroll h-full pt-[5px] gap-[18px] flex flex-col justify-start items-center">
            <div className={`${AddPlannerCommonStyle}`}>
              <span className={AddPlannerCommonTextStyle}>일정 시작 시간</span>
              <CustomTimePicker setTimeData={setStartTime} click={click}/>
            </div>
            <div className={`${AddPlannerCommonStyle}`}>
              <span className={AddPlannerCommonTextStyle}>일정 종료 시간</span>
              <CustomTimePicker setTimeData={setEndTime} click={click} />
            </div>
             <div className="w-full h-[100px] flex flex-col justify-between items-start gap-[20px]">
              <span className={AddPlannerCommonTextStyle}>일정 이름</span>
              <input type="text" className="w-full h-[30px] outline-none border-1 rounded-[6px] mb-[15px] pl-[20px] pr-[20px] text-[12px] " value={schName} onChange={onChangeSchName} />
             </div>
             <div className="w-full h-[20px] flex flex-row justify-end items-center">
              <div className="w-[105px] h-full flex flex-row justify-between items-center">
                <input type="checkbox" className="accent-purple-400 appearance-auto" name="SchWeekChk" checked={isWeekChk} onChange={() => setIsWeekChk(!isWeekChk)}/>
                <label className="text-[13px]">일정 요일 구간</label>
              </div>
             </div>
              <div className={`w-full  h-[${ 38 * weekCount }px] gap-[20px] ${isWeekChk ? 'flex' : 'hidden'} flex-col justify-start items-center`}>
                <div className="w-full h-[28px] flex flex-row justify-start items-center gap-[14px]">
                  <label className="text-[13px] font-bold text-black">요일 개수</label>
                  <select className="w-[120px] h-[28px] outline-none text-center font-bold text-[13px] bg-purple-200 rounded-[6px]" value={weekCount} onChange={onChangeWeekSchCount}>
                    <option className="font-bold" value="1">1</option>
                    <option className="font-bold" value="2">2</option>
                    <option className="font-bold" value="3">3</option>
                    <option className="font-bold" value="4">4</option>
                    <option className="font-bold" value="5">5</option>
                    <option className="font-bold" value="6">6</option>
                    <option className="font-bold" value="7">7</option>
                  </select>
                </div>
                <div className="w-full flex-1 gap-[10px] flex flex-col">
                  {
                    Array.from({ length: weekCount}).map((_, index) => (
                      <div className="w-full h-[28px] flex flex-row justify-around items-center">
                        <CustomWeekPicker setWeekList={setWeekList} index={index} />
                        <WeekListName setNameList={setWeekNameList} index={index} />
                      </div>
                    ))
                  }
                </div>
              </div>
          </div>
          <div className="w-full h-[40px] flex flex-row justify-end items-center gap-[40px]" onClick={addPlanner}>
              <span className="mt-[20px] text-[18px] text-[#6A15D3] font-bold active:text-[#E1CDFA]">일정 추가</span>
          </div>
        </div>
      </div>
      <div className="w-full pt-[56px] p-[28px] flex flex-col justify-start items-center flex-1">
        <div className={`w-full h-full ${isMakePlan ?'overflow-hidden' :'overflow-scroll'} flex flex-col justify-start itemsc-center gap-[15px]`}>
          {
            (plannerDataList && plannerDataList?.length > 0) ?
            plannerDataList?.map((data: PLANNER_DATA_TYPE, index: number) => (
              <div key={index} className="w-full h-[64px] gap-[20px] pl-[15px] pr-[15px] rounded-[8px] shadow-md flex flex-row justify-between items-center bg-white">
                <span className="text-[16px] font-bold text-center  text-cyan-700">{data.SchStartTime} ~ {data.SchEndTime}</span>
                <span className="flex-4 text-[16px] font-bold text-blue-950">{data.SchWeekChk ? data.SchWeekList.indexOf(new Date().getDay()) === -1 ? data.SchName : data.SchkWeekName[data.SchWeekList.indexOf(new Date().getDay())] : data.SchName}</span>
                <input type="checkbox" checked={performCheck[index]} onChange={async () => {
                  setPerformCheck(prev => [...prev.slice(0, index), !prev[index], ...prev.slice(index + 1)]);
                  const snapshot  = await getDocs(collection(firestore, "planner"));
                  snapshot.docs.forEach(async (docs) => {
                    const id = docs.id;
                    if((docs.data() as PLANNER_DATA_TYPE).SchNo === data.SchNo) {
                      console.log('is changed checked status?');
                      const plannerRef = doc(firestore, "planner", id);
                      await updateDoc(plannerRef, {
                        SchPerformCheck: !performCheck[index]
                      })
                    } 
                  }) 
                }}/>
              </div>
            )):
            (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <span className="text-[16px] font-bold text-center text-gray-400">일정이 없습니다. 일정을 추가해주세요.</span>
              </div>
            )
          }
        </div>
      </div>
      <div className={`${click && !isMakePlan ? 'swirlEffect' : !click && isMakePlan ? 'swirlEffect-reverse' : ''} z-30 fixed bottom-[80px] right-[20px] rounded-full shadow-md shadow-neutral-800 w-[40px] h-[40px] bg-cyan-700 click:bg-cyan-950 flex flex-col justify-center items-center`} onClick={openMakePlanModal}>
          <span className="">
            {
              changeIcon ? (<IoClose fontSize={30} color={'white'}/>) : (<MdAdd fontSize={30} color={'white'}/>)
            }
          </span>
      </div>
    </div>
  );
}

export default PlannerView