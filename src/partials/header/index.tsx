'use client'

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GiMedicinePills } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

import "./header.css";
import { Button, Dropdown, MenuProps } from "antd";
import Search from "antd/es/input/Search";

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link href="https://www.antgroup.com">
        Danh mục 1
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link href="https://www.antgroup.com">
        Danh mục 2
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link href="https://www.antgroup.com">
        Danh mục 3
      </Link>
    ),
  },
];

function Header() {
  const router = useRouter();

  const handleLinkToHome = () => {
    router.push('/');
  }

  const handleLinkType = () => {
    router.push("/types");
  }

  const handleSearch = (e: string) => {
    if (e === "") {
      return;
    }

    console.log(e);
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
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button onClick={handleLinkType}>Types</Button>
              </Dropdown>
            </li>
            <li>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={(e) => handleSearch(e)}
              />
            </li>
          </ul>
        </div>
        <div className="header-cart">
          <FaShoppingCart style={{
            fontSize: "25px"
          }} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Header;