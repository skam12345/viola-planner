import BottomItems from "../config/BottomUtils";

interface BottomProps {
  navFormat: string;
  size?: number;
  color?: string;
  bgColor? : string;
  font?: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
  view: number;
}


const BottomSection = ({ navFormat, size, color, bgColor, font, setView, view } : BottomProps) => {

  return (
    <div className="z-30 fixed bottom-0 bg-white w-full h-[56px] flex flex-row justify-evenly items-center bottom-shape">
      <BottomItems navFormat={navFormat} size={size!} color={color!} bgColor={bgColor!} font={font!} setView={setView} view={view} />
    </div>
  );
}

export default BottomSection;