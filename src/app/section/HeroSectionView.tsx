"use client";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import CardsInfo from "../component/CardsInfo";
// import { MapReactLeaflet } from "../component/MapReactLeaflet";
import { useState, useEffect, useRef } from "react";
import { DataTransaction } from "../core/domain/model/Response/GetModelResponseData";
import TransactionRepository from "../core/domain/repository/TransactionRepository";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Bar } from "react-chartjs-2";

import {
  DataSummary,
  GetModelResponseSummary,
} from "../core/domain/model/Response/GetModelResponseSummary";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MapReactLeaflet, MapReactLeafletProps } from "@/app/component/MapReactLeaflet";
import dynamic from "next/dist/shared/lib/dynamic";


const DynamicComponentWithNoSSR = dynamic(() => Promise.resolve(MapReactLeaflet), {
  ssr: false
})




// Register the components you want to use
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PickupInterface {
  latitud: number;
  longitude: number;
}

export default function HeroSectionView() {
  const [dataTransaction, setDataTransaction] = useState<DataTransaction[]>([]);
  const [page, setpage] = useState(0);

  const [pickup, setpickup] = useState<PickupInterface>({
    latitud: 0,
    longitude: 0,
  });
  const [dropOff, setdropOff] = useState<PickupInterface>({
    latitud: 0,
    longitude: 0,
  });

  const [active, setactive] = useState(0);

  const [loading, setLoading] = useState(false);

  const [vendor, setVendor] = useState("");
  const [paymentMethode, setpaymentMethode] = useState("");
  const [passangerCount, setPassangerCount] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [summaryPayment, setsummaryPayment] = useState<DataSummary[]>([]);

  const mapRef = useRef<any>(null); // Create a ref for the map section

  // Function to scroll to the map section
  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function getCityFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<string | null> {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const response = await axios.get(url);
      if (
        response.data &&
        response.data.address &&
        response.data.address.city
      ) {
        return response.data.address.road;
      }

      return null;
    } catch (error) {
      console.error("Error fetching city data:", error);
      return null;
    }
  }

  const getTransaction = async () => {
    const res = await TransactionRepository.gatSummaryPaymentMethode({
      startDate: startDate === ""? "2006-01-01" : startDate,
      endDate: endDate === "" ? "2014-12-31" : endDate
    });
    if (res !== null) {
      setsummaryPayment(res.data);
    }
  };

  const getAllDataTransaction = async () => {
    setLoading(true);
    setDataTransaction([]);
    getTransaction().then(async() =>{
      const res = await TransactionRepository.getDetailTransaction({
        vendor_id: vendor,
        payment_type: paymentMethode,
        passenger_count: passangerCount,
        pickup_datetime_start: startDate,
        pickup_datetime_end: endDate ?? startDate,
        page: page,
        pageSize: 9,
      });
      if (res !== null) {
        // const updatedData = await Promise.all(
        //   res.data.map(async (item) => {
        //     const cityPickup =
        //       (await getCityFromCoordinates(
        //         parseFloat(item.pickup_latitude),
        //         parseFloat(item.pickup_longitude)
        //       )) ?? "Broklyn";
        //     const cityDropOff =
        //       (await getCityFromCoordinates(
        //         parseFloat(item.dropoff_latitude),
        //         parseFloat(item.dropoff_longitude)
        //       )) ?? "Newyork";
  
        //     // Return updated item with cityPickup and
  
        //     return {
        //       ...item,
        //       cityPickup,
        //       cityDropOff,
        //     };
        //   })
        // );
        const updatedData = res.data;
  
        setLoading(false);
  
        setpickup({
          latitud: parseFloat(updatedData[0].pickup_latitude),
          longitude: parseFloat(updatedData[0].pickup_longitude),
        });
        setdropOff({
          latitud: parseFloat(updatedData[0].dropoff_latitude),
          longitude: parseFloat(updatedData[0].dropoff_longitude),
        });
  
        setDataTransaction(updatedData);
      }
    })
   
  };

  const toggleOnClickCard = (data: DataTransaction, index: number) => {
    console.log("data", data.pickup_latitude, data.pickup_longitude);
    scrollToMap();
    setactive(index);

    setdropOff({
      latitud: parseFloat(data.dropoff_latitude),
      longitude: parseFloat(data.dropoff_longitude),
    });
    setpickup({
      latitud: parseFloat(data.pickup_latitude),
      longitude: parseFloat(data.pickup_longitude),
    });
  };

  const chartData = {
    labels: summaryPayment.map((item) => item.payment_type), // Use payment_type as labels
    datasets: [
      {
        label: "Total Amount",
        data: summaryPayment.map((item) => parseFloat(item.sum_total_amount)), // Convert sum_total_amount to numbers
        backgroundColor: "rgba(234,179,5, 0.2)", // Set bar color
        borderColor: "rgb(234,179,5)", // Set border color
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    getAllDataTransaction();

    return () => {};
  }, [page]);

  const handleDateChangeStartDate = (event: any) => {
    setEndDate("");

    const dateValue = event.target.value;
    const date = new Date(dateValue);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    const formatted = `${year}-${month}-${day}`;
    console.log(formatted);

    setStartDate(formatted);
    setEndDate(formatted);
  };

  const handleDateChangeEndDate = (event: any) => {
    const dateValue = event.target.value;
    const date = new Date(dateValue);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    const formatted = `${year}-${month}-${day}`;
    console.log(formatted);

    setEndDate(formatted);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-yellow-400">
            Berpergian Bersama kami
          </h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-yellow-500 sm:text-5xl lg:text-balance">
            Yellow Taxi Trip
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="flex flex-col">
            <h2 className="text-base/7 font-semibold text-black">Filter</h2>
          </div>

          <div className="flex flex-col">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <form className="">
                <div className=" grid-cols-1 justify-center flex items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="manufacturer"
                      className="text-sm font-medium text-stone-600"
                    >
                      Passanger Count
                    </label>

                    <select
                      id="manufacturer"
                      onChange={(val) => {
                        // val.target.value
                        setPassangerCount(val.target.value);
                      }}
                      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option>--Pilih--</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="manufacturer"
                      className="text-sm font-medium text-stone-600"
                    >
                      Vendor ID
                    </label>

                    <select
                      id="manufacturer"
                      onChange={(val) => {
                        // val.target.value
                        setVendor(val.target.value);
                      }}
                      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-yellow-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value={""}>-- All --</option>
                      <option value={"VTS"}>VTS</option>
                      <option value={"CMT"}>CMT</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="manufacturer"
                      className="text-sm font-medium text-stone-600"
                    >
                      Payment Methode
                    </label>

                    <select
                      onChange={(val) => {
                        // val.target.value
                        setpaymentMethode(val.target.value);
                      }}
                      id="manufacturer"
                      className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option value={""}>-- All --</option>
                      <option value={"CSH"}>Cash</option>
                      <option value={"CRD"}>Card</option>
                      <option value={"DIS"}>Dis</option>
                      <option value={"NOC"}>Noc</option>
                      <option value={"UNK"}>Unk</option>
                    </select>
                  </div>
                </div>
              </form>

              <form className="mt-2">
                <div className="flex justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="manufacturer"
                      className="text-sm font-medium text-stone-600"
                    >
                      Pick Start Periode
                    </label>

                    <input
                      type="date"
                      onChange={handleDateChangeStartDate}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                  <div className="flex justify-center align-middle items-center flex-col">
                    <p className="text-lg font-semibold mt-8 align-middle justify-center text-stone-600">
                      To
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="manufacturer"
                      className="text-sm font-sm text-stone-600"
                    >
                      Pick End Periode
                    </label>

                    <input
                      onChange={handleDateChangeEndDate}
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date"
                    />
                  </div>
                </div>
              </form>
              <div className="flex justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <button
                  type="button"
                  onClick={() => {
                    getAllDataTransaction();
                    setpage(0);
                  }}
                  className="rounded-lg mt-7 flex justify-center bg-yellow-500 px-8 py-2 font-medium text-base outline-none hover:opacity-80 focus:ring max-w-60"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {!loading ?(
            <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <Bar
              data={chartData}
              options={{
                responsive: true,
              }}
            />
          </div>
        ) : null}

        {/* Map Section */}
        {!loading && dataTransaction.length > 0 ? (
          <section ref={mapRef} id="map">
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <DynamicComponentWithNoSSR
                pickup={{
                  latitud: pickup.latitud,
                  longitude: pickup.longitude,
                }} // Example coordinates for New York City
                dropoff={{
                  latitud: dropOff.latitud,
                  longitude: dropOff.longitude,
                }} // Example coordinates for Los Angeles
              />
            </div>
          </section>
        ) : dataTransaction.length < 0 && loading ? (
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-yellow-500 sm:text-5xl lg:text-balance">
            Data Not Found
          </p>
        ) : null}

        {/* Features Section */}
        {loading ? (
          <div className="mx-auto mt-16 max-w-2xl justify-center flex sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
        {!loading ? (
          <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {dataTransaction.map((item, index) => (
                <CardsInfo
                  key={index + "fasdfasdfsa"}
                  title={`${item.cityPickup ?? "from"} - ${item.cityDropOff ?? "to"}`}
                  vendorId={item.vendor_id}
                  distance={item.trip_distance}
                  PaymentType={item.payment_type}
                  fare_amount={item.fare_amount}
                  mta_tax={item.mta_tax}
                  tip_amount={item.tip_amount}
                  total_amount={item.total_amount}
                  pickup_latitude={parseInt(item.pickup_latitude)}
                  pickup_longitude={parseInt(item.pickup_longitude)}
                  dropoff_latitude={parseInt(item.dropoff_latitude)}
                  dropoff_longitude={parseInt(item.dropoff_longitude)}
                  dataDetail={item}
                  toggleOnClickCard={toggleOnClickCard}
                  isActive={active == index}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : null}

        {!loading ? (
          <div className="flex flex-col items-center mt-7">
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                onClick={() => {
                  if (page !== 0) {
                    const currentPage = page - 1;
                    setpage(currentPage);
                  }
                }}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-yellow-500 border-0 border-s border-yellow-400 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <div className="mx-2"></div>
              <button
                onClick={() => {
                  const currentPage = page + 1;
                  setpage(currentPage);
                  setactive(0);
                }}
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-yellow-500 border-0 border-s border-yellow-400 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : null}


      
      </div>
    </div>
  );
}
