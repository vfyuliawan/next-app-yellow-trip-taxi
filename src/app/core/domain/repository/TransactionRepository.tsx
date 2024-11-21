import { get } from "../../api/api";
import { ConvertGetModelResponseData, GetModelResponseData } from "../model/Response/GetModelResponseData";

class TransactionRepository {
    constructor() {
        
    }
    async getDetailTransaction  (props: GetModelRequestData): Promise<GetModelResponseData | null>  {
      console.log(props.pageSize);
      
        const res = await get({ 
            path: "/api/taxi-trips",
            params: {
              vendor_id: props.vendor_id ?? "",
              payment_type: props.payment_type ?? "",
              passenger_count: props.passenger_count ,
              pickup_datetime_end: props.pickup_datetime_end,
              pickup_datetime_start: props.pickup_datetime_start,
              page: props.page,
              pageSize:props.pageSize
            } as GetModelRequestData,
            isNeedToken: true 
          });              
          if (res != null) {
            const result =
            ConvertGetModelResponseData.toGetModelResponseData(res);
              return result;
          }
          return null;
       
      };
  
}


export default new TransactionRepository();