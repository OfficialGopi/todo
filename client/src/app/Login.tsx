import { Eye, EyeOff } from "lucide-react";
import Logo from "./../assets/favicon/TODOISH.png";
import { useState } from "react";
import { Link } from "react-router";
const Login = () => {
  const [loginData, setLoginData] = useState({
    credentials: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:w-[400px] border rounded-2xl absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="w-[35%] sm:w-[140px] ">
        <img src={Logo} alt="Todo" />
      </div>
      <div className="p-4 w-full">
        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <div className="flex flex-col  gap-1 w-full">
            <label htmlFor="credentials" className="text-sm">
              Enter your email or username
            </label>
            <div className="border outline-none py-2 w-full  px-3 rounded-lg flex ">
              <input
                type="text"
                name="credentials"
                id="credentials"
                className="flex-[100%] h-full outline-none"
                placeholder="Email or username"
                value={loginData.credentials}
                minLength={6}
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    credentials: e.target.value,
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
                placeholder="Password"
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
                {showPassword ? <Eye className="" /> : <EyeOff />}
              </button>
              <div className="w-[32px]     right-[]"></div>
            </div>
          </div>
          <button
            className="p-2 border rounded-xl hover:cursor-pointer bg-blue-700 text-white"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="flex w-full justify-center mt-1">
          <div>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-800">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
