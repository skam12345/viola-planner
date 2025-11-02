

interface HeaderProps {
  headerText: string;
}

const HeaderSection =  ({ headerText } : HeaderProps) => {
  return (
    <div className="z-30 fixed top-0 bg-white w-full h-[60px] header-shape">
        <h1 className="text-[20px] font-bold text-black inner-center">
          {headerText}
        </h1>
      </div>
  );
}

export default HeaderSection;