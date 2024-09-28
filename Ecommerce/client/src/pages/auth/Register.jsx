import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../common/CommonForm";
import { registerFormControl } from "@/config";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const onSubmit = () => {};
function Register() {
  const [FormData, setFormData] = useState(initialState);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center  ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Sign Up"}
        formData={FormData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
    </div>
  );
}

export default Register;
