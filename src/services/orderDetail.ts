import { post } from "@/utils/request"

export const createOrderDetail = async(
  orderId: number,
  productId: number,
  quantity: number
) => {
  const orderDetail = await post("orderdetails/create", {
    order_id: orderId,
    product_id: productId,
    quantity: quantity
  });
  return orderDetail;
}