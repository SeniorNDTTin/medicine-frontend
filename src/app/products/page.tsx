"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";

import { getProducts } from "@/services/product";
import Search from "antd/es/input/Search";
import { getType } from "@/services/type";
import { formatVND } from "@/helpers/formatCurrency";

function Products() {
  const router = useRouter();

  const [searchByName, setSearchByName] = useState("");
  const [searchByDisease, setSearchByDisease] = useState("");

  const [dataSource, setDataSource] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const products = await getProducts();

      for (const item of products) {
        const type = await getType(item.category_id);
        item.typeDetail = type;
      }

      setDataSource(products);
      setProducts(products);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const handleClick = (id: string) => {
    router.push(`/products/detail/${id}`);
  }

  const handleChangeByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByDisease("");
    
    const value = e.target.value;
    setSearchByName(value);

    if (value === "") {
      setProducts(dataSource);
      return;
    }

    const regex = new RegExp(value, "i");
    const products = dataSource.filter((item: any) => regex.test(item.name));
    setProducts(products);
  }

  const handleChangeByDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchByName("");
    
    const value = e.target.value;
    setSearchByDisease(value);

    if (value === "") {
      setProducts(dataSource);
      return;
    }

    const regex = new RegExp(value, "i");
    const products = dataSource.filter((item: any) => regex.test(item.typeDetail.description));
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
        }}>Danh Sách Sản Phẩm</h1>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}>
          <Search
            placeholder="Tìm kiếm theo tên"
            allowClear
            enterButton="Tìm"
            size="large"
            style={{
              width: "50%"
            }}
            value={searchByName}
            onChange={(e) => handleChangeByName(e)}
          />

        </div>

        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px"
        }}>
          <Search
            placeholder="Tìm kiếm theo bệnh tật"
            allowClear
            enterButton="Tìm"
            size="large"
            style={{
              width: "50%"
            }}
            value={searchByDisease}
            onChange={(e) => handleChangeByDisease(e)}
          />
        </div>

        <Row gutter={[16, 32]}>
          {products.length && products.map((item: any) => (
            <>
              <Col span={6}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      alt={item.name}
                      src={item.image}
                      style={{
                        width: "100%",
                        aspectRatio: "4/3",

                      }}
                    />
                  }
                >
                  <Meta
                    title={item.name}
                    description={item.scientific_name}
                    style={{
                      height: "110px"
                    }}
                  />

                  <h3 style={{
                    color: "red",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}>
                    Giá: {formatVND(item.price)}
                  </h3>
                  <h3 style={{
                    color: "red",
                    fontWeight: "bold"
                  }}>
                    Số lượng: {item.stock}
                  </h3>

                  <div style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "end"
                  }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      Xem
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