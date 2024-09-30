import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "../common/CommonForm";
import { loginFormControl } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [FormData, setFormData] = useState(initialState);
  const { toast } = useToast();
  const dispatch = useDispatch()
  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(FormData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center  ">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in your Account
        </h1>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Sign In"}
        formData={FormData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <p className="mt-2">
        Don't have an Account
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
