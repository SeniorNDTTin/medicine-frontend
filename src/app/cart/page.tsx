"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Image, Table } from "antd";
import GoBack from "@/components/ui/GoBack/page";
import { Typography } from 'antd';
const { Text } = Typography;

import { getProduct } from "@/services/product";

import { getCookie } from "@/helpers/cookies";
import { formatVND } from "@/helpers/formatCurrency";

function Cart() {
  const router = useRouter();

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
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

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
        <GoBack />

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Giỏ Hàng
        </h1>

        {cart.length ? (
          <>
            <Table dataSource={cart} columns={columns} />

            <h2 style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "green",
              textAlign: "end"
            }}>
              Tổng tiền: {formatVND(priceTotal)}
            </h2>

            <div style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px"
            }}>
              <Button
                type="primary"
                onClick={() => router.push("/order")}
              >
                Đặt hàng
              </Button>
            </div>
          </>
        ) : (
          <>
            <Text type="warning">Giỏ hàng trống</Text>
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default Cart;