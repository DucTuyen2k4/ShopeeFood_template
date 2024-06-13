import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ListOrderShop.css"; // Import the CSS file
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalMerchant from "./ModalMerchant";
import { toast } from "react-toastify";
import PopupDelete from "../../compoment/PopupDelete";
import HeadMerchant from "../../compoment/HeadMerchant";

function ListOrderShop() {
    const [modalShow, setModalShow] = useState(false);
    const [orderId, setDataOrderId] = useState("");
    const test = useRef();
    const [isShowModalOrder, setIsShowModalOrder] = useState(false);
    const [orders, setOrders] = useState([]);
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});
    const [ordersPerPage] = useState(8);
    const [id, setIdOder] = useState();
    const [open, setOpen] = useState(false);

    async function setStatusConfirmOrder(idOrder) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/5`);
            console.log('Order status updated:', response.data);
            toast.success("Nhận đơn hàng thành công");
            // Refresh the list of orders
            listOrdersByUser();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }
    async function setStatusConfirmOrder1(idOrder) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/2`);
            console.log('Order status updated:', response.data);
            toast.success("Nhận đơn hàng thành công");
            // Refresh the list of orders
            listOrdersByUser();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    async function setStatusCancelOrder(idOrder) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/3`);
            console.log('Order status updated:', response.data);
            toast.success("Hủy đơn hàng thành công");
            // Refresh the list of orders
            listOrdersByUser();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    function formatNumberWithCommas(number) {
        return number.toLocaleString("de-DE");
    }

    async function listOrdersByUser() {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/order/orders/shop/${params.id}`
                
            );
            document.title = "Đơn hàng của shopper";
            if (Array.isArray(response.data)) {
                const processedOrders = response.data.map((order) => {
                    const createdAt = new Date(
                        order.createdAt[0], // Year
                        order.createdAt[1] - 1, // Month (0-indexed)
                        order.createdAt[2], // Day
                        order.createdAt[3], // Hour
                        order.createdAt[4], // Minute
                        0, // Seconds
                        0 // Milliseconds
                    );
                    return { ...order, createdAt };
                });
                setOrders(processedOrders);
            } else {
                console.error("API did not return an array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const indexOfLastProduct = currentPage * ordersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
    const ordersProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        listOrdersByUser();
    }, []);

    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const handleCloseOrder = (idOrder) => {
        setIsShowModalOrder(true);
        setDataOrderId(idOrder);
    };

    async function listOrdersByOrderId() {
        if (orderId) {
            const response = await axios.get(
                `http://localhost:8080/api/order/orderItem/${orderId}`
            );
            test.current = response.data;
            console.log(test.current);
        }
    }

    const handleClose = () => {
        setOpen(!open);
    }

    const handleStatusConfirmOrder = (id) => {
        setIdOder(id);
        setOpen(true);
    }

    return (
        <>
            <HeadMerchant/>
            <h2 className="center">Danh sách đơn hàng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="center">STT</th>
                        <th className="center">Mã đơn hàng</th>
                        <th className="center">Thời gian</th>
                        <th className="center">Thông tin khách hàng</th>
                        <th className="center">Thành tiền</th>
                        <th className="center">Trạng thái</th>
                        <th className="center">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersProducts.map((order, index) => (
                        <tr key={order.id}>
                            <td className="center">{index + 1}</td>
                            <td className="center">{order.codeOrders}</td>
                            <td className="center">Thời gian đặt: {moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                            <td className="center">
                                {order.user.name}<br />
                                {order.user.phoneNumber}<br />
                                {order.user.address}
                            </td>
                            <td className="center">{formatNumberWithCommas(calculateOrderTotal(order.orderItems))} đ</td>
                            <td >
                                <div className='button-orders'>
                                  
                                    {order.status.id === 1 && (
                                        <>
                                            <button onClick={() => setStatusConfirmOrder(order.id)} type="button" className="btn btn-success">Nhận đơn</button><br />
                                            <button onClick={() => setStatusCancelOrder(order.id)} type="button" className="btn btn-danger">Hủy đơn</button>
                                        </>
                                    )}
                                    {order.status.id === 5 && (
                                        <>
                                            <span >{order.status.type}</span>


                                            <button onClick={() => setStatusConfirmOrder1(order.id)} type="button" className="btn btn-success">Gửi thông báo đến Shipper</button><br />
                                           
                                        </>
                                    )}
                                    {order.status.id !== 1 && order.status.id !== 5 && (
                                        <span>  {order.status.type}</span>
                                    )}
                                </div>
                            </td>
                            <td className="link center">
                                <Link
                                    onClick={() => {
                                        setModalShow(true);
                                        setDataOrderId(order.id);
                                        setUser(order.user);
                                    }}
                                >
                                    Chi tiết đơn hàng
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PopupDelete
                open={open}
                handleClose={handleClose}
                id={id}
            />
            {/* Pagination */}
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
                <li className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage) ? "disabled" : ""}`}>
                    <button onClick={nextPage} className="page-link">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
            <ModalMerchant show={modalShow} id={orderId} users={user} onHide={() => setModalShow(false)} />
        </>
    );
}

export default ListOrderShop;
