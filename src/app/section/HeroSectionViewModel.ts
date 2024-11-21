// import { useEffect, useState } from "react"
// import TransactionRepository from "../core/domain/repository/TransactionRepository"
// import { DataTransaction } from "../core/domain/model/Response/GetModelResponseData"

// export const HeroSectionViewModel =() =>{

//     const [dataTransaction, setDataTransaction] = useState<DataTransaction[]>([])

//     const getDetail = async() =>{
//         const res = await TransactionRepository.getDetailTransaction({
//             vendor_id:"CMT",
//             payment_type: 'CRD'
//         })
//         if (res !== null) {
//             setDataTransaction(res.data)
//         }
//     }

//     useEffect(() => {
//         getDetail()
      
    
//       return () => {
        
//       }
//     }, [])
    

//     return{

//         dataTransaction,
//         setDataTransaction
//     }
// }