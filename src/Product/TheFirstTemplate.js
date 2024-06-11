import FooterHome from "../compoment/FooterHome";
import axios from 'axios';
import HeadHome from "../compoment/HeadHome";
import { faTags, faAngleRight, faArrowRightLong, faMagnifyingGlass, faHouse, faBriefcase, faLocationDot, faWallet, faMoneyBill, faMoneyCheckDollar, faBuildingColumns, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/TheFirst.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
export default function TheFirstTemplate() {
    const imageUrl = 'https://shopeefood.vn/app/assets/img/main-banner.jpg?45bff8c9ec408a5ba51f9fdef662324e';
    const imageIcon = 'https://shopeefood.vn/app/assets/img/bg-icon.png?2404d5c158d1d09104c34443b2fd5f44';
    const [shop, setShop] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        showShop();
    }, []);

    const showShop = async () => {
        const result = await axios.get("http://localhost:8080/api/shops");
        setShop(result.data);
    };

    const handleSearch = useCallback(async () => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const result = await axios.get(`http://localhost:8080/api/shops/findShopByName?name=${searchQuery}`);
        setSearchResults(result.data.slice(0, 6)); // Limit to 6 results
    }, [searchQuery]);

    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        debouncedSearch();
    };

    const debouncedSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

    return (
        <>
            <HeadHome />
            <div className="now-banner ver_vi" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="container-hiha">
                    <div className="now-search">
                        <div>
                            <h1 className="title">Đặt Đồ ăn, giao hàng từ 20'...</h1>
                            <div className="local">có 45944 địa điểm ở Hà Nội từ 00:00 - 23:59</div>
                        </div>
                        <div className="form-search">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm địa điểm, món ăn, địa chỉ..."
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                />
                                <div className="input-group-append">
                                    <button className="mybutton" onClick={handleSearch}>
                                        <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="now-idea-searching">
                            {searchResults.length > 0 && (
                                <div className="now-list-restaurant-row">
                                    {searchResults.map((item) => (
                                        <div className="item-restaurantcc" key={item.id}>
                                            <Link to={`/HomeProduct/${item.id}`} className="item-contentcc">
                                                <div className="img-restaurantcc">
                                                    <img className="img-smallcc" src={`http://localhost:8080/img/${item.image}`} alt={item.name} />
                                                </div>
                                                <div className="info-restaurantcc">
                                                    <div className="info-basic-ress">
                                                        <h4 className="name-ressc" title={item.name}>{item.name} - {item.idCategory.name}</h4>
                                                        <div class="address-rescc">{item.address}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="category-list-filter">
                            <a className="haha" href="#">
                                <Link to="/" className="category-item">All</Link>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Đồ ăn</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Đồ uống</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Đồ chay</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Bánh kem</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Tráng miệng</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Homemade</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Vỉa hè</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Pizza</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Món gà</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Món lẩu</span>
                            </a>
                            <a className="haha" href="#">
                                <span className="category-item">Sushi</span>
                            </a>
                        </div>
                        <div>
                            <div className="font18 mb-2 mt-3">
                                Sử dụng App ShopeeFood để có nhiều giảm giá
                                <br />
                                và trải nghiệm tốt hơn
                            </div>
                            <a target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/us/app/deliverynow/id1137866760" title="App Store">
                                <span style={{ backgroundImage: `url(${imageIcon})` }} className="icon-app-store-big"></span>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=com.deliverynow" title="Google play">
                                <span style={{ backgroundImage: `url(${imageIcon})` }} className="icon-gg-play-big"></span>
                            </a>
                        </div>
                    </div>
                    <div className="main-right-home">
                        <div className="user-get-local">
                            <div className="row align-items-center no-gutters pointer">
                                <div className="col-auto">
                                    <span className="txt-blue txt-bold">Đồ ăn</span>
                                    <FontAwesomeIcon className=" ml-2 font12" icon={faArrowRightLong} />
                                </div>
                                <div className="col pl-2 pr-2 txt-elipsis">QL32, Đức Giang, Hoài Đức, Hoài Đức, Hà Nội</div>
                                <div className="col-auto">
                                    <span className="pl-2 pr-2 link" data-toggle="modal">
                                        <FontAwesomeIcon className="txt-gray-7" icon={faAngleRight} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="now-list-restaurant">
                            <div className="title-wrapper">
                                <h2 className="title1">Ưu đãi</h2>
                            </div>
                            {shop.slice(0, 9).map(item => ( // Limit to 9 results
                                <div className="item-restaurants" key={item.id}>
                                    <Link to={`/HomeProduct/${item.id}`} className="item-content">
                                        <div className="img-restaurant">
                                            <img className="img-smalls" src={`http://localhost:8080/img/${item.image}`} alt="Sample Image from Unsplash" />
                                        </div>
                                        <div className="info-restaurants">
                                            <div className="info-basic-ress">
                                                <h4 className="name-ress" title={item.name}>{item.name} - {item.idCategory.name}</h4>
                                                <div className="address-res" title={item.address}>{item.address}</div>
                                            </div>
                                            <p className="content-promotionss">
                                                <FontAwesomeIcon className="fas fa-tag" icon={faTags} /> Giảm món
                                            </p>
                                            <div className="opentime-statuss">
                                                <span className="stt" title="Mở cửa"></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome />
        </>
    );
}