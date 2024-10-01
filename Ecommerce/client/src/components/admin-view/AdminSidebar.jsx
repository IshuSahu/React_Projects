import { ChartNoAxesCombined, UserRoundCog } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItem } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItem({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItem.map((menuItem) => (
        <div
          className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 text-muted-foreground hover:bg-muted hover:text-foreground"
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {menuItem.icon && <menuItem.icon size={20} />} {/* Optional Icon */}
          <span>{menuItem.label}</span> {/* Menu Label */}
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItem setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className=" hidden w-64 flex-col bg-background p-6 border-r lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" cursor-pointer flex items-center gap-2"
        >
          <UserRoundCog size={30} />
          <h1 className=" text-2xl font-extrabold">Admin panel</h1>
        </div>
        <MenuItem />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
