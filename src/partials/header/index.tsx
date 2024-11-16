'use client';

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GiMedicinePills } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

import "./header.css";
import { Button, Dropdown, MenuProps } from "antd";
import { getTypes } from "@/services/type";

function Header() {
  const router = useRouter();

  const [types, setTypes] = useState<any>({ items: [] });

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTypes();
      const menuItems = result.map((item: any, index: number) => ({
        key: index + 1,
        label: (
          <Link href={`/types/detail/${item.id}`}>
            {item.name}
          </Link>
        ),
      }));
      setTypes({ items: menuItems });
    };
    fetchApi();
  }, []);

  const handleLinkToHome = () => {
    router.push('/');
  }

  const handleLinkType = () => {
    router.push("/types");
  }

  const handleLinkCart = () => {
    router.push("/cart");
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="header-logo" onClick={handleLinkToHome}>
          <div className="header-icon">
            <GiMedicinePills />
          </div>
          <div className="header-content">
            THMs Medicine
          </div>
        </div>
        <div className="header-menu" style={{
          width: "70%"
        }}>
          <ul style={{
            display: "flex",
            alignItems: "center"
          }}>
            <li>
              <Link href="/products">Sản phẩm</Link>
            </li>
            <li>
              {types.items.length > 0 && (
                <Dropdown menu={{ items: types.items }} placement="bottomLeft">
                  <Button onClick={handleLinkType}>Loại</Button>
                </Dropdown>
              )}
            </li>
          </ul>
        </div>
        <div className="header-cart">
          <FaShoppingCart
            style={{
              fontSize: "25px"
            }}
            onClick={handleLinkCart}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header;