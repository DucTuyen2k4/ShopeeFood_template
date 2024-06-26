import React, { useState, useEffect } from 'react';
import '../css/HeadHome.css';
import '../css/responerSize.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function HeadHome() {
    const [citys, setCity] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ id: null, name: 'Select City' });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isDropdownVisibles, setDropdownVisibles] = useState(false);
    async function getListCites() {
        const response = await axios.get(`http://localhost:8080/api/cities`);
        setCity(response.data);
        if (response.data.length > 0) {
            setSelectedCity(response.data[0]);
        }
       
    }

    async function getListCategory() {
        const response = await axios.get(`http://localhost:8080/api/categories`);
        setCategory(response.data);
        setSelectedCategory(response.data);
   
    }

    async function searchShopByIdCity(city) {
        setSelectedCity(city);
        const response = await axios.get(`http://localhost:8080/api/categories/idCity/${city.id}`);
        setCategory(response.data);
        setSelectedCategory(response.data);
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        console.log(`Category with id ${category.id} was clicked`);
    };

    useEffect(() => {
        getListCategory();
        getListCites();
    }, []);

    useEffect(() => {
        if (category.length > 0) {
            setSelectedCategory(category[0]);
        }
    }, [category]);
    useEffect(() => {
        if (selectedCity && selectedCity.id) {
            searchShopByIdCity(selectedCity); // Fetch categories based on the initially selected city
        }
    }, [selectedCity]);
    const toggleDropdowns = () => {
        setDropdownVisibles(!isDropdownVisibles);
    };


    return (
        <div className='wrapper'>
            <header className='main-header'>
                <div className="container-header">
                    <div className='header-content navbar row justify-content-between align-items-center'>
                        <div className='logo-now col-auto'>
                            <span>
                                <Link to={'/'}>
                                    <img className='imgLogo' src='https://shopeefood.vn/app/assets/img/shopeefoodvn.png?4aa1a38e8da801f4029b80734905f3f7' alt='logo' />
                                </Link>
                            </span>
                        </div>
                        <div className='selectLocal col-auto'>
                            <div className='dropdown'>
                                <button className="dropdown-toggle"  type="button" >
                                    {selectedCity.name}
                                </button>
                                {isDropdownVisible && (
                                    <ul>
                                        {citys.map((city) => (
                                            <li key={city.id} onClick={() => setSelectedCity(city)}>
                                                {city.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="dropdown-content">
                                    {citys.map((city) => (
                                        <span key={city.id}>
                                            <button onClick={() => searchShopByIdCity(city)} type='button' className="dropdown-item">
                                                {city.name}
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='main-nav col'>
                            {category.map((categoryItem, index) => (
                                <button
                                    className='nav-item'
                                    key={categoryItem.id}
                                    onClick={() => handleCategoryClick(categoryItem)}
                                    style={{
                                        marginLeft: index === 0 ? '50px' : '10px',
                                        color: selectedCategory && selectedCategory.id === categoryItem.id
                                            ? '#ee4d2d'
                                            : '#252525',
                                        fontWeight: selectedCategory && selectedCategory.id === categoryItem.id ? 'bold' : 'normal',
                                        fontSize: selectedCategory && selectedCategory.id === categoryItem.id ? '16.5px' : 'inherit',
                                        borderBottom: selectedCategory && selectedCategory.id === categoryItem.id
                                            ? '2px solid #ee4d2d'
                                            : 'none',
                                        padding: '10px 12px',
                                        fontFamily: 'Noto Sans, Arial, sans-serif',
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        // fontSize: 'inherit',

                                    }}
                                >
                                    {categoryItem.name}
                                </button>
                            ))}
                        </div>
                        <div className='user-acc col-auto'>
                            <div className='dropdown-user'>
                                <div
                                    className="dropdown-toggle-user"
                                    role="button"
                                    id="local-dropdown"
                                    onClick={toggleDropdowns}
                                    aria-haspopup="true"
                                    aria-expanded={isDropdownVisibles}
                                >
                                    <div className='img'>
                                        <img src='https://hienthao.com/wp-content/uploads/2023/05/51a95a0ad2c1af443c46eb588aad6f98.jpg' alt='user' />
                                    </div>
                                    <span className='name'>&nbsp;&nbsp;Người dùng</span>
                                </div>
                                {isDropdownVisibles && (
                                    <div className='dropdown-content-user'>
                                        <span><Link to={`/ListOrderUser/1`} className="dropdown-item"><img className='img-icon' src='https://e7.pngegg.com/pngimages/556/171/png-clipart-kawasaki-of-salina-maintenance-computer-repair-technician-installation-computer-electronics-service-thumbnail.png'></img> Đơn hàng</Link></span>
                                        <span><a className="dropdown-item" href="#">Lịch sử đơn hàng</a></span>
                                        <span><a className="dropdown-item" href="#">Chỉnh sửa thông tin</a></span>
                                        <span><a className="dropdown-item" href="#">Đăng Suất</a></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header_right">
                    <span className="me-5"></span>
                </div>
            </header>
        </div>
    );
}
