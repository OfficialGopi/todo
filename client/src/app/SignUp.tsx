import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Logo from "./../assets/favicon/TODOISH.png";
import { Link } from "react-router";
const SignUp = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:w-[400px] border rounded-2xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="w-[35%] sm:w-[140px] ">
        <img src={Logo} alt="Todo" />
      </div>
      <div className="p-4 w-full">
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSignup}>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="email" className="text-sm">
              Enter your email
            </label>
            <div className="border outline-none py-2 w-full  px-3 rounded-lg flex ">
              <input
                type="email"
                name="email"
                id="email"
                className="flex-[100%] h-full outline-none"
                placeholder="Email"
                value={loginData.email}
                minLength={6}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="username" className="text-sm">
              Enter your username
            </label>
            <div className="border outline-none py-2 w-full  px-3 rounded-lg flex ">
              <input
                type="text"
                name="username"
                id="username"
                className="flex-[100%] h-full outline-none"
                placeholder="Username"
                value={loginData.username}
                minLength={6}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    username: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="name" className="text-sm">
              Enter your Name
            </label>
            <div className="border outline-none py-2 w-full  px-3 rounded-lg flex ">
              <input
                type="text"
                name="name"
                id="name"
                className="flex-[100%] h-full outline-none"
                placeholder="Full Name"
                value={loginData.name}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="password" className="text-sm">
              Enter your password
            </label>
            <div className="border outline-none relative py-2 gap-1 w-full  px-3 rounded-lg flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="flex-[calc(100%-50px)] h-full outline-none "
                placeholder="Enter your password"
                value={loginData.password}
                minLength={8}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
              />
              <button
                className="w-[32px] hover:cursor-pointer hover:bg-slate-100 transition-colors rounded-full flex items-center justify-center absolute   aspect-square right-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
              <div className="w-[32px]     right-[]"></div>
            </div>
          </div>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm your password
            </label>
            <div className="border outline-none relative py-2 gap-1 w-full  px-3 rounded-lg flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                className="flex-[calc(100%-50px)] h-full outline-none "
                placeholder="Confirm your password"
                value={loginData.confirmPassword}
                minLength={8}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              <button
                className="w-[32px] hover:cursor-pointer hover:bg-slate-100 transition-colors rounded-full flex items-center justify-center absolute   aspect-square right-[10px]"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
              <div className="w-[32px]     right-[]"></div>
            </div>
          </div>
          <button
            className="p-2 border rounded-xl hover:cursor-pointer bg-blue-700 text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="flex w-full justify-center mt-1">
          <div>
            Alredy have an account?{" "}
            <Link to={"/login"} className="text-blue-800">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
