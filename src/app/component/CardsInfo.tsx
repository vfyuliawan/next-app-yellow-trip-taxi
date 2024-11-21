import axios from "axios";
import { DataTransaction } from "../core/domain/model/Response/GetModelResponseData";

interface CardInterface {
  title: string;
  vendorId: string;
  distance: string;
  PaymentType: string;
  fare_amount: string;
  mta_tax: string;
  tip_amount: string;
  total_amount: string;
  isActive: boolean;
  pickup_latitude: number;
  pickup_longitude: number;
  dropoff_latitude: number;
  dropoff_longitude: number;
  dataDetail: DataTransaction;
  toggleOnClickCard: (data: DataTransaction, index: number) => void;
  index: number;
}

const CardsInfo = (props: CardInterface) => {
  return (
    <div
      onClick={() => {
        props.toggleOnClickCard(props.dataDetail, props.index);
      }}
      className={`shadow-lg block rounded-lg p-6 shadow-secondary-1 relative ${!props.isActive ? "bg-slate-50" : "bg-slate-300"}  hover:bg-slate-300 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-300 dark:bg-surface-dark dark:text-white overflow-hidden`}
    >
      <div
        className={`absolute px-2  top-0 left-0 ${
          props.PaymentType === "CRD" ? "bg-purple-800" : "bg-lime-800"
        } `}
      >
        <p className="text-white">
          {props.dataDetail.payment_type === "CRD" ? "CREDIT CARD" : "CASH"}
        </p>
      </div>

      <h5 className="mb-4 mt-4 text-xl font-medium leading-tight">
        {props.title}
      </h5>

      <div className="flex justify-between mb-2">
        <p className="text-base">Vendor</p>
        <p className="text-base font-bold">{props.vendorId}</p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-base">Distance</p>
        <p className="text-base font-bold">{parseFloat(props.distance)} KM</p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-base">Amount</p>
        <p className="text-base font-bold">
          {" "}
          USD {parseFloat(props.fare_amount)}
        </p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-base">Tax Amount</p>
        <p className="text-base font-bold"> USD {parseFloat(props.mta_tax)}</p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-base">Tip Amount</p>
        <p className="text-base font-bold">
          {" "}
          USD {parseFloat(props.tip_amount)}
        </p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-base">Total Amount</p>
        <p className="text-base font-bold">
          {" "}
          USD {parseFloat(props.total_amount)}
        </p>
      </div>
    </div>
  );
};

export default CardsInfo;
