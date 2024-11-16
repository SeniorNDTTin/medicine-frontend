"use client";

import { getTypes } from "@/services/type";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Types() {
  const router = useRouter();

  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const types = await getTypes();
      setTypes(types);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const handleLinkDetail = (id: string) => {
    router.push(`/types/detail/${id}`);
  }

  return (
    <React.Fragment>
      <div style={{ padding: '0 50px', marginTop: 64, marginBottom: 64 }}>
        <h1 style={{
          fontSize: "48px",
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}>Loại</h1>

        <Row gutter={[16, 32]}>
          {types.length && (types.map((item: any) => (
            <>
              <Col
                span={6}
                onClick={() => {
                  handleLinkDetail(item.id);
                }}
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                >
                  <Meta
                    title={item.name}
                  />
                </Card>
              </Col>
            </>
          )))}
        </Row >
      </div >
    </React.Fragment>
  )
}

export default Types;