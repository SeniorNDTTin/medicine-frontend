"use client";

import GoBack from "@/components/ui/GoBack/page";
import { formatVND } from "@/helpers/formatCurrency";
import { getProducts } from "@/services/product";
import { getType } from "@/services/type";
import { Button, Card, Col, Image, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface props {
  params: {
    id: string
  }
};

function TypeDetail(props: props) {
  const id = props.params.id;

  const router = useRouter();

  const [type, setType] = useState<any>();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const type = await getType(id);
      const products = await getProducts();

      const newProducts = products.filter((item: any) => item.category_id === id);

      setType(type);
      setProducts(newProducts);
    }
    fetchApi();
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const handleClick = (id: string) => {
    router.push(`/products/detail/${id}`);
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <GoBack />

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>Chi Tiết Loại</h1>

        {type && (
          <>
            <Title level={2}>Loại: {type.name}</Title>
            <Title level={4}>Mô tả: {type.description}</Title>
          </>
        )}

        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          marginTop: "30px",
          fontWeight: "bold"
        }}>Danh Sách Sản Phẩm</h1>

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
                    />
                  }
                >
                  <Meta
                    title={item.name}
                    description={item.scientific_name}
                    style={{
                      height: "100px"
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
    </React.Fragment>
  )
}

export default TypeDetail;