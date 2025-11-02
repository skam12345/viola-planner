import stringSimilarity from 'string-similarity';
import TabItem from './Bottom_Relation';

interface BottomItemsProps {
  navFormat: string;
  size?: number;
  color?: string;
  bgColor?: string;
  font?: number;
  setView: React.Dispatch<React.SetStateAction<number>>;
  view: number;
}

const BOTTOM_PRIMARY = [ 'Planner',  'TotalBoard', 'PointScore', 'Setting' ];
const BOTTOM_ITEMS = { 'primary': BOTTOM_PRIMARY  };

const BottomItems = ({ navFormat, size, color, bgColor, font, setView, view }: BottomItemsProps)  => {
  const check = Object.keys(BOTTOM_ITEMS).filter(key => stringSimilarity.compareTwoStrings(key, navFormat)  > 0.7);
  if(check === undefined) return;
  else return BOTTOM_ITEMS.primary.map((item, index) =>  <TabItem key={index} itemsKey={item} size={size!} color={color!} bgColor={bgColor!} font={font!} setView={setView} view={view} index={index} />);
}

export default BottomItems;