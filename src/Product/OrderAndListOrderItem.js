
import axios from "axios";
import { useEffect, useState } from "react";
import '../css/LayoutOrederAndListOrderItem.css';
import { Link, useNavigate } from "react-router-dom";
import HeadHome from "../compoment/HeadHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/LayoutHome.css';
import { faHouse, faBriefcase, faLocationDot, faWallet, faMoneyBill, faMoneyCheckDollar, faBuildingColumns, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FooterHome from "../compoment/FooterHome";

export default function OrderAndListOrderItem() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [sum, setSum] = useState(0);
    // const [idShop,setIdShop] = useState(11);
    // const [idUser,setId] = useState(11);
    const [address, setAddress] = useState([]);
    const [shop, setShop] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [status, setStatus] = useState(0);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [note, setNote] = useState('');
    async function  CreateOrder(e) {
        e.preventDefault();
        let addressId = selectedAddressId;

        if (!addressId) {
            const defaultAddress = address.find(addr => addr.status === 2);
            if (defaultAddress) {
                addressId = defaultAddress.id;
            } else {
                console.error('No default address with status 2 found.');
                return;
            }
        }

        try {
            const orderResponse = await axios.post(`http://localhost:8080/api/order/2/11/${selectedAddressId}`, note, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            console.log('Order placed successfully', orderResponse.data);
            navigate('/ListOrderUser/1'); // Move navigation here
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }

    async function getShop() {
        const response = await axios.get(`http://localhost:8080/api/shops/11`);
        setShop(response.data);
    }
    

    async function getAddressList() {
        try {
            const response = await axios.get(`http://localhost:8080/api/address/2`);
            setAddress(response.data);
        } catch (error) {
            console.error('Error fetching address data:', error);
        }
    }

    async function getOrderItem() {
        try {
            const response = await axios.get(`http://localhost:8080/api/detailCart/11/2`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }

    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
    }

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
    };

    const Showcar = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/detailCart/11/2`);
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const addProductToCart = async (idShop, idUser, idProduct) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/detailCart/2/11/${idProduct}`);
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
            console.error('Error subtracting quantity from cart:', error);
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

    const calculateSum = (cart) => {
        let total = 0;
        cart.forEach(item => {
            total += item.product.price * item.quantity;
        });
        return total;
    };

    useEffect(() => {
        getShop();
        getAddressList();
        Showcar();
    }, []);

    useEffect(() => {
        setSum(calculateSum(cart));
    }, [cart]);

    const openModal = (status) => {
        setStatus(status);
        setIsModalOpen(true);
    };

    const openDeleteModal = (addressId) => {
        setAddressToDelete(addressId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteAddress = async () => {
        if (addressToDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/address/${addressToDelete}`);
                setIsDeleteModalOpen(false);
                setAddressToDelete(null);
                getAddressList(); // Refresh the address list after deletion
            } catch (error) {
                console.error('Error deleting address:', error);
            }
        }
    };

    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAddress = {
            nameUser: formData.get('name'),
            address: formData.get('details'),
            phoneNumber: formData.get('contact'),
            status: status
        };

        try {
            await axios.post(`http://localhost:8080/api/address/1`, newAddress);
            setIsModalOpen(false);
            getAddressList();
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleSelectAddress = (id) => {
        setSelectedAddressId(id);
    };

    const renderAddressDiv = (status, icon, label) => {
        const addr = address.find(addr => addr.status === status);
        if (addr) {
            return (
                <div
                    className={`itemG ${selectedAddressId === addr.id ? 'selected' : ''} ${status === 1 ? 'home' : 'work'}`}
                    key={status}
                >
                    <FontAwesomeIcon className="div-icon" icon={icon} />
                    <div className="div-text-in">
                        <div className="div-NameAddress">{label}</div>
                        <div className="div-text-in-text">{addr.nameUser}</div>
                        <div className="div-text-in-text">{addr.address}</div>
                        <button className="button-eidt" onClick={() => handleSelectAddress(addr.id)}>giao tới địa chỉ này</button>

                    </div>
                </div>
            );
        } else {
            return (
                <div className="itemG" key={status}>
                    <FontAwesomeIcon className="div-icon" icon={icon} />
                    <div className="div-text-in">
                        <div className="div-NameAddress">{label}</div>
                        <div className="div-text-in-text">Thêm {label.toLowerCase()}</div>
                        <button className="button-eidt" onClick={() => openModal(status)}>Thêm {label.toLowerCase()}</button>
                    </div>
                </div>
            );
        }
    };
    return (
        <div>
            <HeadHome />
            <div className="container-for container">
                <div className="div1">
                    <div className="div3">
                        Thanh toán đơn hàng
                    </div>
                    <div className="div5">
                        <div>
                            <label className="The-text">Chọn địa chỉ giao hàng</label>
                        </div>
                        <div className="div4">
                            <div className="itemG">
                                <FontAwesomeIcon className="div-icon" icon={faLocationDot} />
                                <div className="div-text-in">
                                    <div className="div-NameAddress">Other</div>
                                    <div className="div-text-in-text">Thêm địa chỉ giao hàng mới</div>
                                    <button className="button-eidt-b" onClick={() => openModal(0)}>Thêm địa chỉ giao hàng mới</button>
                                </div>
                            </div>
                            {renderAddressDiv(1, faHouse, 'Home')}
                            {renderAddressDiv(2, faBriefcase, 'Work')}
                            {address.map((addr, index) => (
                                addr.status === 0 && (
                                    <div
                                        className={`itemG other ${selectedAddressId === addr.id ? 'selected' : ''}`}
                                        key={index}
                                    >
                                        <FontAwesomeIcon
                                            className="exit-icon"
                                            icon={faCircleXmark}
                                            onClick={() => openDeleteModal(addr.id)}
                                        />
                                        <FontAwesomeIcon className="div-icon ms-10" icon={faLocationDot} />
                                        <div className="div-text-in">
                                            <div className="div-NameAddress">Other</div>
                                            <div className="div-text-in-text">{addr.address}</div>
                                            <button className="button-eidt" onClick={() => handleSelectAddress(addr.id)}>giao tới địa chỉ này</button>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="div6">
                        <label className="The-text">Phương thức thanh toán</label>
                        <label className="little-text">Thanh Toán khi nhận hàng</label>
                        <div className="div7">
                            <div className="div9">
                                <div className="div8">
                                    <FontAwesomeIcon className="div-iconic" icon={faMoneyBill} />
                                    <label className="text-cutevl">COD</label>
                                </div>
                                <div className="color">
                                    <FontAwesomeIcon className="div-iconic" icon={faMoneyCheckDollar} />
                                    <label className="text-cutevl">Credit</label>
                                </div>
                                <div className="color">
                                    <FontAwesomeIcon className="div-iconic" icon={faBuildingColumns} />
                                    <label className="text-cutevl">Netbanking</label>
                                </div>
                            </div>
                            <div className="div10">
                                <label className="label-hihi"> Ghi chú cho cửa hàng</label>
                                <textarea
                                    className="label-hihi-text form-control"
                                    placeholder="Cửa hàng nên lưu ý..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div2">
                    <div className="col">
                        <div className='cart-restaurant'>
                            <div className='title-cart'>{shop.name}</div>
                            <div className='restaurant-cart'>
                                {cart.map((item) => (
                                    <div key={item.id}>
                                        <div className=''>
                                            <div className='row'>
                                                <div className='col-5 name-cart'>{item.product.name}</div>
                                                <div className='inputQuantity col-3'>
                                                    <button className='btnQuantity' onClick={() => handleMinus(item.id)}>-</button>
                                                    <input type="text" className='quantity-value' value={item.quantity} readOnly />
                                                    <button className='btnQuantity' onClick={() => handlePlus(item.id)}>+</button>
                                                </div>
                                                <div className='col-4 price-cart'>{formatNumberWithCommas(item.product.price)} đ</div>
                                            </div>
                                            <hr />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='restaurant-checkout'>
                                <div className='restaurant-price'>
                                    <div className="sum-icon">
                                    <FontAwesomeIcon className='iconWallet' icon={faWallet} /> <span className='sumPrice'>Tổng: {formatNumberWithCommas(sum)} đ</span>
                                    </div>
                                </div>
                                <form className="payment-form" onSubmit={CreateOrder}>
                                    <button type="submit" className="payment-button">+ Xác nhận thanh toán</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thêm địa chỉ mới</h2>
                        <form onSubmit={handleSubmitAddress}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên khách hàng"
                                required
                            />
                            <input
                                type="text"
                                name="details"
                                placeholder="Địa chỉ nhận hàng"
                                required
                            />
                            <input
                                type="text"
                                name="contact"
                                placeholder="Số điện thoại nhận hàng"
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Xác nhận xóa địa chỉ</h2>
                        <p>Bạn có chắc chắn muốn xóa địa chỉ này không?</p>
                        <button onClick={handleDeleteAddress}>Xóa</button>
                        <button onClick={() => setIsDeleteModalOpen(false)}>Hủy</button>
                    </div>
                </div>
            )}
            <FooterHome/>
        </div>
    );
}

