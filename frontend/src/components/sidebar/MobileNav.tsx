import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { BiWindowClose } from "react-icons/bi";

const MobileNav = ({ showModal, setShowModal, className }) => {
  return (
    <div
      className={`${
        showModal ? "flex" : "hidden"
      } sm:hidden h-screen w-screen flex items-center justify-center ${className}`}
    >
      <div className="bg-zinc-900 p-2 flex flex-col rounded-lg bg-opacity-90 backdrop-blur-sm">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <div className="flex items-center justify-between">
          <LogoutButton />
          <button
            className="text-white text-sm mt-2"
            onClick={() => setShowModal(!showModal)}
          >
            <BiWindowClose size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
