"use client";
import clsx from "clsx";
import { useState } from "react";
import style from "./YourInfo.module.scss";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
const YourInfo = ({ editPW, setEditPW }: { editPW: any; setEditPW: any }) => {
  const [pwInput, setPwInput] = useState({
    currentPwd: "",
    newPwd: "",
    rNewPwd: "",
  });
  const [toastErr, setToastErr] = useState("");
  const handleChange = (e: any) => {
    setToastErr("");
    if (e.target.name === "currentPwd")
      setPwInput({ ...pwInput, currentPwd: e.target.value });
    else if (e.target.name === "newPwd")
      setPwInput({ ...pwInput, newPwd: e.target.value });
    else if (e.target.name === "rNewPwd")
      setPwInput({ ...pwInput, rNewPwd: e.target.value });
    else return;
  };
  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (pwInput.newPwd !== pwInput.rNewPwd) {
      setToastErr("Repeat password does not match");
      return;
    }
    if (pwInput.currentPwd === pwInput.newPwd) {
      setToastErr("New password must not be the same as the current one");
      return;
    }
    const token = localStorage.getItem("token");
    axios({
      method: "put",
      headers: { Authorization: `Bearer ${token}` },
      url: "http://10.89.84.42:8080/user",
      data: {
        oldPwd: pwInput.currentPwd,
        newPwd: pwInput.newPwd,
      },
    })
      .then((res) => {
        alert("Password successfully updated");
        setEditPW(false);
      })
      .catch((error) => setToastErr("Invalid current password"));
  };

  return (
    <div className="px-8">
      {!editPW ? (
        <div>
          <h3 className="font-semibold text-[22px]">Welcome!!!</h3>
          <button
            onClick={() => setEditPW(true)}
            className="py-2 px-4 bg-gray-300 rounded-lg mt-4 hover:opacity-75 font-semibold text-[16px]">
            Change Password
          </button>
        </div>
      ) : (
        <form
          className="w-full flex flex-col mt-4 items-center text-[16px]"
          onSubmit={handleSave}>
          <h1 className="text-center text-[25px] font-semibold mb-8">
            Change Your Password
          </h1>
          <div className={clsx(style.form_control)}>
            <label htmlFor="currentPwd">Current Password:</label>
            <input
              type="password"
              name="currentPwd"
              id="currentPwd"
              required
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style.form_control)}>
            <label htmlFor="newPwd">New Password:</label>
            <input
              type="password"
              name="newPwd"
              id="newPwd"
              required
              onChange={handleChange}
            />
          </div>
          <div className={clsx(style.form_control)}>
            <label htmlFor="rNewPwd">Repeat New Password:</label>
            <input
              type="password"
              name="rNewPwd"
              id="rNewPwd"
              required
              onChange={handleChange}
            />
          </div>
          {toastErr.trim() !== "" && (
            <div className="text-[16px] text-orange-500 font-semibold">
              {toastErr}
            </div>
          )}
          <div>
            <button
              className="w-[100px] py-2 px-4 bg-gray-300 rounded-lg mt-4 hover:opacity-75 font-semibold mr-4"
              type="submit">
              Save
            </button>
            <button
              className="w-[100px] py-2 px-4 bg-gray-300 rounded-lg mt-4 hover:opacity-75 font-semibold ml-4"
              type="button"
              onClick={() => setEditPW(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default YourInfo;
