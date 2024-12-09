"use client";

import { ISlideBarComponent } from "@/app/component/ISlideBarComponent";
import ITableComponent from "@/app/component/ITabelComponent";
import ITextInputComponent from "@/app/component/ITextInputComponent";
import SearchFieldComponent from "@/app/component/SearchFieldComponent";
import { useLoading } from "@/app/context/ILoadingContext";
import { GetModelResponseArticels } from "@/app/core/domain/model/Response/GetModelResponseArticels";
import { DetailArticel } from "@/app/core/domain/model/Response/GetModelResponseDetail";
import articelsRepository from "@/app/core/domain/repository/Articlesrepository/articelsRepository";
import { ProductService } from "@/app/dummyData/productData";
import { EnnumMenuDashboard } from "@/app/enumiration/EnumMenuDashboard";
import Utility from "@/app/utility/Utility";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState, useEffect, useRef } from "react";
import { Image } from "primereact/image";
import categoryRepository from "@/app/core/domain/repository/CategoryRepository/categoryRepository";
import IDropdown, { NameCode } from "@/app/component/IDropdown";
import { Toast } from "primereact/toast";
import IDetailComponent from "@/app/component/IDetailComponent";

type ArticlesPageInterface = {};
const ArticlePages = (props: ArticlesPageInterface) => {
  const [detailEditArticle, setdetailEditArticle] =
    useState<DetailArticel | null>();
  const [idArticel, setidArticel] = useState("");
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogDetail, setDialogDetail] = useState(false);
  const [categoryList, setcategoryList] = useState<NameCode[]>();
  const [isLoading, setisLoading] = useState(true);
  const [category, setcategory] = useState(0);
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
    console.log(detailEditArticle, "data");

    if (!detailEditArticle) {
      setisButtonActive(false);
      return;
    }

    const { title, description, cover_image_url, category } = detailEditArticle;

    if (
      title?.trim() &&
      description?.trim() &&
      cover_image_url?.trim() &&
      category?.toString().trim()
    ) {
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
    await articelsRepository.createArticle(detailEditArticle!).then((res) => {
      if (res !== null) {
        showToastSuccess("Success Create Articel");
      }
      getUserArticles("");
    });
  };

  const submitEditArticel = async (idArticel: string) => {
    startLoading();
    await articelsRepository
      .editArticel({ id: idArticel, data: detailEditArticle! })
      .then((res) => {
        if (res !== null) {
          showToastSuccess("Success Edit Articel");
        }
        getUserArticles("");
      });
  };

  useEffect(() => {
    checkValidasi();
    setTimeout(() => {
      Utility.checkLoginUtility();
    }, 1000);
    getUserArticles().then(() => {
      getAllCategory();
    });
  }, []);

  useEffect(() => {
    if (detailEditArticle) {
      checkValidasi();
    }
  }, [detailEditArticle]);

  const getDetailById = async (params: { id: string }) => {
    const res = await articelsRepository.getDeatilArticle({ id: params.id });
    if (res !== null) {
      setdetailEditArticle(res.data);
    }
  };

  const getAllCategory = async () => {
    const res = await categoryRepository.getCategory();
    if (res !== null) {
      const categoryListRes = res.data.map((item) => {
        return {
          code: item.id.toString(),
          name: item.name,
        } as NameCode;
      });
      setcategoryList(categoryListRes);
    }
  };

  const deleteArticel = async () => {
    startLoading();
    const res = await articelsRepository
      .deleteArticel({ id: idArticel })
      .then(() => {
        getUserArticles("");
        showToastSuccess("Success Delete Articel");
      });
  };

  async function getUserArticles(paramTitle?: string) {
    startLoading();
    const res = await articelsRepository.getArticlesUser({
      category: category,
      page: page,
      pageSize: 200,
      title: paramTitle ?? searchTitle,
    });
    if (res !== null) {
      setarticelsResult(res);
      stopLoading();
      console.log("finish");
    }
  }

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
          deleteArticel();
        }}
        autoFocus
      />
    </div>
  );

  const columns = [
    { field: "id", header: "ID Articel" },
    { field: "title", header: "Title" },
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
                Articels
              </p>

              <Button
                className="bg-sky-700 rounded-xl hover:bg-sky-600"
                label="Add Article"
                icon="pi pi-plus"
                onClick={() => {
                  setdetailEditArticle(null);

                  setdialogVisible(true);
                }}
              />
              <Dialog
                header={
                  detailEditArticle == null ? "Create Article" : "Edit Articel"
                }
                visible={dialogVisible}
                style={{ width: "80vw" }}
                onHide={() => {
                  setdialogVisible(false);
                  setdetailEditArticle(null);
                  setisButtonActive(false);
                  setonEdit(false);
                  setidArticel("");
                }}
              >
                <div className="container flex-col">
                  <div className="grid justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-4">
                    <ITextInputComponent
                      label={"Title"}
                      defaultValue={detailEditArticle?.title}
                      isTextArea={false}
                      onChange={(e) => {
                        setdetailEditArticle(
                          (prev: DetailArticel | null | undefined) => {
                            return {
                              ...prev!,
                              title: e.target.value,
                            };
                          }
                        );
                      }}
                      id={"title"}
                    />
                    <ITextInputComponent
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
                    />
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button
                      disabled={!isButtonActive}
                      type="button"
                      label="Submit Article"
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
                          setdetailEditArticle(null);
                          setisButtonActive(false);
                          if (onEdit) {
                            submitEditArticel(idArticel);
                          } else {
                            submitCreateArticle();
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
                <p className="m-0">Are you sure deleted this articel?</p>
              </Dialog>
              <Dialog
                header={"Detail Articel"}
                footer={
                  <div>
                    <Button
                      label="Close"
                      icon="pi pi-times"
                      onClick={() => {
                        setDialogDetail(false);
                        setdetailEditArticle(null);
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
                  setdetailEditArticle(null);
                  setisButtonActive(false);
                  setonEdit(false);
                  setidArticel("");
                }}
              >
                <IDetailComponent
                  image={detailEditArticle?.cover_image_url}
                  desc={detailEditArticle?.description}
                  title={detailEditArticle?.title}
                  publishDate={detailEditArticle?.publishedAt?.toString()}
                />
              </Dialog>
            </div>
            <div className="p-inputgroup max-w-md flex-1">
              <InputText
                onChange={(e) => {
                  setsearchTitle(e.target.value);
                  if (e.target.value.length === 0) {
                    getUserArticles("");
                  }
                }}
                placeholder="Keyword"
              />
              <Button
                icon="pi pi-search"
                onClick={() => {
                  getUserArticles();
                }}
                className="p-button-warning bg-sky-800 hover:bg-sky-600"
              />
            </div>
            <ITableComponent
              cols={columns}
              data={articelsResult?.data as any}
              onClickDetail={function (idArticel: string): void {
                getDetailById({ id: idArticel }).then((res) => {
                  setDialogDetail(true);
                  setonEdit(true);
                });
                setidArticel(idArticel);
              }}
              onClickEdit={function (idArticel: string): void {
                getDetailById({ id: idArticel }).then((res) => {
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
        isActive={EnnumMenuDashboard.Articles}
      />
      <Toast ref={toast} />
    </div>
  );
};

export default ArticlePages;
