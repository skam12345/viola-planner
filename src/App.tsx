import { useState } from "react";
import BottomSection from "./components/Bottom_Component";
import HeaderSection from "./components/Header_Component"
import { NAVIGATE_HEADER_TEXT_LIST, NAVIGATE_VIEW_LIST } from "./utils/Navigate_Motion";

const App = () => {
  const [navigateView, setNavigateView] = useState<number>(0);
  const CurrentView = NAVIGATE_VIEW_LIST[navigateView];

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center bg-white">
      <HeaderSection headerText={NAVIGATE_HEADER_TEXT_LIST[navigateView]}/>
      <div className="w-full flex flex-col justify-center items-center flex-1">
        <CurrentView />
      </div>
      <BottomSection setView={setNavigateView} view={navigateView} navFormat="primary" size={30}/>
    </div>
  );
}

export default App
