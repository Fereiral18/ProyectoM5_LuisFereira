import { useContext } from "react";
import { OrdersContext } from "../providers/OrderProvider";


export const useOrders = () => {
  return useContext(OrdersContext);
};