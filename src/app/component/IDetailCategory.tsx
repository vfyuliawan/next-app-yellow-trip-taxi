import { Card } from "primereact/card";
import Utility from "../utility/Utility";

const IDetailCategory = (props: {
  desc?: string;
  title?: string;
  publishDate?: string;
  createdAt?: string;
  updatedAt?: string;
}) => {
  console.log(props.publishDate);

  // const header = (
  //   <div className="justify-center flex mt-3 rounded-md">
  //     <img alt="Card" className="rounded-md" src={props.image} />
  //   </div>
  // );
  return (
    <div className="card flex justify-center">
      <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {props.desc}
        </p>

        <div className="flex flex-col">
        <a
          href="#"
          className="inline-flex font-medium items-center text-blue-600 hover:underline"
        >
          Published At: {Utility.formatDate(props.publishDate??"")}
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </a>

        <a
          href="#"
          className="inline-flex font-medium items-center text-blue-600 hover:underline"
        >
          Created At: {Utility.formatDate(props.createdAt??"")}
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </a>
        </div>

      </div>
    </div>
  );
};

export default IDetailCategory;
