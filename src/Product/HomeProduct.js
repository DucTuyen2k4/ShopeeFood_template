import React, { useEffect, useRef, useState } from 'react';
import HeadHome from '../compoment/HeadHome';
import '../css/LayoutHome.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faDuotoneHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faRegularHeart, faStar, faClock, faStarHalfStroke, faMagnifyingGlass, faSadTear, faSackDollar, faPhone, faLocationDot, faEnvelope, faWallet } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import OrderAndListOrderItem from './OrderAndListOrderItem';
import { Link } from 'react-router-dom';
import FooterHome from '../compoment/FooterHome';
import ModalDetailProduct from "./ModalDetailProduct";

export default function HomeProduct() {
    const navigate = useNavigate();
    const params = useParams();
    const [allMenusRendered, setAllMenusRendered] = useState(false);
    const [menuProducts, setMenuProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [idShop, setIdShop] = useState(11);
    const [idUser, setIdUser] = useState(1);
    const [cart, setCart] = useState([]);
    const [product, setProduct] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [selectedCityId, setSelectedCityId] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [menus, setMenus] = useState([]);
    const [sum, setSum] = useState(0);
    const [noResults, setNoResults] = useState(false);
    const [likedProducts, setLikedProducts] = useState({});
    const [idMenu, setIdMenu] = useState(null);
    const menuRefs = useRef([]);
    const [showDetailProduct, setShowDetailProduct] = useState(false);
    const [idDetailProduct, setIdDtailProduct] = useState();
    async function getProduct() {
        const response = await axios.get(`http://localhost:8080/api/shops/${params.id}`);
        setProduct(response.data);
        setName(response.data.name);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phoneNumber);
        setEmail(response.data.email);
        setImage(response.data.image);
        setTimeStart(response.data.timeStart);
        setTimeEnd(response.data.timeEnd);
        setSelectedCityId(response.data.idCity);
        setSelectedCategoryId(response.data.idCategory);
        console.log(response.data);
    }
    document.title = "Shop";

    function formatNumberWithCommas(number) {
        return number.toLocaleString("de-DE");
    }





    useEffect(() => {
        getProduct();

    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/menus/${params.id}`);
            let menus = response.data;


            if (!Array.isArray(menus)) {
                menus = [menus];
            }

            const menuProductsPromises = menus.map(async (menu) => {
                const menuId = menu.id;
                const products = await findByNameAndMenu(menuId, searchQuery);
                return {
                    menu: menu,
                    products: products
                };
            });

            const menuProductsData = await Promise.all(menuProductsPromises);
            setMenuProducts(menuProductsData);

            const hasProducts = menuProductsData.some(menuProduct => menuProduct.products.length > 0);
            setNoResults(!hasProducts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const findByNameAndMenu = async (menuId, productName) => {
        try {
            const productResponse = await axios.get(`http://localhost:8080/api/products/FindByPByName/${menuId}?productName=${productName}`);
            return productResponse.data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return [];
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };

    const Showcar = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/detailCart/${params.id}/1`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const addProductToCart = async (idShop, idUser, idProduct) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/detailCart/1/${params.id}/${idProduct}`);
            console.log('Product added to cart:', response.data);
            Showcar();
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleMinus = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/detailCart/minus/${id}`);
            Showcar();
        } catch (error) {
            if (error.response && error.response.status === 204) {
                Showcar();
            } else {
                console.error('Error subtracting quantity from cart:', error);
            }
        }
    };

    const handlePlus = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/detailCart/plus/${id}`);
            Showcar();
        } catch (error) {
            console.error('Error adding quantity to cart:', error);
        }
    };

    useEffect(() => {
        setSum(calculateSum(cart));
    }, [cart]);

    const calculateSum = (cart) => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity;
        });
        return total;
    };

    useEffect(() => {
        Showcar();
        fetchData();
    }, [searchQuery]);

    const checkUserLikeExists = async (userId, productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/like-exists?userId=${userId}&productId=${productId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking like status:', error);
            return false;
        }
    };

    useEffect(() => {
        async function checkLikes() {
            const updatedLikedProducts = {};
            for (const menuProduct of menuProducts) {
                for (const product of menuProduct.products) {
                    const isLiked = await checkUserLikeExists(idUser, product.id);
                    updatedLikedProducts[product.id] = isLiked;
                }
            }
            setLikedProducts(updatedLikedProducts);
        }
        checkLikes();
    }, [menuProducts]);

    const handleLike = async (userId, productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/plus-like?userId=${userId}&productId=${productId}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLikedProducts((prev) => ({ ...prev, [productId]: true }));
            fetchData(); // Re-fetch data after liking
        } catch (error) {
            console.error('Error adding like:', error);
        }
    };

    const handleUnlike = async (userId, productId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/delete-like?userId=${userId}&productId=${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setLikedProducts((prev) => ({ ...prev, [productId]: false }));
            fetchData(); // Re-fetch data after unliking
        } catch (error) {
            console.error('Error deleting like:', error);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);



    const fetchMenus = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/menus/${params.id}`);
            setMenus(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };
      const handleClose = () => {
    setShowDetailProduct(false);
  };



    return (
        <div>
            <HeadHome />
            <div className='now-detail-restaurant clearfix'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-5'>
                            <div className='detail-restaurant-img'>
                                <img src={`http://localhost:8080/img/${image}`} alt={name} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='detail-restaurant-info'>
                                <div className='kind-restaurant'>
                                    <div className='tag-preferreds'>Yêu Thích</div>
                                    <span>Quán ăn</span>
                                </div>
                                <h1 className='title-restaurant'>{name}</h1>
                                <div className='status-restaurant'>
                                    <span className='rating'>
                                        <FontAwesomeIcon icon={faStar} className='checked' />
                                        <FontAwesomeIcon icon={faStar} className='checked' />
                                        <FontAwesomeIcon icon={faStar} className='checked' />
                                        <FontAwesomeIcon icon={faStar} className='checked' />
                                        <FontAwesomeIcon icon={faStarHalfStroke} className='checked' />
                                    </span>
                                    <span>
                                        4.5
                                    </span>
                                </div>
                                <div className='status-restaurant'>
                                    <span>
                                        <FontAwesomeIcon icon={faClock} className='faClock' /> {timeStart} - {timeEnd}
                                    </span>
                                </div>
                                <div className='status-restaurant'>
                                    <span><FontAwesomeIcon icon={faLocationDot} className='faClock' />{address}</span>
                                </div>
                                <div className='status-restaurant'>
                                    <span><FontAwesomeIcon icon={faPhone} className='faClock' />{phoneNumber}</span>
                                </div>
                                <div className='status-restaurant'>
                                    <span><FontAwesomeIcon icon={faEnvelope} className='faClock' />{email}</span>
                                </div>
                                <div className='cost-restaurant'>
                                    <span><FontAwesomeIcon icon={faSackDollar} /> 10.000 - 100.000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container relative clearfix">
                <div className='now-menu-restauran'>
                    <div className='menu-restaurant-tab'>
                    
                        <div className='item active'>&nbsp;&nbsp;&nbsp;&nbsp;Thực Đơn</div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className='menu-restaurant-category'>
                                <div className='list-category'>
                                    <div className='scrollbar-container ps'>
                                        <div className='item'>
                                            {menus.map((menu, index) => (
                                                <div key={menu.id} ref={el => (menuRefs.current[index] = el)}>
                                                    <a className='item-link' href={`#${menu.name}`} >
                                                        {menu.name}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='menu-restaurant-detail'>
                                <div className='search-items mt-2'>
                                    <form className='input-group' onSubmit={handleSearch}>
                                        <input className='form-control' type='search' name="searchKey" placeholder="Tìm món" onChange={(e) => setSearchQuery(e.target.value)} />
                                        <button type='submit' className='btnSearch'>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </button>
                                    </form>
                                </div>
                                {noResults ? (
                                    <div className="no-results">
                                        <FontAwesomeIcon className='icon' icon={faSadTear} />
                                        <div>Không có sản phẩm</div>
                                    </div>
                                ) : (
                                    menuProducts.map((menuProduct, index) => {
                                        return (
                                            <div key={index} className='memu-group'>
                                                {menuProduct.products.length > 0 && (
                                                    <>

                                                        <div key={index} className='memu-group'>
                                                            <div className='title-menu' id={menuProduct.menu.name}>
                                                                {menuProduct.menu.name}
                                                            </div>
                                                            {menuProduct.products.map((product, index) => (
                                                                <div key={index} ref={index === 0 ? menuRefs.current[index] : null} className='product'>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {menuProduct.products.map((product, index) => {
                                                            if (product.status === 1) {
                                                                return (
                                                                    <div key={index} className='item-restaurant-row'>
                                                                        <div className='row'>
                                                                            <div className='col-auto item-restaurant-img'>
                                                                                <Link
                                                                                    onClick={() => {
                                                                                        setShowDetailProduct(true);
                                                                                        setIdDtailProduct(product.id);
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        className="img-item"
                                                                                        src={`http://localhost:8080/img/${product.image}`}
                                                                                        alt={product.name}
                                                                                    />
                                                                                </Link>
                                                                            </div>
                                                                            <div className='col item-restaurant-info'>
                                                                                <h2 className='item-restaurant-name'>{product.name}</h2>
                                                                                <div className='item-restaurant-desc'>{product.detail}</div>
                                                                                <div>
                                                                                    {likedProducts[product.id] ? (
                                                                                        <FontAwesomeIcon icon={faRegularHeart} style={{ color: 'red' }}
                                                                                            onClick={() => handleUnlike(idUser, product.id)} />
                                                                                    ) : (
                                                                                        <FontAwesomeIcon
                                                                                            icon={faDuotoneHeart}
                                                                                            onClick={() => handleLike(idUser, product.id)}
                                                                                        />
                                                                                    )}
                                                                                    <span> {product.like_product}</span>

                                                                                </div>
                                                                            </div>
                                                                            <div className='col-auto item-restaurant-more'>
                                                                                <div className='row'>
                                                                                    <div className='col-auto product-price'>
                                                                                        <div className='current-price'>
                                                                                            {formatNumberWithCommas(product.price)}
                                                                                            <span className='price'>đ</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='col-auto adding-food-cart txt-right'>
                                                                                        <button className='btn-adding' onClick={() => addProductToCart(idShop, idUser, product.id)}></button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        <div className="col">
                            <div className='cart-restaurant'>
                                <div className='title-cart'>Giỏ hàng</div>
                                <div className='restaurant-cart'>
                                    {cart.map((item) => (
                                        <div key={item.id}>
                                            <div className='td-card'>
                                                <div className='row'>
                                                    <div className='col-5 name-cart'>{item.product.name}</div>
                                                    <div className='inputQuantity col-3'>
                                                        <button className='btnQuantity' onClick={() => handleMinus(item.id)}>-</button>
                                                        <input type="text" className='quantity-value' value={item.quantity} readOnly />
                                                        <button className='btnQuantity' onClick={() => handlePlus(item.id)}>+</button>
                                                    </div>
                                                    <div className='col-4 price-cart'>{formatNumberWithCommas(item.product.price * item.quantity)} đ</div>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='restaurant-checkout'>
                                    <div className='restaurant-price'>
                                        <div className='icon-sum'>
                                                <FontAwesomeIcon className='iconWallet' icon={faWallet} /> 
                                                <span className='sumPrice'>      Tổng: {formatNumberWithCommas(sum)} đ</span>
                                        </div> 
                                    </div>
                                    <Link to={`/OrderAndListOrderItem/${params.id}`} className="payment-button">
                                    <form className="payment-form">
                                        <button>
                                            + Xác nhận thanh toán
                                        </button>
                                    </form>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetailProduct show={showDetailProduct} handleClose={handleClose} idDetailProduct={idDetailProduct} />
            <FooterHome />
        </div>
    );
}