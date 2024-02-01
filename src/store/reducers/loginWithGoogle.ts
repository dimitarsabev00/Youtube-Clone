import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../configs/firebase";

export const loginUserWithGoogle = createAsyncThunk(
  "youtubeApp/auth/loginUserWithGoogle",
  async ({ onSuccess }) => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      window.localStorage.clear();
      localStorage.setItem("token", res.user.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(res.user));

      if (onSuccess) {
        onSuccess(res);
      }

      // Redux Toolkit will infer the correct type
      return res;
    } catch (error) {
      console.error(error);
    }
  }
);
