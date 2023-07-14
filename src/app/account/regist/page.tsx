"use client";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Account() {
  const [value, setValue] = useState({ phone: "", pwd: "", rePwd: "" });
  const [signUp, setSignUp] = useState({
    requesting: false,
    success: false,
    errorPw: false,
    errorPhone: false,
  });
  const route = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (value.pwd !== value.rePwd) {
      setSignUp({
        requesting: false,
        success: false,
        errorPw: true,
        errorPhone: false,
      });
      setValue({ ...value, rePwd: "" });
    } else {
      setSignUp({
        requesting: true,
        success: false,
        errorPw: false,
        errorPhone: false,
      });
      const token = localStorage.getItem("token");
      axios({
        method: "post",
        headers: { Authorization: `Bearer ${token}` },
        url: "http://10.89.84.42:8080/user/regist",
        data: {
          phone: value.phone,
          pwd: value.pwd,
        },
      })
        .then((res) => {
          setValue({ phone: "", pwd: "", rePwd: "" });
          setSignUp({
            requesting: false,
            success: true,
            errorPw: false,
            errorPhone: false,
          });
          alert("Sign up successfully. You will be redirected to login page.");
          route.push("/account/login");
        })
        .catch((error) => {
          console.log(error);
          
          setSignUp({
            requesting: false,
            success: false,
            errorPw: false,
            errorPhone: true,
          });
        });
    }
  };
  return (
    <section className="mt-[100px]">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  value={value.phone}
                  onChange={(e) => {
                    setValue({ ...value, phone: e.target.value });
                    setSignUp({ ...signUp, errorPhone: false });
                  }}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {signUp.errorPhone && <p>Phone number already exists</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  data-testid="inputPwd"
                  value={value.pwd}
                  onChange={(e) => setValue({ ...value, pwd: e.target.value })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="repeatPassword"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Repeat Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={value.rePwd}
                  onChange={(e) => {
                    setSignUp({ ...signUp, errorPw: false });
                    setValue({ ...value, rePwd: e.target.value });
                  }}
                  data-testid="repeatPwd"
                  id="repeatPassword"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {signUp.errorPw && <p>password does not match</p>}
              </div>
            </div>

            <div>
              <button
                data-testid="buttonid"
                onClick={handleSubmit}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {signUp.requesting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>

            <div className="text-sm">
              <Link href="/account/login">Sign in?</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
