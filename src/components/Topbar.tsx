import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo (1).png";
import srch from "../assets/Vector (1).png";

type ThemerProps = {
  setSwitch: (switchState: boolean) => void;
  switchTheme: boolean;
  handleSearch: (query: string) => void;
};

/**
 * Topbar component displays the application header with a logo, search input, and a theme switcher button.
 *
 * @param setSwitch - Function to toggle the theme switch state.
 * @param switchTheme - Boolean indicating the current state of the theme switch.
 * @param handleSearch - Function to handle search input changes.
 * @returns JSX.Element - The rendered Topbar component.
 */
const Topbar: React.FC<ThemerProps> = ({
  setSwitch,
  switchTheme,
  handleSearch,
}) => {
  return (
    <div className="bg-white flex items-center w-screen top-pokis">
      <Link to="/">
        <div className="flex items-center ml-14 static top-logo">
          <img src={logo} alt="Pokébook logo" className="relative top-5" />
          <p className="font-bold text-2xl mt-3 name-poki">
            Poké <span className="txt">book</span>
          </p>
        </div>
      </Link>

      <div className="w-4/12 relative ml-60 top-2 max-[540px]:ml-20 search-long">
        <input
          placeholder="Enter pokemon name"
          className="text-xl rounded-full pl-12 w-10/12 h-14 search-top"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <img
          src={srch}
          alt="Search icon"
          className="object-contain w-5 relative bottom-9 left-6"
        />
      </div>
      <div
        className="h-14 w-14 rounded-full ml-72 out out-line max-[1390px]:ml-60 top-switcher"
        onClick={() => {
          console.log("Theme switch clicked");
          console.log(switchTheme, "current state");
          setSwitch(true);
        }}
      ></div>
    </div>
  );
};

export default Topbar;
