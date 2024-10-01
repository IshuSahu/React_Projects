import React from "react";
import { Button } from "../ui/button";
import { AlignJustify, LogOut, Menu } from "lucide-react";

function AdminHeader({ setOpen }) {
  return (
    <header className=" flex items-center px4 py-2 justify-center border-b bg-background">
      <Button onClick={() => setOpen(true)} className=" lg:hidden sm:block">
        {/* <Menu /> */}
        <AlignJustify />
        <span className=" sr-only"> Toggle Menu</span>
      </Button>
      <div className=" flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px4 py-3 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
