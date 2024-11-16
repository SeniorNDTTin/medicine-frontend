"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Form, Image, Input, Modal, Space, Table } from "antd";
import GoBack from "@/components/ui/GoBack/page";
import { Typography } from 'antd';
const { Text } = Typography;

import { getProduct, updateStockProduct } from "@/services/product";

import { deleteCookie, getCookie } from "@/helpers/cookies";
import { formatVND } from "@/helpers/formatCurrency";
import { toast } from "react-toastify";
import { createOrder } from "@/services/order";
import { createOrderDetail } from "@/services/orderDetail";

function Order() {
  const router = useRouter();

  const [button, setButton] = useState("order");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cart, setCart] = useState<any>([]);
  const [priceTotal, setPriceTotal] = useState(0);
  useEffect(() => {
    const fetchApi = async () => {
      const cart = [];
      const myCart = JSON.parse(getCookie("my_cart"));
      for (const item of myCart) {
        const product = await getProduct(item.product_id);

        const cartItem = {
          key: item.product_id,
          product_id: item.product_id,
          quantity: item.quantity,
          name: product.name,
          scientific_name: product.scientific_name,
          price: parseInt(product.price),
          image: product.image,
          stock: product.stock
        };

        cart.push(cartItem);
      }

      const priceTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

      setCart(cart);
      setPriceTotal(priceTotal);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const order = async () => {
    if (
      fullName === "" ||
      phone === "" ||
      address === ""
    ) {
      toast.error("Thông tin chưa đầy đủ!");
      return;
    }
    const date = new Date();
    const orderDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const order = await createOrder(
      orderDate,
      fullName,
      phone,
      address,
      priceTotal,
      "UNPAID"
    );
    const orderId = order.id;
    setOrderId(orderId);

    for (const item of cart) {
      await createOrderDetail(
        orderId,
        item.product_id,
        item.quantity
      );

      await updateStockProduct(
        item.product_id,
        item.stock - item.quantity
      );
    }

    setFullName("");
    setPhone("");
    setAddress("");
    setOrdered(true);

    setButton("checkout");

    toast.success("Đặt hàng thành công!");
  };
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Ảnh",
      key: "image",
      render: (_: any, record: any) => (
        <div style={{ width: "60%" }}>
          <Image
            src={record.image}
            alt={record.name}
            width={100}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên khoa học',
      dataIndex: 'scientific_name',
      key: 'scientific_name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    }
  ];

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <Modal title="Chọn hình thức thanh toán" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 0"
          }}>
            <Button
              type="default"
              style={{
                marginRight: "30px"
              }}
              onClick={() => {
                deleteCookie("my_cart");
                router.push("/products")
              }}
            >
              Thanh toán tiền mặt
            </Button>

            <Button
              type="primary"
              onClick={() => router.push(`/checkout/${orderId}`)}
            >
              Thanh toán online
            </Button>
          </div>
        </Modal>

        <GoBack />

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Đơn Hàng
        </h1>

        <Table dataSource={cart} columns={columns} />

        <h2 style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "green",
          textAlign: "end"
        }}>
          Tổng tiền: {formatVND(priceTotal)}
        </h2>

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Thông Tin Người Đặt
        </h1>

        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
          {!ordered ? (
            <Form
              name="basic"
              onFinish={() => { }}
              onFinishFailed={() => { }}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Họ và tên"
                style={{
                  width: "800px"
                }}
              >
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
              >
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
              >
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Form>
          ) : (
            <>
              <Space>
                <Text type="success">Bạn đã đặt hàng thành công</Text>
              </Space>
            </>
          )}
        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px"
        }}>
          <Button
            type="primary"
            onClick={() => {
              if (button === "order") {
                order();
              } else {
                showModal()
              }
            }}
          >
            {button === "order" ? "Đặt hàng" : "Thanh toán"}
          </Button>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Order;