"use client";

import React, { useEffect } from "react";

import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";

import GoBack from "@/components/ui/GoBack/page";
import { getProduct } from "@/services/product";
import { getType } from "@/services/type";
import Link from "next/link";
import Search from "antd/es/input/Search";
import { toast } from "react-toastify";
import { deleteCookie, getCookie, setCookie } from "@/helpers/cookies";

interface props {
  params: {
    id: string
  }
};

function ProductDetail(props: props) {
  const id = props.params.id;

  const product = {
    id: "1",
    name: "Cây cỏ",
    scientific_name: "Cây cỏ khoa học",
    other_name: "Cây rác",
    price: 1020,
    stock: 10,
    type: "Cây thuốc",
    origin: "Viet Nam",
    expiry: "2030-01-01",
    category_id: "M01"
  };

  // const [product, setProduct] = useState();

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const product = await getProduct(id);
  //     const type = await getType(product.category_id);
  //     product.type = type;

  //     setProduct(product);
  //   }
  //   fetchApi();
  // }, [id]);

  const handleAddToCart = (e: string) => {
    const quantity = parseInt(e);

    if (
      isNaN(quantity) ||
      quantity < 1
    ) {
      toast.error("Input you quantity is invalid.");
      return;
    }

    const string = getCookie("my_cart");
    if (string) {
      deleteCookie("my_cart");

      const myCart = JSON.parse(string);
      let check = false;
      for (const item of myCart) {
        if (item.product_id === product.id) {
          item.quantity += quantity;
          check = true;
          break;
        }
      }

      if (!check) {
        myCart.push({
          product_id: product.id,
          quantity: quantity
        });
      }

      setCookie("my_cart", JSON.stringify(myCart), 100);
    } else {
      const myCart = [{
        product_id: product.id,
        quantity: quantity
      }];
      setCookie("my_cart", JSON.stringify(myCart), 100);
    }

    toast.success("Add to cart success");
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
        }}>
          Product Detail
        </h1>

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {product && (
            <>
              <Card
                hoverable
                style={{
                  width: "50%"
                }}
                cover={
                  <img
                    alt={product.name}
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Meta
                  title={`Name: ${product.name}`}
                  description={`Scientific Name: ${product.scientific_name}`}
                />

                <h3 style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "10px"
                }}>
                  Price: {product.price}000 vnd
                </h3>

                <h3 style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "10px"
                }}>
                  Stock: {product.stock}
                </h3>

                <Link href={`/types/${product.category_id}`}>
                  <h4 style={{
                    color: "green",
                    fontWeight: "bold"
                  }}>
                    {product.type}
                  </h4>
                </Link>
              </Card>
            </>
          )}

          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <Search
              type="number"
              min={1}
              placeholder="input quantity"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={(e) => handleAddToCart(e)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductDetail;