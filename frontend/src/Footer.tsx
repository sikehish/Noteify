import React from "react";
import { Link } from "react-router-dom";
// import "./Footer.css";
import logo from "./assets/favicon_io/android-chrome-192x192.png";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="flex-col mb-0 bg-gray-900 mt-20 ">
      <div className="flex justify-around items-center p-5">
        {/* <Link to="/">
          <img src={logo} alt="" />
        </Link> */}
        <div className="flex justify-center items-center text-center">
          <img
            src={logo}
            className="w-[15%]"
            style={{ filter: "invert(100%)" }}
            alt=""
          />
          <h3 className="text-white pl-3 text-lg">Noteify.</h3>
        </div>
        <div className="flex">
          <a
            href="https://twitter.com/sikehish"
            target="blank"
            rel="noopener noreferrer"
            className="text-white text-3xl mx-3 my-1"
          >
            <AiOutlineTwitter />
          </a>
          <a
            href="https://instagram.com/sikehish"
            target="blank"
            rel="noopener noreferrer"
            className="text-white text-3xl mx-3 my-1"
          >
            <AiOutlineInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/hisham-akmal-ba7455226/"
            target="blank"
            rel="noopener noreferrer"
            className="text-white text-3xl mx-3 my-1"
          >
            <AiOutlineLinkedin />
          </a>
          <a
            href="https://github.com/sikehish"
            target="blank"
            rel="noopener noreferrer"
            className="text-white text-3xl mx-3 my-1"
          >
            <AiOutlineGithub />
          </a>
        </div>
      </div>
      <div className="bg-slate-800 text-white text-center">
        {/* <p>Made with &#10084; by Hisham</p> */}
        <span>© Copyright 2023 Noteify</span>
      </div>
    </footer>
  );
}

export default Footer;
