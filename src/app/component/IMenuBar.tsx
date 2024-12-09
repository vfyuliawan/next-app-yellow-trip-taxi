"use client";
import React, { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import ITextInputComponent from "./ITextInputComponent";
import { Button } from "primereact/button";
import loginRepository from "../core/domain/repository/LoginRepository/loginRepository";
import { Toast } from "primereact/toast";
import { EnumItemStorage } from "../enumiration/EnumItemStorage";

export interface ItemsInterface {
  label: string;
  icon: string;
  id: string;
  className?: string;
  command?: () => void;
}

interface IMenuBarProps {
  isLogin: boolean;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  items: ItemsInterface[];
  setMenuId: React.Dispatch<React.SetStateAction<number>>;
  isSearchAction: (search: string) => void;
}

export default function IMenuBar(props: IMenuBarProps) {
  const [itemModel, setItemModel] = useState<ItemsInterface[]>(props.items);
  const [menuSelected, setmenuSelected] = useState(0);
  const [search, setSearch] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef<any>(null);

  useEffect(() => {
    const updatedItems = props.items.map((item, index) => ({
      ...item,
      className: index === menuSelected ? "active-menu-item" : "",
      command: () => {
        setmenuSelected(index);
        props.setMenuId(parseInt(item.id));
        props.setSelected(index);
      },
    }));
    setItemModel(updatedItems);
  }, [props.items, props.selected, menuSelected]);

  const submitLogin = async () => {
    const res = await loginRepository.submitLogin({
      identifier: username,
      password: password,
    });
    if (res != null) {
      localStorage.setItem(EnumItemStorage.token, res.jwt);
      localStorage.setItem(EnumItemStorage.userId, res.user.id.toString());
      showToast();
      setTimeout(() => {
        window.location.href = "/pages/dashboard";
      }, 1000);
    }
  };

  const showToast = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Anda Sudah Login",
    });
  };

  const start = (
    <div className="">
      <img
        alt="Datacakra logo"
        style={{ height: 40 }}
        src="/assets/datacakra.png" // Assuming the image is in the public folder
        className="mr-2"
      />
    </div>
  );

  const end = props.isLogin ? (
    <div className="flex flex-auto">
       <ITextInputComponent
        label={""}
        id={""}
        onChange={function (
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ): void {
          setSearch(event.target.value);
        }}
      />
      <div
        onClick={() => {
          props.isSearchAction(search);
        }}
        className="flex justify-center  items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-md transition-all"
        style={{ fontSize: "1rem" }}
      >
        <i className="pi pi-search" style={{ fontSize: "1rem" }}></i>
      </div>
      <div
        onClick={() => {
          window.location.href = "/pages/dashboard";
        }}
        className="flex justify-center gap-3 items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-md transition-all"
        style={{ fontSize: "1rem" }}
      >
        <i className="pi pi-objects-column" style={{ fontSize: "1rem" }}></i>
        <p className="text-slate-800 dark:text-slate-50 me-4">Dashboard</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-auto">
      <ITextInputComponent
        label={""}
        id={""}
        onChange={function (
          event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ): void {
          setSearch(event.target.value);
        }}
      />
      <div
        onClick={() => {
          props.isSearchAction(search);
        }}
        className="flex justify-center  items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-md transition-all"
        style={{ fontSize: "1rem" }}
      >
        <i className="pi pi-search" style={{ fontSize: "1rem" }}></i>
      </div>

      <div
        onClick={() => {
          setLoginModal(true);
        }}
        className="flex justify-center gap-3 items-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-md transition-all"
        style={{ fontSize: "1rem" }}
      >
        <i className="pi pi-sign-in" style={{ fontSize: "1rem" }}></i>
        <p className="text-slate-800 dark:text-slate-50 me-4">Login</p>
      </div>
    </div>
  );

  return (
    <div className="card">
      <Menubar className="" model={itemModel} start={start} end={end} />
      <Dialog
        header="Login"
        visible={loginModal}
        style={{ width: "40vw" }}
        onHide={() => setLoginModal(false)}
      >
        <div className="container flex-col">
          <div className="grid justify-center gap-4">
            <ITextInputComponent
              onChange={(e) => setUsername(e.target.value)}
              isTextArea={false}
              iconField={{
                isShow: true,
                icon: "pi pi-user",
                iconPosition: "left",
              }}
              label={"Email / Username"}
              id={"username"}
            />
            <ITextInputComponent
              type="password"
              isPassword
              onChange={(e) => setPassword(e.target.value)}
              iconField={{
                isShow: true,
                icon: "pi pi-key",
                iconPosition: "left",
              }}
              label={"Password"}
              id={"password"}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="button"
              label="Submit"
              className="bg-sky-700 hover:bg-sky-600 rounded-xl"
              icon="pi pi-file"
              rounded
              onClick={() => {
                submitLogin().then(() => setLoginModal(false));
              }}
            />
          </div>
        </div>
      </Dialog>
      <Toast ref={toast} />
    </div>
  );
}
