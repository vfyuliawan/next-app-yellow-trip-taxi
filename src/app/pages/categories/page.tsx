"use client";
import IDetailComponent from "@/app/component/IDetailComponent";
import IDropdown, { NameCode } from "@/app/component/IDropdown";
import { ISlideBarComponent } from "@/app/component/ISlideBarComponent";
import ITableComponent from "@/app/component/ITabelComponent";
import ITextInputComponent from "@/app/component/ITextInputComponent";
import { useLoading } from "@/app/context/ILoadingContext";
import { GetModelResponseArticels } from "@/app/core/domain/model/Response/GetModelResponseArticels";
import { DetailArticel } from "@/app/core/domain/model/Response/GetModelResponseDetail";
import articelsRepository from "@/app/core/domain/repository/Articlesrepository/articelsRepository";
import categoryRepository from "@/app/core/domain/repository/CategoryRepository/categoryRepository";
import { EnnumMenuDashboard } from "@/app/enumiration/EnumMenuDashboard";
import Utility from "@/app/utility/Utility";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useEffect, useRef } from "react";
import { GetModeResponsCategoryList } from "@/app/core/domain/model/Response/GetModeResponsCategoryList";
import { DetailCategory } from "@/app/core/domain/model/Response/ModelResponseCategoryById";
import IDetailCategory from "@/app/component/IDetailCategory";

interface CategoriesPageProps {}
const CategoriesPage = (props: CategoriesPageProps) => {
  const [detailEditCategory, setdetailEditCategory] =
    useState<DetailCategory | null>();
  const [idArticel, setidArticel] = useState("");
  const [cateGoryName, setCategoryname] = useState("");
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogDetail, setDialogDetail] = useState(false);
  const [categoryList, setcategoryList] =
    useState<GetModeResponsCategoryList|null| undefined>();
  const [isLoading, setisLoading] = useState(true);
  const [category, setcategory] = useState(0);
  const [categorySearch, setcategorySearch] = useState("")
  const [categorySelected, setCategorySelected] = useState<NameCode>();
  const [page, setpage] = useState(0);
  const [articelsResult, setarticelsResult] =
    useState<GetModelResponseArticels>();
  const [searchTitle, setsearchTitle] = useState("");

  const { startLoading, stopLoading } = useLoading();

  const [isButtonActive, setisButtonActive] = useState(false);

  const showToastSuccess = (message: string) => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: message,
    });
  };

  const checkValidasi = () => {
   

    if (cateGoryName !== "") {
      setisButtonActive(true);
      console.log("Validation passed, button activated");
    } else {
      setisButtonActive(false);
      console.log("Validation failed, button deactivated");
    }
  };

  const [onEdit, setonEdit] = useState(false);

    const submitCreateArticle = async () => {
      startLoading();
      await categoryRepository.createCategory(cateGoryName!).then((res) => {
        if (res !== null) {
          showToastSuccess("Success Create Category");
        }
        getAllCategory();
    });
    };

    const submitEditCategory= async (idArticel: string) => {
      startLoading();
      await categoryRepository
        .editCategory({ documentId: idArticel, name: cateGoryName! })
        .then((res) => {
          if (res !== null) {
            showToastSuccess("Success Edit Category");
          }
          getAllCategory();
        });
    };

  useEffect(() => {
    checkValidasi();
    setTimeout(() => {
      Utility.checkLoginUtility();
    }, 1000);
    getAllCategory();
  }, []);

    useEffect(() => {
      if (cateGoryName!=="") {
        checkValidasi();
      }
    }, [cateGoryName]);

  const getCategorylById = async (params: { id: string }) => {
    const res = await categoryRepository.getDeatilCategory({ id: params.id });
    if (res !== null) {
      setdetailEditCategory(res.data);
    }
  };

  const getAllCategory = async () => {
    startLoading();

    const res = await categoryRepository.getCategory();
    if (res !== null) {
      setcategoryList(res);
    stopLoading();

    }
  };


  const searchCategory = async (searchValue: string) => {
    startLoading();
    setTimeout(() => {
      setcategoryList((prev: GetModeResponsCategoryList| null | undefined) =>{
        return{
          ...prev,
          data:prev?.data.filter(item => item.name.includes(searchValue))
        } as GetModeResponsCategoryList | null| undefined
      })   
      stopLoading()
    }, 400);

  };

  const deleteCategory = async () => {
    startLoading();
    const res = await categoryRepository
      .deleteCategory({ documentId: idArticel })
      .then(() => {
        getAllCategory();
        showToastSuccess("Success Delete Category");
      });
  };

