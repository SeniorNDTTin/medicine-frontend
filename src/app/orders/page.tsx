"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Image, Modal, Table } from "antd";
import GoBack from "@/components/ui/GoBack/page";

import { getProduct } from "@/services/product";

function Order() {
  const router = useRouter();

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

  const columns = [
    {
      title: 'Order code',
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
        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Orders
        </h1>

        <Table dataSource={cart} columns={columns} />
      </div>
    </React.Fragment>
  )
}

export default Order;