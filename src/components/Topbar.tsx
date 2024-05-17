import { Link } from "react-router-dom";
import logo from "../assets/logo (1).png";
import srch from "../assets/Vector (1).png";

type themer = {
  setSwitch: (...args: any[]) => void;
  switchTheme: boolean;
};

const Topbar = ({ setSwitch, switchTheme,handleSearch }: themer) => {
  return (
    <div className="bg-white flex items-center w-screen">
      <Link to="/"><div className="flex items-center ml-14 static">
        <img src={logo} alt="" className="relative top-5" />
        <p className="font-bold text-2xl mt-3">
          Poké <span className={`txt`}>book</span>
        </p>
      </div>
      </Link>

      <div className="w-4/12 relative ml-60 top-2 max-[540px]:ml-20 search-long">
        <input
          placeholder="Enter pokemon name"
          className="text-xl rounded-full pl-12 w-10/12 h-14 search-top"
          onChange={
            (e)=>{
              handleSearch(e.target.value)
            }
            
          }
        />
        <img
          src={srch}
          alt=""
          className="object-contain w-5 relative bottom-9 left-6"
        />
      </div>
      <div
        className="h-14 w-14 rounded-full ml-72 out out-line max-[1390px]:ml-60"
        onClick={() => {
          console.log("its been clicked");
          console.log(switchTheme, "this the state");
          setSwitch(() => {
            return true;
          });
        }}
      ></div>
    </div>
  );
};

export default Topbar;
