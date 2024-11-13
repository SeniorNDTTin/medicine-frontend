"use client";

import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

interface props {
  params: {
    id: string
  }
};

function ProductDetail(props: props) {
  const id = props.params.id;

  const handleAddToCart = () => {
    console.log("OK");
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>
          Product Detail
        </h1>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <Card
            hoverable
            style={{
              width: "50%"
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Name: Lá Cỏ" description="Scientific Name: ten khoa hoc" />

            <h3 style={{
              color: "red",
              fontWeight: "bold"
            }}>Price: 100k</h3>

            <p>Description: trị bệnh desc</p>
          </Card>

          <Button
            type="primary"
            style={{
              marginTop: "30px"
            }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductDetail;