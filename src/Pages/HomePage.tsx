
import poke from "../assets/Group 1.png";
import srch from "../assets/search (2).png";
import { Link } from "react-router-dom";
import "../assets/styles/App.scss";
import "../assets/themes/theme1.scss";

type ThemeContextProps = {
  theme: string;
  setTheme: (newTheme: string) => void;
};

const HomePage = ({ theme }: ThemeContextProps) => {
  return (
    <div
      className={`flex items-center justify-center h-screen flex-col ${theme}`}
    >
      <div>
        <img src={poke} alt="" />
      </div>
      <p className="font-extrabold text-5xl mt-3">
        Poké <span className={`txt`}>book</span>
      </p>
      <div>
        <p className="text-xl mt-3">
          Largest Pokémon index with information <br />
          about every Pokemon you can think of.
        </p>
      </div>
      <div
        className={`rounded-full border-solid border-4 mt-16 flex  w-4/12 h-16 items-center gap-7  search`}
      >
        <input
          placeholder="Enter pokemon name"
          className="text-xl rounded-full pl-9 w-10/12"
        />

        <Link to="/list">
          <div className="rounded-full w-11 h-11 flex justify-center srch-btn">
            <img src={srch} alt="" className="object-contain w-5" />
          </div>
        </Link>
      </div>
      <div>
        <Link to="/list">
          <p className="mt-3 underline opacity-90">View all</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
