import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import HeadHome from "../../compoment/HeadHome";
import { toast } from "react-toastify";

function Shipper() {
    const [orderShip, setShipOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    async function getOrderByShip() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orderByShip`);
            setShipOrder(response.data);
            document.title = "Đơn hàng có thể nhận";
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    async function setStatusConfirmOrder(idOrder, idStatus) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/${idStatus}`);
            console.log('Order status updated:', response.data);
            getOrderByShip();
            toast.success("Nhận đơn thành công")
           
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    useEffect(() => {
        getOrderByShip();
    }, []);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderShip.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(orderShip.length / ordersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <HeadHome />
            <h2 className="center-ship">Danh sách đơn hàng</h2>
            <style>
                {`
                    .order-button {
                        position: absolute;
                        top: 70px;
                        right: 10px;
                        padding: 10px 20px;
                        font-size: 16px;
                        color: #fff;
                        background-color: #ff0000; /* Red color */
                        border: none;
                        border-radius: 4px;
                        text-align: center;
                        text-decoration: none;
                        z-index: 1000;
                        width: 150px;
                        transition: background-color 0.3s ease;
                    }
                    .order-button:hover {
                        background-color: #28a745; /* Green color */
                    }
                    .no-orders {
                        text-align: center;
                        margin: 20px;
                        font-size: 18px;
                        color: #888;
                    }
                `}
            </style>
            <Link to="/ShipperReceived" className="order-button">
                Đơn hàng <br /> của shipper
            </Link>

            {orderShip.length === 0 ? (
                <div className="no-orders">Không có đơn hàng</div>
            ) : (
                <>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="center">STT</th>
                                <th className="center">Mã đơn hàng</th>
                                    <th className="center">Thông tin khách hàng</th>
                                    <th className="center">Vị trí nhận hàng</th> {/* Thêm cột mới */}
                                    <th className="center">Vị trí giao hàng</th> {/* Thêm cột mới */}
                                    <th className="center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order, index) => (
                                <tr key={order.id}>
                                    <td className="center">{indexOfFirstOrder + index + 1}</td>
                                    <td className="center">{order.codeOrders}</td>
                                    <td className="center">
                                        {order.user.name}<br />
                                        {order.user.phoneNumber}<br />
                                        {order.user.address}
                                    </td>
                                    {order.orderItems.length > 0 && (
                                    <td className="center">
                                        {order.orderItems[0].shop.address}
                                    </td>
                                    )}
                                    
                                    <td className="center">
                                        {order.addressOrder.address}
                                    </td> {/* Hiển thị địa chỉ nhận hàng */}
                                    <td className="center">
                                        <div className='button-orders'>
                                            {order.status.id === 2 && (
                                                <button onClick={() => setStatusConfirmOrder(order.id, 4)} type="button" className="btn btn-success">Nhận đơn</button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button onClick={prevPage} className="page-link">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(orderShip.length / ordersPerPage) }, (_, i) => (
                            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(orderShip.length / ordersPerPage) ? "disabled" : ""}`}>
                            <button onClick={nextPage} className="page-link">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </li>
                    </ul>
                </>
            )}
        </>
    );
}

export default Shipper;
