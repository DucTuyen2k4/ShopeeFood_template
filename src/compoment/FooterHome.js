import { faFacebook, faInstagram } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/FooterHome.css';

import React from 'react'

export default function FooterHome() {
    return (
        <div>
            <footer cqlassName="main-footer">
                <div className="container">
                    <div className="container-inner">
                        <div className="block-footer">
                            <p className="title-block">Công ty</p>
                            <ul className="menu-footer">
                                <li className="menu-item">
                                    <a href="/gioi-thieu">Giới thiệu</a>
                                </li>
                                <li className="menu-item">
                                    <a
                                         href="https://help.shopeefood.vn/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Trung tâm Trợ giúp
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a href="/regulation-web">Quy chế</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/terms-of-service">Điều khoản sử dụng</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/security-policy">Bảo mật thông tin</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/adjustment-of-claims">Giải quyết khiếu nại</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/lien-he">Liên hệ</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/tuyen-dung">Hợp tác nhân viên giao nhận</a>
                                </li>
                                <li className="menu-item">
                                    <a href="/merchant-register">Đăng ký quán</a>
                                </li>
                                <li className="menu-item">
                                    <a href="https://merchant.shopeefood.vn/edu/">ShopeeFood Uni</a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href="https://shopee.vn/blog/"
                                        target="_blank"
                                    >
                                        Shopee Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="block-footer">
                            <p className="title-block">Ứng dụng ShopeeFood</p>
                            <a
                                className="apps"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                href="https://itunes.apple.com/us/app/deliverynow/id1137866760"
                                title="Down app iOS"
                            >
                                <span className="apps__app-store-vi" title="Down app iOS" />
                            </a>
                            <a
                                className="apps"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                href="https://play.google.com/store/apps/details?id=com.deliverynow"
                                title="Down app Android"
                            >
                                <span className="apps__play-store-vi" title="Down app Android" />
                            </a>
                            <a
                                className="apps"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                href="https://appgallery.huawei.com/#/app/C102401853"
                                title="Down app Huawei Gallery"
                            >
                                <span className="apps__huawei-gallery-vi" title="Down app Huawei" />
                            </a>
                        </div>
                        <div className="block-footer txt-center">
                            <div className="logo-footer">
                                <a className="link" href="/">
                                    <img
                                        id="delivery-footer-logo"
                                        src="https://shopeefood.vn/app/assets/img/Logo-ShopeefoodVN.png?a233b36c37415f85f46c25a6cd0963aa"
                                        alt="Đặt món trực tuyến giao hàng tận nơi"
                                        title="Đặt món trực tuyến giao hàng tận nơi"
                                        width={100}
                                    />
                                </a>
                            </div>
                            <p className="font12">© 2024 ShopeeFood</p>

                        </div>
                        <div className="block-last">
                            <p className="title-block">Địa chỉ công ty</p>
                            <span>
                                <p className='title-text'>Công Ty Cổ Phần Foody</p>
                                <p className='title-text'>Lầu G, Tòa nhà Jabes 1,</p>
                                <p className='title-text'>số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM</p>
                                <p className='title-text'>Giấy CN ĐKDN số: 0311828036</p>
                                <p className='title-text'>do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012,</p>
                                <p className='title-text'>sửa đổi lần thứ 23, ngày 10/12/2020</p>
                                <p className='title-text'>Chịu trách nhiệm quản lý nội dung: Nguyễn Hồ Quảng Giang</p>
                                <p className='title-text'>Điện thoại liên hệ: 028 71096879</p>
                                <p>
                                    Email:{" "}
                                    <a href="mailto:support@shopeefood.vn">support@shopeefood.vn</a>
                                </p>
                            </span>
                            <span className="registered">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=22747"
                                    title="ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG"
                                >
                                    <img
                                        alt="ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG"
                                        src="https://shopeefood.vn/app/assets/img/gov_seals1.jpg?4534b28245a7aad9805fbddc90f873d8"
                                    />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div id="footer-bottom" />
            </footer >
        </div >
    )
}