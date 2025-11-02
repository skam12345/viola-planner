import { FcPlanner } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcComboChart } from "react-icons/fc";
import { FcAutomatic } from "react-icons/fc";

interface BottomRelationProps {
  size?: number;
  itemsKey: string;
  color?: string;
  bgColor? : string;
  font? : number;
  setView: React.Dispatch<React.SetStateAction<number>>;
  view: number;
  index: number;
}

const sizeType = (size?: number) => size === undefined ? 30 : size;

const Planner = ({ size } : { size: number }) => <FcPlanner fontSize={sizeType(size)} />
const TotalBoard = ({ size } : { size: number }) => <FcAddDatabase fontSize={sizeType(size)} />
const PointScore = ({ size } : { size: number }) => <FcComboChart fontSize={sizeType(size)} />
const Setting = ({ size } : { size: number }) => <FcAutomatic fontSize={sizeType(size)} />

const BottomConfig = (sizeProps: number) =>  { return {
    Planner : { icon: Planner({ size: sizeProps}), text: '계획표', },
    TotalBoard : { icon: TotalBoard({ size: sizeProps }), text: '하루기록', },
    PointScore : { icon: PointScore({ size: sizeProps}), text: '나의성취', },
    Setting : { icon: Setting({ size: sizeProps}), text: '설정', },
  }
}

const TabItem = ( { itemsKey, size, color, bgColor, font, setView, view, index } : BottomRelationProps ) => {
  
  const navigateToView = () => {
    setView(index);
  }
  
  return (
    <div className={`w-[40px] h-[40px] flex flex-col justify-between items-center ${view === index ? 'active-item' : 'relative-item'} ${bgColor === undefined ? 'bg-white': `bg-${bgColor}`}`} onClick={navigateToView}>
      {
        BottomConfig(size!)[itemsKey as keyof ReturnType<typeof BottomConfig>].icon
      }
      <h3 style={{ fontSize: `${font === undefined ? 10 : font}px`}} className={`font-bold text-center ${color === undefined ? 'text-black' : `[${color}]`}`}>
        { BottomConfig(size!)[itemsKey as keyof ReturnType<typeof BottomConfig>]['text'] }
      </h3>

    </div>
  )

}

export default TabItem;