"use client";
import clsx from "clsx";
import Link from "next/link";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import {
  signInFailure,
  signInRequest,
  signInSuccess,
} from "@/store/user/login/loginAction";
import { useRouter } from "next/navigation";

export default function Account() {
  const [user, setUser] = useState({ phone: "", pwd: "" });
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { pending } = useAppSelector((state) => state.user);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const resetErr = setTimeout(() => setErr(false), 3000);
    return () => clearTimeout(resetErr);
  }, [err]);

  const handleChange = (e: any) => {
    setErr(false);
    if (e.target.name === "phone") {
      setUser({ ...user, phone: e.target.value });
    }
    if (e.target.name === "password") {
      setUser({ ...user, pwd: e.target.value });
    }
    return;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(signInRequest());
    setErr(false);
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      headers: { Authorization: `Bearer ${token}` },
      url: "http://10.89.84.42:8080/user/login",
      data: {
        phone: user.phone,
        pwd: user.pwd,
      },
    })
      .then((res) => {
        alert("Sign in successfully.");
        localStorage.setItem("token", res.data.accessToken);
        dispatch(signInSuccess());
        setErr(false);
        route.push("/user");
      })
      .catch((error) => {
        dispatch(signInFailure());
        setErr(true);
        setUser({ phone: "", pwd: "" });
      });
  };

  return (
    <section className="my-[100px] mx-0">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={user.phone}
                  onChange={handleChange}
                  autoComplete="phone"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.pwd}
                  pattern="/(84|0[3|5|7|8|9])+([0-9]{8})\b/g"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {pending ? "Signing in ..." : "Sign In"}
              </button>
            </div>
            {err && (
              <div className="text-[16px] font-semibold text-orange-500 text-center">
                Invalid Phone or Password
              </div>
            )}
            <p className="text-center">
              Don't have an account?{" "}
              <Link
                href="/account/regist"
                className="text-indigo-600 font-semibold underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
