import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListOrderShop.css"; // Import the CSS file
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalMerchant from "./ModalMerchant";
import { toast } from "react-toastify";
import PopupDelete from "../../compoment/PopupDelete";
import HeadMerchant from "../../compoment/HeadMerchant";

function ListOrderShop() {
    const [modalShow, setModalShow] = useState(false);
    const [orderId, setDataOrderId] = useState("");
    const [orders, setOrders] = useState([]);
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState({});
    const [ordersPerPage] = useState(7);
    const [id, setIdOder] = useState();
    const [open, setOpen] = useState(false);

    async function setStatusConfirmOrder(idOrder) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/2`);
            console.log('Order status updated:', response.data);
            toast.success("Nhận đơn hàng thành công");
            // Refresh the list of orders
            listOrdersByUser();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error("Đã xảy ra lỗi: " + error.response.data);
            } else {
                console.error('Error updating order status:', error);
                toast.error("Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng");
            }
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
                    // Use updatedAt if available, otherwise fallback to createdAt
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
        setModalShow(true);
        setDataOrderId(idOrder);
    };

    return (
        <>
            <HeadMerchant />
            <h2 className="center">Danh sách đơn hàng</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>STT</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Mã đơn hàng</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Thời gian</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Thông tin khách hàng</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Thành tiền</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Trạng thái</th>
                        <th className="center" style={{ color: 'rgb(238, 77, 45)' }}>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersProducts.map((order, index) => (
                        <tr key={order.id}>
                            <td className="center">{indexOfFirstProduct + index + 1}</td>
                            <td className="center">{order.codeOrders}</td>
                            <td className="center">
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
                                    {order.status.id !== 1 && (
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
            {/* Pagination */}
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
                    <li className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage) ? "disabled" : ""}`}>
                        <button onClick={nextPage} className="page-link">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </li>
                </ul>
            )}
            <ModalMerchant show={modalShow} id={orderId} users={user} onHide={() => setModalShow(false)} />
        </>
    );
}

export default ListOrderShop;
