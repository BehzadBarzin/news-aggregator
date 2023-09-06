import { useState } from 'react';
import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';

const navLinks = [
    {
        id: "home",
        title: "Home",
        link: "#home"
    },
    {
        id: "features",
        title: "Features",
        link: "#features"
    }
];

function Navbar() {
    const [active, setActive] = useState('home');
    const [toggle, setToggle] = useState(false);
    
    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <img src={logo} alt="news-aggregator-logo" className="w-[154px] h-[52px]" />
            
            {/* Desktop Menu */}
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                {
                navLinks.map((nav, index) => (
                    <li
                    key={nav.id}
                    className={`font-poppins font-normal cursor-pointer text-[16px] ${
                        active === nav.id ? "text-white" : "text-dimWhite"
                    } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                    onClick={() => setActive(nav.id)}>
                    <a href={`${nav.link}`}>{nav.title}</a>
                    </li>
                ))
                }
            </ul>

            {/* ------------------------------------------------------------- */}
            {/* Mobile Menu */}
            <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`${nav.link}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
        </nav>
    );
}
        
export default Navbar