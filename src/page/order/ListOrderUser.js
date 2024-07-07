import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ListOrderUser.css"; // Import the CSS file
import moment from "moment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPenSquare, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HeadHome from "../../compoment/HeadHome";
import FooterHome from "../../compoment/FooterHome";
import Modal from "react-bootstrap/Modal";
import ModalUser from "./ModalUser";

function ListOrderUser() {
    async function listOrdersByOrderId() {
        if (orderId) {
            console.log(orderId);
            const response = await axios.get(
                `http://localhost:8080/api/order/orderItem/${orderId}`
            );

            test.current = response.data;
            console.log(test.current);
        }
    }

    const [orders, setOrders] = useState([]);
    const params = useParams();
    const [selectedValue, setSelectedValue] = useState('1');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [orderId, setDataOrderId] = useState("");
    const test = useRef();
    const [user, setUser] = useState({});
    const [isShowModalOrder, setIsShowModalOrder] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [startIndex, setStartIndex] = useState(0); // State for starting index of displayed items

    async function listOrdersByUser() {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/order/orders/user/${params.id}`
            );
            document.title = "Đơn hàng của bạn";
            // Ensure the data is an array and log its length
            if (Array.isArray(response.data)) {
                console.log("API returned an array with length:", response.data.length);
                // Process updatedAt to keep only the necessary parts
                const processedOrders = response.data.map((order) => {
                    const updatedAt = order.updatedAt ? new Date(
                        order.updatedAt[0], // Year
                        order.updatedAt[1] - 1, // Month (0-indexed)
                        order.updatedAt[2], // Day
                        order.updatedAt[3], // Hour
                        order.updatedAt[4], // Minute
                        0, // Seconds
                        0 // Milliseconds
                    ) : null;
                    const createdAt = new Date(
                        order.createdAt[0], // Year
                        order.createdAt[1] - 1, // Month (0-indexed)
                        order.createdAt[2], // Day
                        order.createdAt[3], // Hour
                        order.createdAt[4], // Minute
                        0, // Seconds
                        0 // Milliseconds
                    );
                    return { ...order, updatedAt, createdAt };
                });
                setOrders(processedOrders);
            } else {
                console.error("API did not return an array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const searchOrderByStatus = async (value) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/status/${value}`);
            // Ensure the data is an array and log its length
            if (Array.isArray(response.data)) {
                console.log("API returned an array with length:", response.data.length);
                // Process updatedAt to keep only the necessary parts
                const processedOrders = response.data.map(order => {
                    const updatedAt = order.updatedAt ? new Date(
                        order.updatedAt[0],  // Year
                        order.updatedAt[1] - 1,  // Month (0-indexed)
                        order.updatedAt[2],  // Day
                        order.updatedAt[3],  // Hour
                        order.updatedAt[4],  // Minute
                        0,  // Seconds
                        0  // Milliseconds
                    ) : null;

                    const createdAt = new Date(
                        order.createdAt[0],  // Year
                        order.createdAt[1] - 1,  // Month (0-indexed)
                        order.createdAt[2],  // Day
                        order.createdAt[3],  // Hour
                        order.createdAt[4],  // Minute
                        0,  // Seconds
                        0  // Milliseconds
                    );
                    return { ...order, updatedAt, createdAt };
                });
                setOrders(processedOrders);
                console.log("avc", processedOrders);
            } else {
                console.error('API did not return an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    const indexOfLastProduct = currentPage * ordersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
    const ordersProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setStartIndex((pageNumber - 1) * ordersPerPage); // Update startIndex based on current page
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    function formatNumberWithCommas(number) {
        return number.toLocaleString("de-DE");
    }

    useEffect(() => {
        listOrdersByUser();
    }, []);

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        searchOrderByStatus(event.target.value);
    };

    useEffect(() => {
        setIsShowModalOrder(true);
        listOrdersByOrderId();
    }, [orderId]);

    return (
        <>
            <HeadHome />

            <div className="block-section">
                <div className="container">
                    <h1 className="block-title mb-4 center">Danh sách đơn hàng</h1>
                    <div className="history-table-container">
                        <div className="filter-table">
                            <div className="filter-table-item">
                                <div className="text-nowrap">
                                    <span className="filter-table-label">Trạng thái</span>
                                    <select name="" value={selectedValue} onChange={handleChange} className="form-control filter-table-input">
                                        <option value="1" selected="">All</option>
                                        <option value="7">Hoàn tất</option>
                                        <option value="3">Hủy</option>
                                    </select>
                                </div>
                            </div>
                            <div className="filter-table-item">
                                <div className="text-nowrap">
                                    <span className="filter-table-label">Từ ngày</span>
                                    <input value="" type="date" className="flatpickr-input" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="filter-table-item">
                                <div className="text-nowrap">
                                    <span className="filter-table-label">Đến ngày</span>
                                    <input mindate="Mon May 27 2024 08:26:05 GMT+0700 (Indochina Time)" value="" type="date" className="flatpickr-input" readOnly="readonly" />
                                </div>
                            </div>
                            <div className="filter-table-item">
                                <button type="button" className="btns btn-primary">Tìm kiếm</button>
                            </div>
                        </div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>STT</th>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Mã đơn hàng</th>
                                
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Thời gian </th>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Địa điểm</th>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Thành tiền</th>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Trạng thái</th>
                                    <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersProducts.map((order, index) => (
                                    <tr key={index}>
                                        <td className="center">{startIndex + index + 1}</td> {/* Calculate STT dynamically */}
                                        <td className="center">{order.codeOrders}</td>
                                        <td>
                                            {order.updatedAt ? (
                                                `Thời gian cập nhật: ${moment(order.updatedAt).format("DD-MM-YYYY HH:mm")}`
                                            ) : (
                                                ""
                                            )}
                                            {!order.updatedAt ? (
                                                `Thời gian tạo: ${moment(order.createdAt).format("DD-MM-YYYY HH:mm")}`
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                        {order.orderItems.length > 0 && (
                                            <td>
                                                {order.orderItems[0].shop.name}
                                                <br />
                                                {order.orderItems[0].shop.idCity.name}
                                            </td>
                                        )}
                                        <td>
                                            {formatNumberWithCommas(calculateOrderTotal(order.orderItems))} đ
                                        </td>
                                        <td>
                                            {order.status.type}<br />
                                        </td>
                                        <td className="link">
                                            <div>
                                                <Link
                                                    onClick={() => {
                                                        setModalShow(true);
                                                        setDataOrderId(order.id);
                                                        setUser(order.user);
                                                    }}
                                                >
                                                    Chi tiết đơn hàng
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {Math.ceil(orders.length / ordersPerPage) > 1 && (
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button onClick={prevPage} className="page-link">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </li>
                            {Array.from(
                                { length: Math.ceil(orders.length / ordersPerPage) },
                                (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                                    >
                                        <button onClick={() => paginate(i + 1)} className="page-link">
                                            {i + 1}
                                        </button>
                                    </li>
                                )
                            )}
                            <li
                                className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage) ? "disabled" : ""}`}
                            >
                                <button onClick={nextPage} className="page-link">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </li>
                        </ul>
                    )}
                    <ModalUser
                        show={modalShow}
                        id={orderId}
                        users={user}
                        onHide={() => setModalShow(false)}></ModalUser>
                </div>
                <FooterHome />
            </div>
        </>
    );
}

export default ListOrderUser;
