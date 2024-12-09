"use client";

import Image from "next/image";
import HeroSectionView from "./section/HeroSectionView";
import { ISlideBarComponent } from "./component/ISlideBarComponent";
import { EnnumMenuDashboard } from "./enumiration/EnumMenuDashboard";
import SearchFieldComponent from "./component/SearchFieldComponent";
import TableComponent from "./component/TableComponent";
import DashboardPage from "./pages/dashboard/page";
import MainMenuPage from "./pages/mainMenu/page";
import { useEffect, useRef, useState } from "react";
import loginRepository from "./core/domain/repository/LoginRepository/loginRepository";
import { Toast } from "primereact/toast";

export default function Home() {

  const toast = useRef<any>(null);

  const showToast = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Anda Berhasil Login",
    });
  };

 

  return <MainMenuPage/>
}
