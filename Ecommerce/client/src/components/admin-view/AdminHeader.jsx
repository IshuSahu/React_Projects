import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredential } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredential());
    sessionStorage.clear();
    navigate("/auth/login");
  }
  return (
    <header className=" flex items-center px4 py-2 justify-center border-b bg-background">
      <Button onClick={() => setOpen(true)} className=" lg:hidden sm:block">
        {/* <Menu /> */}
        <AlignJustify />
        <span className=" sr-only"> Toggle Menu</span>
      </Button>
      <div className=" flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px4 py-3 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
