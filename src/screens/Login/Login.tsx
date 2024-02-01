import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginUserWithGoogle } from "../../store/reducers/loginWithGoogle";

const Login = () => {
  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem("token");

  const handleLogin = () => {
    dispatch(
      loginUserWithGoogle({
        onSuccess: () => {
          navigate("/");
        },
      })
    );
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate, dispatch]);

  return (
    <div className="h-screen grid place-items-center bg-black">
      <div className="bg-[#121417] p-[2rem] mx-[1rem] rounded-lg flex flex-col items-center">
        <h2 className="text-white  font-bold">Youtube Clone</h2>
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt=""
          className="w-[130px] h-[130px] object-contain"
        />
        <button
          className="p-[0.5rem] border-none rounded-md mb-[1rem] focus:outline-none bg-white"
          onClick={handleLogin}
        >
          Login With Google
        </button>
        <p className="text-white">
          This Project is made using YOUTUBE DATA API
        </p>
      </div>
    </div>
  );
};

export default Login;
