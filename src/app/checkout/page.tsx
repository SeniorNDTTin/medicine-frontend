"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Image, Modal, Table } from "antd";
import GoBack from "@/components/ui/GoBack/page";

import { getProduct } from "@/services/product";

import { getCookie, setCookie } from "@/helpers/cookies";
import { toast } from "react-toastify";
import { generateVietQr } from "@/helpers/generate";

function Checkout() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    toast.success("Checkout success");
    router.push("/orders");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const [cart, setCart] = useState([]);
  // const [priceTotal, setPriceTotal] = useState(0);
  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const cart = [];
  //     const myCart = JSON.parse(getCookie("my_cart"));
  //     for (const item of myCart) {
  //       const product = await getProduct(item.product_id);

  //       const cartItem = {
  //         key: item.product_id,
  //         product_id: item.product_id,
  //         quantity: item.quantity,
  //         name: product.name,
  //         scientific_name: product.scientific_name,
  //         price: product.price,
  //       };

  //       cart.push(cartItem);
  //     }

  //     const priceTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  //     setCart(cart);
  //     setPriceTotal(priceTotal);
  //   }
  //   fetchApi();
  // }, []);

  const cart = [
    {
      key: "1",
      product_id: "1",
      quantity: 3,
      id: "1",
      name: "Cây cỏ",
      scientific_name: "Cây cỏ khoa học",
      price: 1020,
      stock: 10
    },
    {
      key: "2",
      product_id: "2",
      quantity: 2,
      id: "2",
      name: "Cây lài",
      scientific_name: "Cây lài khoa học",
      price: 1010,
      stock: 10
    }
  ];
  const priceTotal = 2000;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Scientific name',
      dataIndex: 'scientific_name',
      key: 'scientific_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    }
  ];

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <Modal
          title="VietQR Checkout"
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
                generateVietQr(1000,
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
          Checkout
        </h1>

        <Table dataSource={cart} columns={columns} />

        <h2 style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: "green",
          textAlign: "end"
        }}>
          Price Total: {priceTotal}000 vnd
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
            Open QR
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Checkout;