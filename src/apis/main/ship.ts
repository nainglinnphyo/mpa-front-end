import axios from "axios";
import { authJsonHeader, plainJsonHeader } from "../headers";

const URL = import.meta.env.VITE_APP_SERVER_URL;
export interface BLData {
     id: string;
     blNo: string;
     shipper: string;
     consigneeNotify: string;
     markAndNumber: string;
     product: string;
     quantity: number;
     unit: string;
     freightTon: number;
     totalFreight: number;
     rate: number;
     remark: string;
     createdDate: string;
}
export const fetchShipper = async (token: string) => {
     return await axios({
          url: `${URL}shipper/fetch`,
          method: "GET",
          headers: authJsonHeader(token),
     });
};

export const createShipArrival = async (token: any, data: any) => {

     return await axios({
          url: `${URL}ship/create-ship-arrival`,
          method: "POST",
          headers: authJsonHeader(token),
          data: data
     });
};

export const fetchBillOfLanding = async (token: any, id: any) => {
     const resData = await axios({
          url: `${URL}ship/fetch-bl-list/${id}`,
          method: "GET",
          headers: authJsonHeader(token)
     });
     if (resData.data.meta.success) {
          let temp: BLData[] = await resData.data.body.map((item: any) => ({
               id: item.id,
               blNo: item.blNo,
               shipper: item.Shipper.name,
               consigneeNotify: item.ConsigneeNotify,
               markAndNumber: item.markAndNumber,
               product: item.Product.name,
               quantity: item.quantity,
               unit: item.Unit.name,
               freightTon: item.productOfWeight,
               rate: item.rate,
               totalFreight: item.totalFreight,
               remark: item.remark,
               createdDate: item.created_at
          }));
          return temp
     }
};


