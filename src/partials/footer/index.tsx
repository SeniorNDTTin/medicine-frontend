"use client";

import React from "react";

import Link from "next/link";

import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";

import "./footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer className="footer">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Title
              level={2}
              style={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              THMs Medicine
            </Title>
            <Title
              level={3}
              style={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              Đỉnh cao chữa bệnh
            </Title>
            <Title
              level={3}
              style={{
                color: "white",
                fontWeight: "bold"
              }}
            >
              Công thức gia truyền
            </Title>

            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24459.037559068438!2d105.47827872440728!3d10.218408903479212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a09e751463f6cd%3A0xdd348a9d28518e8b!2zVHJ1bmcgQW4sIEPhu50gxJDhu48sIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1731553223315!5m2!1svi!2s"
                width="80%"
                height="60%"
                loading="lazy"
              />
            </div>
          </Col>

          <Col span={8}>
            <div className="contact">
              <Link className="contact__link" href="https://vi-vn.facebook.com/">
                <div className="contact__icon">
                  <FaFacebookF />
                </div>
              </Link>
              <Link className="contact__link" href="https://www.instagram.com/ ">
                <div className="contact__icon">
                  <CiInstagram />
                </div>
              </Link>
              <Link className="contact__link" href="https://www.youtube.com/">
                <div className="contact__icon">
                  <FaYoutube />
                </div>
              </Link>
            </div>
          </Col>

          <Col span={8} style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <p style={{
              textAlign: "justify"
            }}>Bạn đang tìm kiếm địa điểm uy tín để chọn mua thuốc nam? Bạn lo lắng khi ngoài kia có rất nhiều địa điểm bán thuốc nam không an toàn như quảng cáo. Đến ngay với THMs Medicine </p>
          </Col>
        </Row>
      </footer>
    </React.Fragment>
  )
}

export default Footer;