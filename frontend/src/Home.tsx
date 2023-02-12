import React from "react";
import logo from "./assets/postit.png";

function Home() {
  return (
    <div className="pt-12">
      <section className="flex justify-evenly items-center m-6">
        <div className="flex-col text-center justify-center items-start">
          <h1 className="p-5 pb-3 text-3xl">
            Welcome to{" "}
            <span className="font-extrabold italic text-gray-800">
              Noteify.
            </span>
          </h1>
          <p className="p-5 text-lg">Your one stop shop for the student you.</p>
        </div>
        <div className="w-[25%] m-6">
          <img className="block object-cover" src={logo} alt="Noteify" />
        </div>
      </section>
      {/* <section>
      <div>
      <h1>
        Welcome to <span>Noteify.</span>
      </h1>
      <p>Your one stop shop for the student you.</p>
    </div>
    </section> */}
    </div>
  );
}

export default Home;