//   async function getUserArticles(paramTitle?: string) {
//     startLoading();
//     const res = await articelsRepository.getArticlesUser({
//       category: category,
//       page: page,
//       pageSize: 200,
//       title: paramTitle ?? searchTitle,
//     });
//     if (res !== null) {
//       setarticelsResult(res);
//       stopLoading();
//       console.log("finish");
//     }
//   }

  useEffect(() => {}, []);

  const toast = useRef<any>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<string>("center");
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text me-2"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          setVisible(false);
          deleteCategory();
        }}
        autoFocus
      />
    </div>
  );

  const columns = [
    { field: "id", header: "ID Category" },
    { field: "documentId", header: "Document Id" },
    { field: "name", header: "Nama" },
    { field: "description", header: "Description" },
    { field: "createdAt", header: "Created At" },
    { field: "updatedAt", header: "Updated At" },
    { field: "publishedAt", header: "Published At" },
    { field: "action", header: "Action" },
  ];

  return (
    <div>
      <ISlideBarComponent
        children={
          <>
            <div className="flex justify-between">
              <p className="flex-1 text-3xl font-semibold text-black dark:text-white">
                Categories
              </p>

              <Button
                className="bg-sky-700 rounded-xl hover:bg-sky-600"
                label="Add Category"
                icon="pi pi-plus"
                onClick={() => {
                  setdetailEditCategory(null);

                  setdialogVisible(true);
                }}
              />
              <Dialog
                header={
                  detailEditCategory == null ? "Create Category" : "Edit Category"
                }
                visible={dialogVisible}
                style={{ width: "80vw" }}
                onHide={() => {
                  setdialogVisible(false);
                  setdetailEditCategory(null);
                  setisButtonActive(false);
                  setonEdit(false);
                  setidArticel("");
                }}
              >
                <div className="container flex-col">
                  <div className="grid justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-4">
                    <ITextInputComponent
                      label={"Name"}
                      defaultValue={detailEditCategory?.name}
                      isTextArea={false}
                      onChange={(e) => {
                        setCategoryname(e.target.value)
                      }}
                      id={"name"}
                    />
                    {/* <ITextInputComponent
                      defaultValue={detailEditArticle?.description}
                      label={"Description"}
                      onChange={(e) => {
                        setdetailEditArticle(
                          (prev: DetailArticel | null | undefined) => {
                            return {
                              ...prev!,
                              description: e.target.value,
                            };
                          }
                        );
                      }}
                      isTextArea={true}
                      id={"description"}
                    />
                    <Image
                      style={{
                        width: 300,
                      }}
                      src={detailEditArticle?.cover_image_url}
                      alt="Image"
                      preview
                    />

                    <ITextInputComponent
                      defaultValue={detailEditArticle?.cover_image_url}
                      onChange={(e) => {
                        setdetailEditArticle(
                          (prev: DetailArticel | null | undefined) => {
                            return {
                              ...prev!,
                              cover_image_url: e.target.value,
                            };
                          }
                        );
                      }}
                      isTextArea={false}
                      iconField={{
                        isShow: true,
                        icon: "pi pi-image",
                        iconPosition: "left",
                      }}
                      label={"Cover Image Url"}
                      id={"imageUrl"}
                      helpText="Paste Your Image Url"
                    />
                    <IDropdown
                      label="Category"
                      seLectedKeyValue={detailEditArticle?.category}
                      itemKeyValue={categoryList}
                      onChange={(e) => {
                        setdetailEditArticle(
                          (prev: DetailArticel | null | undefined) => {
                            return {
                              ...prev!,
                              category: e.target.value,
                            };
                          }
                        );
                      }}
                    /> */}
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      disabled={!isButtonActive}
                      type="button"
                      label="Submit Category"
                      className={`${
                        isButtonActive ? "bg-sky-700" : "bg-gray-500"
                      } hover:${
                        isButtonActive ? "bg-sky-600" : "bg-gray-500"
                      } rounded-xl`}
                      icon="pi pi-file"
                      rounded
                      onClick={() => {
                        if (isButtonActive) {
                          setdialogVisible(false);
                          setdetailEditCategory(null);
                          setisButtonActive(false);
                          if (onEdit) {
                            submitEditCategory(idArticel)
                          } else {
                            submitCreateArticle()
                          }
                          setonEdit(false);
                          setidArticel("");
                        }
                      }}
                      data-pr-tooltip="CSV"
                    />
                  </div>
                </div>
              </Dialog>
              <Dialog
                header="Confrimation Delete"
                visible={visible}
                position={"top"}
                style={{ width: "50vw" }}
                onHide={() => {
                  setVisible(false);
                }}
                footer={footerContent}
                draggable={false}
                resizable={false}
              >
                <p className="m-0">Are you sure deleted this category?</p>
              </Dialog>
              <Dialog
                header={"Detail Category"}
                footer={
                  <div>
                    <Button
                      label="Close"
                      icon="pi pi-times"
                      onClick={() => {
                        setDialogDetail(false);
                        setdetailEditCategory(null);
                        setisButtonActive(false);
                        setonEdit(false);
                        setidArticel("");
                      }}
                      className="p-button-text me-2"
                    />
                  </div>
                }
                visible={dialogDetail}
                style={{ width: "80vw" }}
                onHide={() => {
                  setDialogDetail(false);
                  setdetailEditCategory(null);
                  setisButtonActive(false);
                  setonEdit(false);
                  setidArticel("");
                }}
              >
                {/* <IDetailComponent
                  image={detailEditCategory?.}
                  desc={detailEditArticle?.description}
                  title={detailEditArticle?.title}
                  publishDate={detailEditArticle?.publishedAt?.toString()}
                /> */}
                <IDetailCategory
                  desc={detailEditCategory?.description ?? ""}
                  title={detailEditCategory?.name}
                  publishDate={detailEditCategory?.publishedAt.toString()}
                  createdAt={detailEditCategory?.createdAt.toString()}
                />
              </Dialog>
            </div>
            <div className="p-inputgroup max-w-md flex-1">
              <InputText
                onChange={(e) => {
                  setcategorySearch(e.target.value)
                  setsearchTitle(e.target.value);
                  if (e.target.value.length === 0) {
                    getAllCategory();

                  }
                }}
                placeholder="search Category"
              />
              <Button
                icon="pi pi-search"
                onClick={() => {
                  searchCategory(categorySearch)

                }}
                className="p-button-warning bg-sky-800 hover:bg-sky-600"
              />
            </div>
            <ITableComponent
              cols={columns}
              data={categoryList?.data as any}
              onClickDetail={function (idArticel: string): void {
                getCategorylById({ id: idArticel }).then((res) => {
                  setDialogDetail(true);
                  setonEdit(true);
                });
                setidArticel(idArticel);
              }}
              onClickEdit={function (idArticel: string): void {
                getCategorylById({ id: idArticel }).then(() => {
                  setdialogVisible(true);
                  setonEdit(true);
                });
                setidArticel(idArticel);
              }}
              onClickDelete={function (idArticel: string): void {
                setidArticel(idArticel);
                setPosition(position);
                setVisible(true);
              }}
              actionParams={{
                edit: "documentId",
                delete: "documentId",
                seeDetail: "documentId",
              }}
            />
          </>
        }
        isActive={EnnumMenuDashboard.Categories}
      />
      <Toast ref={toast} />
    </div>
  );
};

export default CategoriesPage;
