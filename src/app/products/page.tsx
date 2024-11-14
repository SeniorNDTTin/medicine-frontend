"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

import { getProducts } from "@/services/product";
import Search from "antd/es/input/Search";

function Products() {
  const router = useRouter();

  const [dataSource, setDataSource] = useState([
    {
      id: "1",
      name: "Cây cỏ",
      scientific_name: "Cây cỏ khoa học",
      price: 1020,
      stock: 10
    },
    {
      id: "2",
      name: "Cây lài",
      scientific_name: "Cây lài khoa học",
      price: 1010,
      stock: 10
    },
    {
      id: "3",
      name: "Cây đu đủ",
      scientific_name: "Cây đủ khoa học",
      price: 15360,
      stock: 10
    }
  ]);
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Cây cỏ",
      scientific_name: "Cây cỏ khoa học",
      price: 1020,
      stock: 10
    },
    {
      id: "2",
      name: "Cây lài",
      scientific_name: "Cây lài khoa học",
      price: 1010,
      stock: 10
    },
    {
      id: "3",
      name: "Cây đu đủ",
      scientific_name: "Cây đủ khoa học",
      price: 15360,
      stock: 10
    }
  ]);

  useEffect(() => {
    const fetchApi = async () => {
      const products = await getProducts();

      setDataSource(products);
      setProducts(products);
    }
    fetchApi();
  }, []);

  const [id, setId] = useState("1");

  const handleClick = () => {
    router.push(`/products/detail/${id}`);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setProducts(dataSource);
      return;
    }

    const regex = new RegExp(value, "i");
    const products = dataSource.filter(item => regex.test(item.name));
    setProducts(products);
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>Products</h1>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            style={{
              width: "50%"
            }}
            onChange={(e) => handleChange(e)}
          />
        </div>


        <Row gutter={[16, 32]}>
          {products.length && products.map(item => (
            <>
              <Col span={6}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Meta
                    title={item.name}
                    description={item.scientific_name}
                  />

                  <h3 style={{
                    color: "red",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}>
                    Price: {item.price}000 vnd
                  </h3>
                  <h3 style={{
                    color: "red",
                    fontWeight: "bold"
                  }}>
                    Stock: {item.stock}
                  </h3>

                  <div style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "end"
                  }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        setId(item.id);
                        handleClick();
                      }}
                    >
                      Detail
                    </Button>
                  </div>
                </Card>
              </Col>
            </>
          ))
          }
        </Row >
      </div>
    </React.Fragment >
  )
}

export default Products;