import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CommonForm from "../common/CommonForm";
import { registerFormControl } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Register() {
  const [FormData, setFormData] = useState(initialState);
  console.log(FormData);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    Dispatch(registerUser(FormData))
      .then((data) => {
        toast({
          title: data?.payload?.message,
        });
        Navigate("/auth/login");
      })
      .catch((error) => console.error(error));
  };

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
