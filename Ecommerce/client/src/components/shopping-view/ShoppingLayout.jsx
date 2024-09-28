import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header component */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;