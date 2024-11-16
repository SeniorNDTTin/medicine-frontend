"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Image, Modal, Table } from "antd";
import GoBack from "@/components/ui/GoBack/page";

import { getProduct } from "@/services/product";

import { deleteCookie, getCookie } from "@/helpers/cookies";
import { toast } from "react-toastify";
import { generateVietQr } from "@/helpers/generate";
import { formatVND } from "@/helpers/formatCurrency";
import { updateStatus } from "@/services/order";

interface props {
  params: {
    id: string
  }
};

function Checkout(props: props) {
  const orderId = props.params.id;

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);

    await updateStatus(orderId, "PAID");

    deleteCookie("my_cart");

    toast.success("Checkout success");
    router.push("/products");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

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
          image: product.image
        };

        cart.push(cartItem);
      }

      const priceTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

      setCart(cart);
      setPriceTotal(priceTotal);
    }
    fetchApi();
  }, [orderId]);

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
        <Modal
          title="Mã QR chuyển khoản"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 0"
          }}>
            <Image
              src={
                generateVietQr(
                  priceTotal,
                  "thanh%20toan",
                  "Nguyen%20Duong%20Trong%20Tin"
                )
              }
              alt="Vietqr"
            />
          </div>
        </Modal>

        <GoBack />

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Thanh Toán Online
        </h1>

        <Table dataSource={cart} columns={columns} />

        <h2 style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "green",
          textAlign: "end"
        }}>
          Tổng Tiền: {formatVND(priceTotal)}
        </h2>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px"
        }}>
          <Button
            type="primary"
            onClick={() => showModal()}
          >
            Mở mã QR
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout;