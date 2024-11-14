"use client";

import { Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function Home() {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="home" style={{ marginTop: 64, marginBottom: 64 }}>
        <div className="intro">
          <div className="intro__image">
            <Row>
              <Col span={8} style={{
                padding: "0 30px"
              }}>
                <h1 className="intro__title">DỊCH VỤ CUNG CẤP CÂY SỐ 1 VIỆT NAM</h1>
                <p className="intro__desc">Được phục vụ bạn là niềm hạnh phúc của chúng tôi</p>
                <Button
                  type="primary"
                  onClick={() => router.push("/products")}
                >
                  Tìm bệnh của tôi
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home;