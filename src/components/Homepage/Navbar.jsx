import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { close, menu } from "../../assets";
import { navLinks } from "../../constants";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="w-full h-full flex py-6 justify-between items-center navbar">
      <div className="h-full flex justify-center items-center">
        {" "}
        <img src={logo} alt="hoobank" className="w-[84px] h-[84px] pt-5 " />
      </div>

      <p
        class="text-3xl font-semibold 
            bg-gradient-to-r bg-clip-text  text-transparent 
            from-teal-500 via-orange-800 to-indigo-500
            animate-text pl-5 max-xs:text-xl
            ">
        {" "}
        Hop N Move
      </p>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden hidden">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={
            "hidden p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar"
          }>
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}>
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            navigate(`/signin`);
          }}
          className=" ml-11 bg-blue-500 w-[80px] h-[40px] font-poppins font-medium text-[15px] text-primary bg-blue-gradient rounded-[10px] outline-none ">
          {" "}
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
