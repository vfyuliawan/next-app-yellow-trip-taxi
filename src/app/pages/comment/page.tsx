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
import { DataComment } from "@/app/core/domain/model/Response/ModelResponseCommentList";
import commentREpository from "@/app/core/domain/repository/CommentRepository/commentREpository";

interface CommentProps {}
const CommentPage = (props: CommentProps) => {
  const [detailEditCategory, setdetailEditCategory] =
    useState<DataComment | null>();
  const [idComment, setidComment] = useState("");
  const [content, setContent] = useState("");
  const [dialogVisible, setdialogVisible] = useState(false);
  const [dialogDetail, setDialogDetail] = useState(false);
  const [commentList, setcommentList] =
    useState<DataComment[]>();
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
   

    if (content !== "") {
      setisButtonActive(true);
      console.log("Validation passed, button activated");
    } else {
      setisButtonActive(false);
      console.log("Validation failed, button deactivated");
    }
  };

  const [onEdit, setonEdit] = useState(false);


    // const submitEditCategory= async (idArticel: string) => {
    //   startLoading();
    //   await categoryRepository
    //     .editCategory({ documentId: idArticel, name: cateGoryName! })
    //     .then((res) => {
    //       if (res !== null) {
    //         showToastSuccess("Success Edit Category");
    //       }
    //       getAllComment();
    //     });
    // };

  useEffect(() => {
    checkValidasi();
    setTimeout(() => {
      Utility.checkLoginUtility();
    }, 1000);
    getAllComment();
  }, []);

    useEffect(() => {
      if (content!=="") {
        checkValidasi();
      }
    }, [content]);

  const getCategorylById = async (params: { documentId: string }) => {
    const res = await commentREpository.getDeatilCommnent({ documentId: params.documentId });
    if (res !== null) {
      setdetailEditCategory(res.data);
    }
  };

  const getAllComment = async () => {
    startLoading();
    const res = await commentREpository.getComments();
    if (res !== null) {
      setcommentList(res.data);
    stopLoading();

    }
  };


//   const searchCategory = async (searchValue: string) => {
//     startLoading();
//     setTimeout(() => {
//       setcategoryList((prev: GetModeResponsCategoryList| null | undefined) =>{
//         return{
//           ...prev,
//           data:prev?.data.filter(item => item.name.includes(searchValue))
//         } as GetModeResponsCategoryList | null| undefined
//       })   
//       stopLoading()
//     }, 400);

//   };

  const deleteCategory = async () => {
    startLoading();
    const res = await commentREpository
      .deleteComment({ documentId: idComment })
      .then(() => {
        getAllComment();
        showToastSuccess("Success Delete Category");
      });
  };


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
    { field: "id", header: "ID Comment" },
    { field: "documentId", header: "Document Id" },
    { field: "content", header: "Content" },
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
                Comments
              </p>

              {/* <Button
                className="bg-sky-700 rounded-xl hover:bg-sky-600"
                label="Add Comment"
                icon="pi pi-plus"
                onClick={() => {
                  setdetailEditCategory(null);

                  setdialogVisible(true);
                }}
              /> */}
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
                  setidComment("");
                }}
              >
                <div className="container flex-col">
                  <div className="grid justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-4">
                    <ITextInputComponent
                      label={"Name"}
                      defaultValue={detailEditCategory?.content}
                      isTextArea={false}
                      onChange={(e) => {
                        setContent(e.target.value)
                      }}
                      id={"name"}
                    />
                    
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
                            // submitEditCategory(idArticel)
                          } else {
                            // submitCreateArticle()
                          }
                          setonEdit(false);
                          setidComment("");
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
                        setidComment("");
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
                  setidComment("");
                }}
              >
                {/* <IDetailComponent
                  image={detailEditCategory?.}
                  desc={detailEditArticle?.description}
                  title={detailEditArticle?.title}
                  publishDate={detailEditArticle?.publishedAt?.toString()}
                /> */}
                <IDetailCategory
                  desc={detailEditCategory?.content ?? ""}
                //   title={detailEditCategory?.name}
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
                    getAllComment();

                  }
                }}
                placeholder="Search Comments"
              />
              <Button
                icon="pi pi-search"
                onClick={() => {
                //   searchCategory(categorySearch)

                }}
                className="p-button-warning bg-sky-800 hover:bg-sky-600"
              />
            </div>
            <ITableComponent
              cols={columns}
              data={commentList as any}
              onClickDetail={function (idArticel: string): void {
                getCategorylById({ documentId: idArticel }).then((res) => {
                  setDialogDetail(true);
                  setonEdit(true);
                });
                setidComment(idArticel);
              }}
              onClickEdit={function (idArticel: string): void {
                getCategorylById({ documentId: idArticel }).then(() => {
                  setdialogVisible(true);
                  setonEdit(true);
                });
                setidComment(idArticel);
              }}
              onClickDelete={function (idArticel: string): void {
                setidComment(idArticel);
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
        isActive={EnnumMenuDashboard.Comment}
      />
      <Toast ref={toast} />
    </div>
  );
};

export default CommentPage;
