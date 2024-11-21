import axios from 'axios';

// const BASE_URL = "http://localhost:3006/customers";
// // const BASE_URL:string | undefined =process.env.REACT_APP_API_URL;

interface Customer {
    customerId: number;
    name: string;
    city: string;
    contactNumber: string;
    year: number;
    photo: string;
    totalPurchasesPerYear: number;
  }
// alert("", )


// const getAllCust  =  async ():Promise<Customer[]> => {
//     // const response = await axios.get<Customer[]>(`${BASE_URL}?_sort=deptno`);
//    const response = await axios.get<Customer[]>(`${BASE_URL}`);
//     return response.data;
// };



// // export interface Dept{
// //     deptno:number;
// //     dname:string;
// //     loc:string
// // }


const BASE_URL = "http://localhost:3006/customers";



const getAllCust = async (): Promise<Customer[]> => {
  try {
    const response = await axios.get<Customer[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    return [];
  }
};
const getTop5Cust = async (sortOrder: "asc" | "desc" = "desc"): Promise<Customer[]> => {
  try {
    const response = await axios.get<Customer[]>(`${BASE_URL}?_sort=totalPurchasesPerYear&_order=${sortOrder}&_limit=5`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top 5 customer data:", error);
    return [];
  }
};

const createCust = async (custObj:Customer): Promise<Customer> => {
    const response = await axios.post<Customer>(`${BASE_URL}`, custObj);
    return response.data;
  };

const updateCust=async (custObj:Customer): Promise<Customer> => {
  const response= await axios.put<Customer>(`${BASE_URL}/${custObj.customerId}`,custObj )
  return response.data;
}

const deleteCust=async(id:number):Promise<void>=>{
  await axios.delete(`${BASE_URL}/${id}`)
  
}
export const CustServices = {
    getAllCust,createCust,updateCust,deleteCust,getTop5Cust
}
// --    getAllDepartments,
//     getDeptById,
//  --   createDept,
//   --  updateDept,
//   -- deleteDept
// };
