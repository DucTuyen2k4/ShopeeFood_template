import React from 'react'
import '../css/HeadHome.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function HeadHome() {
    const [citys, setCity] = useState([]);
    const [category, setCategory] = useState([]);
    const [listShop, setListShop] = useState([]);

    async function getListCites() {
        const response = await axios.get(`http://localhost:8080/api/cities`);
        setCity(response.data);
    }
    async function getListCategory() {
        const response = await axios.get(`http://localhost:8080/api/categories`);
        setCategory(response.data);
    }
    async function searchShopByIdCity(idCity) {
        const response = await axios.get(`http://localhost:8080/api/categories/idCity/${idCity}`);
        console.log(response.data);
        setCategory(response.data)
    }
    useEffect(() => {
        getListCategory();
        getListCites();
    }, []);
    return (
        <div className='wrapper'>
            <header className='main-header'>
                <div class="container-header">
                    <div className='container'>
                        <div className='header-content navbar row  justify-content-between align-items-center'>
                            <div className='logo-now col-auto'>
                                <span>
                                    <Link to={'/'}> <img className='imgLogo' src='https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7'></img></Link>
                                </span>
                            </div>
                            <div className='selectLocal col-auto'>
                                <div className='dropdown'>
                                    <button class="dropdown-toggle" type="button" id="local-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Hà Nội
                                    </button>
                                    <div class="dropdown-content">
                                        {citys.map((city) => (
                                            <span><button onClick={() => searchShopByIdCity(city.id)} type='button' class="dropdown-item" > {city.name}</button></span>

                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='main-nav col'>
                                {category.map((category) => (
                                    <div className='nav-item'>{category.name}</div>

                                ))}
                            </div>
                            <div className='user-acc col-auto'>
                                <div className='dropdown'>
                                    <div class="dropdown-toggle" role="button" id="local-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <div className='img'>
                                            <img src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'></img>
                                        </div>
                                        <span className='name'>Người dùng</span>
                                    </div>
                                    <div className='dropdown-content'>
                                        <span><Link to={`/ListOrderUser/1`} class="dropdown-item" href="#">Đơn hàng</Link></span>
                                        <span><a class="dropdown-item" href="#">Lịch sử đơn hàng </a></span>
                                        <span><a class="dropdown-item" href="#">Chỉnh sửa thông tin </a></span>
                                        <span><a class="dropdown-item" href="#">Đăng Suất</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header_right">
                    <span class="me-5"></span>
                </div>

            </header>
        </div>
    )
}