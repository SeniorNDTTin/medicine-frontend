"use client";

import { Button, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Products() {
  const router = useRouter();

  const [id, setId] = useState("1");

  const handleClick = () => {
    router.push(`/products/detail/${id}`);
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

        <Row gutter={[16, 32]}>
          {[...Array(6)].map(item => (
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
                  <Meta title="Cây cỏ" description="Teen khoa hoc" />

                  <h3 style={{
                    color: "red",
                    fontWeight: "bold"
                  }}>100k</h3>

                  <div style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "end"
                  }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        // setId(item.id);
                        handleClick();
                      }}
                    >Detail</Button>
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