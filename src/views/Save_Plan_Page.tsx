import { useState } from "react";
import type { PLANNER_PERFORM_TYPE } from "../utils/Planner_Data";
import { GiAchievement } from "react-icons/gi";
import { FaFaceSadTear } from "react-icons/fa6";
import { RiEmotionHappyFill } from "react-icons/ri";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SavePlannerView = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth()는 0~11
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   
  const [achieveList] = useState<PLANNER_PERFORM_TYPE[]>([
    {
      PerSvNo: 1,
      PerSvFailScnNoList: [1, 2],
      PerSvSucSchNoCount: 3,
      PerSvSchCount: 5,
      PerSvTime: time,
    },
    {
      PerSvNo: 1,
      PerSvFailScnNoList: [1, 3, 6],
      PerSvSucSchNoCount: 2,
      PerSvSchCount: 5,
      PerSvTime: time,
    },
     {
      PerSvNo: 1,
      PerSvFailScnNoList: [],
      PerSvSucSchNoCount: 5,
      PerSvSchCount: 5,
      PerSvTime: time,
    }
  ]);

  

  return (
    <div className="w-full h-full overflow-scroll flex flex-col jsutify-start-items-center gap-[20px] pt-[88px] pb-[88px] pl-[28px] pr-[28px] bg-gray-200">
      {achieveList.map((item: PLANNER_PERFORM_TYPE, index: number) => (
        <div key={index} className="w-full h-[120px] bg-white rounded-[15px] flex flex-row justify-start items-center">
          <div className="w-[50px] h-full flex flex-col justify-center items-center">
            <h1 className="text-[30px] font-bold text-cyan-950">
              {
                ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100) < 50 ? (
                  <FaFaceSadTear className="text-red-500 text-[20px]"/>
                ):
                 ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100)  === 100 ?
                (
                  <GiAchievement className="text-purple-500 text-[30px]"/>
                ): 
                (
                  <RiEmotionHappyFill className="text-blue-500 text-[25px]" />
                )
              }
            </h1>
          </div>
          <div className="inset-vertical-line rounded-full">
          </div>
          <div className="w-[120px] h-full flex flex-col justify-center items-center gap-[5px]">
            <span className="text-[13px] font-bold text-purple-950">
              성취율
            </span>   
            <div className="w-[150px] h-[80px] flex flex-col justify-center items-center">
              <CircularProgressbar 
                value={(item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100} 
                text={`${( item.PerSvSucSchNoCount / item.PerSvSchCount) * 100}%`}
                className="font-bold"
                background
                backgroundPadding={6}
                styles={buildStyles({
                  backgroundColor: ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100) < 50 ? "#FF4646" : ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100) === 100 ? "#CCA7D8":  "#2B7FFF",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100) < 50 ? "#FF4646" : ((item.PerSvSucSchNoCount/ item.PerSvSchCount ) * 100) === 100 ? "#CCA7D8":  "#2B7FFF",
                  pathTransition: 'stroke-dashoffset 0.5s ease 0s',
                  pathTransitionDuration: 0.5,
                  rotation: 0.25,
                 })} 
              />
            </div>
          </div>
          <div className="inset-vertical-line rounded-full">

          </div>
          <div className="flex-3 h-full flex flex-col justify-center items-center">
            <div className="w-full rounded-tr-[15px] flex-1 flex-col justify-center items-center bg-purple-100 flex">
              <span className="text-[12px] font-bold text-black">실패 일정 번호</span>
              <div className="w-full flex flex-row justify-center items-center gap-[8px]">
                
                {item.PerSvFailScnNoList.length === 0 ? (
                  <span className="text-[15px] font-bold text-black">
                    없음 / 완료
                  </span>
                ): item.PerSvFailScnNoList.map((item2: number, index: number) => (
                  index === item.PerSvFailScnNoList.length - 1 ? <span key={index} className="text-[15px] font-bold text-cyan-950">{item2}</span> : <span key={index} className="text-[15px] font-bold text-cyan-950">{item2}, </span>
                ))}
              </div>
            </div>
            <div className="w-full rounded-br-[15px] flex-1 flex-col justify-center items-center bg-yellow-100 flex">
                <span className="text-[12px] font-bold text-black">등록 일자</span>
                <span className="text-[12px] font-bold text-black">{item.PerSvTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavePlannerView;