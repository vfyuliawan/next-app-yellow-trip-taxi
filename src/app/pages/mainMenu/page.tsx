import IDetailComponent from "@/app/component/IDetailComponent";
import IMenuBar, { ItemsInterface } from "@/app/component/IMenuBar";
import { useLoading } from "@/app/context/ILoadingContext";
import { GetModelResponseArticels } from "@/app/core/domain/model/Response/GetModelResponseArticels";
import { DetailArticel } from "@/app/core/domain/model/Response/GetModelResponseDetail";
import { GetModeResponsCategoryList } from "@/app/core/domain/model/Response/GetModeResponsCategoryList";
import articelsRepository from "@/app/core/domain/repository/Articlesrepository/articelsRepository";
import categoryRepository from "@/app/core/domain/repository/CategoryRepository/categoryRepository";
import loginRepository from "@/app/core/domain/repository/LoginRepository/loginRepository";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useState, useRef, useEffect } from "react";
import { Image } from "primereact/image";
import { Paginator } from "primereact/paginator";
import commentREpository from "@/app/core/domain/repository/CommentRepository/commentREpository";
import { DataComment } from "@/app/core/domain/model/Response/ModelResponseCommentList";
import Utility from "@/app/utility/Utility";
import { Divider } from "primereact/divider";

const MainMenuPage = () => {
  const [isLogin, setisLogin] = useState(false);
  const [categoryList, setcategoryList] = useState<ItemsInterface[]>();
  const [menuSelected, setmenuSelected] = useState(0);
  const [allComments, setallComments] = useState<DataComment[]>();
  const [menuId, setMenuId] = useState(1);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const [dialogDetail, setdialogDetail] = useState(false);
  const [detailEditArticle, setdetailEditArticle] =
    useState<DetailArticel | null>();

  const [articelsResult, setarticelsResult] =
    useState<GetModelResponseArticels>();

  const { startLoading, stopLoading } = useLoading();

  console.log(categoryList);

  const toast = useRef<any>(null);

  const showToast = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Anda Berhasil Login",
    });
  };

  const checkLogin = async () => {
    const res = await loginRepository.checkLogin();
    if (res !== null) {
      setisLogin(true);
      showToast();
    }
  };

  const getAllCategory = async () => {
    const res = await categoryRepository.getCategory();
    if (res !== null) {
      const item = res.data.map((item) => {
        return {
          label: item.name,
          icon: "pi pi-home",
          id: item.name == "City" ? 1 : item.id.toString(),
        } as ItemsInterface;
      });
      setcategoryList(item);
    }
  };

  async function getUserArticles(paramTitle?: string) {
    const res = await articelsRepository.getArticlesUser({
      category: menuId,
      page: page,
      pageSize: 200,
      title: paramTitle ?? search,
    });
    if (res !== null) {
      setarticelsResult(res);
    }
  }

  async function getArticlesbyCategory(value?: string, valuePage?: number) {
    startLoading();
    const res = await articelsRepository.getArticlesUser({
      category: menuId,
      page: valuePage ?? page,
      pageSize: 7,
      title: value ?? search,
    });
    if (res !== null) {
      if (valuePage !== undefined) {
        stopLoading();
      }
      setarticelsResult(res);
    }
  }

  const getAllComments = async () => {
    const res = await commentREpository.getComments();
    if (res !== null) {
      setallComments(res.data);
    }
  };

  useEffect(() => {
    checkLogin();
    getUserArticles().then((res) => {
      getAllCategory().then((res) => {
        getAllComments();
      });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getArticlesbyCategory().then((res) => {
        stopLoading();
      });
    }, 600);
    return () => {};
  }, [menuId]);

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
  ];
  return (
    <>
      <IMenuBar
        isSearchAction={(search: string) => {
          getArticlesbyCategory(search).then(() => {
            stopLoading();
          });
        }}
        setMenuId={setMenuId}
        setSelected={setmenuSelected}
        selected={menuSelected}
        isLogin={isLogin}
        items={categoryList ?? []}
      />
      <Dialog
        header={"Detail Articel"}
        footer={
          <div>
            <Button
              label="Close"
              icon="pi pi-times"
              onClick={() => {
                setdetailEditArticle(null);
                setdialogDetail(false);
              }}
              className="p-button-text me-2"
            />
          </div>
        }
        visible={dialogDetail}
        style={{ width: "80vw" }}
        onHide={() => {
          setdetailEditArticle(null);
          setdialogDetail(false);
        }}
      >
        <IDetailComponent
          image={detailEditArticle?.cover_image_url}
          desc={detailEditArticle?.description}
          title={detailEditArticle?.title}
          publishDate={detailEditArticle?.publishedAt?.toString()}
        />
      </Dialog>
      {articelsResult?.data?.length! > 0 ? (
        <>
          <section className="bg-slate-50  dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className=" place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                  {articelsResult?.data[0]?.title}
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  {articelsResult?.data[0].description}
                </p>

                <a
                  onClick={() => {
                    setdetailEditArticle(articelsResult?.data[0]);
                    setdialogDetail(true);
                  }}
                  href="#"
                  className="flex max-w-40 px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  View Detail
                </a>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img
                  src={articelsResult?.data[0].cover_image_url}
                  alt="mockup"
                />
              </div>
            </div>
          </section>
          <div className="flex flex-col bg-slate-50  md:flex-col  lg:flex-row">
            <div className="basis-3/4 gap-3  card  ">
              <div className="flex  flex-col   bg-slate-50 rounded-lg">
                <p className="text-slate-700 mt-20 text-3xl font-bold ms-10">
                  {"Category City"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 m-10">
                  {articelsResult?.data.map((item, index: number) => {
                    if (index > 0) {
                      return (
                        <div
                          onClick={() => {
                            setdetailEditArticle(item);
                            setdialogDetail(true);
                          }}
                          className="card shadow-md cursor-pointer bg-white p-10 rounded-md justify-center"
                        >
                          <div className="flex flex-row items-center">
                            <div className="gird basis-11/12">
                              <p className="m-0 text-lg font-bold">
                                {item.title}
                              </p>
                              <p className="m-0">{item.description}</p>
                            </div>
                            <div className="gird basis-1/4 justify-end items-end">
                              <img
                                alt="Card"
                                className="rounded-lg object-cover h-36"
                                src={item.cover_image_url}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                    }
                  })}
                  <div className="card">
                    <Paginator
                      first={page}
                      rows={10}
                      totalRecords={50}
                      onPageChange={(e) => {
                        setpage(e.first);
                        getArticlesbyCategory("", e.page + 1);
                      }}
                      template={{
                        layout: "PrevPageLink CurrentPageReport NextPageLink",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="basis-1/4 gap-3 bg-slate-50 py-8 px-3 card  ">
              <div className="flex flex-col bg-slate-50 rounded-lg">
                <p className="text-slate-700 mt-10 text-3xl font-bold ms-3">
                  {"Comment"}
                </p>
                <div className="flex flex-col">
                  {allComments?.map(item =>{
                    return(
                      <div className="flex justify-start flex-col p-5">
                        <p className=" text-slate-500 text-lg font-semibold">{item.content}</p>  
                        <p className=" text-slate-500 text-sm ">Published at {Utility.formatDate(item.publishedAt.toString())}</p>  
                        <Divider/>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
              <div className="card flex justify-center">
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/007/872/974/non_2x/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg"
                  alt="Image"
                  width="250"
                />
              </div>
              <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                Articel Not Found
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find that articel. You'll find lots
              </p>
              <a
                href="/"
                className="inline-flex text-blue-700 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
              >
                Back to Homepage
              </a>
            </div>
          </div>
        </section>
      )}

      <Toast ref={toast} />
    </>
  );
};

export default MainMenuPage;
