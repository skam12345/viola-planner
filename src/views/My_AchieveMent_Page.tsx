import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MyAchieveMentView = () => {
  return (
    <div className="w-full h-full overflow-scroll pt-[70px] pb-[70px] flex flex-col justify-start items-center">
      <div className="w-full h-[20px] flex flex-row justify-center items-center gap-[15px]">
        <span className="text-[13px] active:font-bold font-[600] text-purple-400 active:text-purple-700">주간 점수</span>
        <span className="text-[13px] active:font-bold font-[600] text-purple-400 active:text-purple-700">월간 점수</span>
        <span className="text-[13px] active:font-bold font-[600] text-purple-400 active:text-purple-700">연간 점수</span>
      </div>
      <div className="w-full h-[30%] flex flex-row justify-around items-center p-[10px]">
        <div className="w-[45%] h-full flex flex-col justify-center items-center p-[10px] gap-[10px] rounded-[15px] shadow-md bg-purple-500">
          <span className="text-[13px] font-bold text-white">총 일정 기록</span>
          <span className="text-[55px] font-bold text-white">100</span>
        </div>
        <div className="w-[45%] h-full border-t-[1px] border-t-gray-300  flex flex-col justify-center items-center gap-[15px] rounded-[15px] shadow-md bg-white p-[15px]">
          <span className="text-[13px] font-bold text-purple-500">총 점수</span>
          <div className="w-[70%] h-[70%] flex flex-col justify-center items-center gap-[13px]">
            <CircularProgressbar 
              value={78.8}
              text={"78.8"}
              strokeWidth={10}
              className="font-bold"
              styles={buildStyles({
                pathColor: "#AD46FF",
                textColor: "#000000",
                trailColor: "#C4CAC7",
              })}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[45%] flex flex-col justify-center items-center p-[10px]">
        <div className="w-full h-full rounded-[15px] border-t-[1px] border-t-gray-300 flex flex-row jsutfiy-around items-center bg-white shadow-md">
          <div className="">

          </div>
          <div className="">

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAchieveMentView;