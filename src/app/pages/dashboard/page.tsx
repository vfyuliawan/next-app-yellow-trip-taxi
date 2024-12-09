"use client";

import Image from "next/image";
import SearchFieldComponent from "@/app/component/SearchFieldComponent";
import { ISlideBarComponent } from "@/app/component/ISlideBarComponent";
import TableComponent from "@/app/component/TableComponent";
import { EnnumMenuDashboard } from "@/app/enumiration/EnumMenuDashboard";
import ITableComponent from "@/app/component/ITabelComponent";
import { useEffect, useRef, useState } from "react";
import { ProductService } from "@/app/dummyData/productData";
import { Dialog } from "primereact/dialog";
import ITextInputComponent from "@/app/component/ITextInputComponent";
import { Button } from "primereact/button";
import ILoadingComponent from "@/app/component/ILoadingComponent";
import { ProgressSpinner } from "primereact/progressspinner";
import { useLoading } from "@/app/context/ILoadingContext";
import loginRepository from "@/app/core/domain/repository/LoginRepository/loginRepository";
import Utility from "@/app/utility/Utility";

export default function DashboardPage() {
  const [dataProduct, setdataProduct] = useState<any[]>([]);
  const [dialogVisible, setdialogVisible] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => {
       Utility.checkLoginUtility()
    }, 1000);
  }, []);

  useEffect(() => {
    ProductService.getProducts().then((data) => setdataProduct(data));
  }, []);

  const columns = [
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];


  return (
    <>
      <ISlideBarComponent
        isActive={EnnumMenuDashboard.Dashboard}
        children={
          <>
            <div className="flex justify-between">
              <p className="flex-1 text-3xl font-semibold text-black dark:text-white">
                Dashboard
              </p>
              </div>
        
             
          </>
        }
      />
    </>
  );
}
