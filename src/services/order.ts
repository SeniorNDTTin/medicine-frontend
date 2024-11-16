import { patch, post } from "@/utils/request"

export const createOrder = async (
  orderDate: string,
  fullName: string,
  phone: string,
  address: string,
  totalPrice: number,
  status: string
) => {
  const order = await post("orders/create", {
    order_date: orderDate,
    full_name: fullName,
    phone: phone,
    address: address,
    total_price: totalPrice,
    status: status
  });
  return order;
}

export const updateStatus = async (id: string, status: string) => {
  const order = await patch("orders/update-status/", id, {
    status: status
  });
  return order;
}