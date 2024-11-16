"use client";

import React, { useEffect, useState } from "react";

import { Button, Card, Image } from "antd";
import Meta from "antd/es/card/Meta";

import GoBack from "@/components/ui/GoBack/page";
import { getProduct } from "@/services/product";
import { getType } from "@/services/type";
import Link from "next/link";
import Search from "antd/es/input/Search";
import { toast } from "react-toastify";
import { deleteCookie, getCookie, setCookie } from "@/helpers/cookies";
import { formatVND } from "@/helpers/formatCurrency";

interface props {
  params: {
    id: string
  }
};

function ProductDetail(props: props) {
  const id = props.params.id;

  const [product, setProduct] = useState<any>();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const product = await getProduct(id);
      const type = await getType(product.category_id);
      product.type = type;

      setProduct(product);
    }
    fetchApi();
  }, [id]);

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
          Chi Tiết Sản Phẩm
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
                  <Image
                    alt={product.name}
                    src={product.image}
                  />
                }
              >
                <Meta
                  title={`Tên: ${product.name}`}
                  description={`Tên khoa học: ${product.scientific_name}`}
                />

                <h3 style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "10px"
                }}>
                  Giá: {formatVND(product.price)}
                </h3>

                <h3 style={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: "10px"
                }}>
                  Số lượng: {product.stock}
                </h3>

                <Link href={`/types/${product.category_id}`}>
                  <h4 style={{
                    color: "green",
                    fontWeight: "bold"
                  }}>
                    {product.type ? product.type.name : ""}
                  </h4>
                </Link>
              </Card>
            </>
          )}

          {product && (
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Search
                type="number"
                min={1}
                max={product.stock}
                placeholder="Số lượng"
                allowClear
                enterButton="Thêm vào giỏ hàng"
                size="large"
                onSearch={(e) => handleAddToCart(e)}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductDetail;