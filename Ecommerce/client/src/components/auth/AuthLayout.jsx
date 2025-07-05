import { HousePlug } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <div className="flex items-center justify-center bg-black w-full lg:w-1/2 px-6 py-8 lg:px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Welcome To ShopEase Store
          </h1>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
