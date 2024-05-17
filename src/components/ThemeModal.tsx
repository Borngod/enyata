import React from "react";

// Type for the properties expected by the ThemeModal component
type ThemerProps = {
  setSwitch: (...args: any[]) => void;
  setTheme: (newTheme: string) => void;
  theme: string;
};

// Functional component to display a modal for theme selection
const ThemeModal: React.FC<ThemerProps> = ({ setSwitch, setTheme, theme }) => {
  return (
    // Main container for the modal with click event to close the modal
    <div
      className="theme-modal"
      onClick={() => {
        setSwitch(() => {
          console.log('modal has been clicked');
          return false;
        });
      }}
    >
      {/* Modal content container */}
      <div className="theme-selector w-3/12 h-56 rounded-xl">
        {/* Header section of the modal */}
        <div className="theme-top bg-white h-11 rounded-tr-xl rounded-tl-xl">
          <p className="text-2xl text-center font-bold pt-1">Choose Theme</p>
        </div>
        {/* Theme selection buttons */}
        <div className="theme-selectors flex justify-center items-center gap-10 mt-14">
          <div
            className={`h-16 w-16 rounded-full out0 ${
              theme === "theme1" ? "out-line" : ""
            }`}
            onClick={() => {
              setTheme("theme1");
            }}
          ></div>
          <div
            className={`h-16 w-16 rounded-full out1 ${
              theme === "theme2" ? "out-line" : ""
            }`}
            onClick={() => {
              setTheme("theme2");
            }}
          ></div>
          <div
            className={`h-16 w-16 rounded-full out2 ${
              theme === "theme3" ? "out-line" : ""
            }`}
            onClick={() => {
              setTheme("theme3");
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
