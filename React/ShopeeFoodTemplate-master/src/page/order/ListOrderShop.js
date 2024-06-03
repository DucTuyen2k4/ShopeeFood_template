import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListOrderShop.css'; // Import the CSS file
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPenSquare, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import HeadHome from '../../compoment/HeadHome';
import HeadMerchant from '../../compoment/HeadMerchant';
import PopupDelete from '../../compoment/PopupDelete';
import { toast } from 'react-toastify';


function ListOrderShop() {
    const [orders, setOrders] = useState([]);
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [id, setIdOder] = useState();
    const [open, setOpen] = useState(false);

    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
    }

    async function listOrdersByUser() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orders/shop/${params.id}`);
            // Ensure the data is an array and log its length
            if (Array.isArray(response.data)) {
                console.log("API returned an array with length:", response.data.length);
                // Process createdAt to keep only the necessary parts
                const processedOrders = response.data.map(order => {
                    const createdAt = new Date(
                        order.createdAt[0],  // Year
                        order.createdAt[1] - 1,  // Month (0-indexed)
                        order.createdAt[2],  // Day
                        order.createdAt[3],  // Hour
                        order.createdAt[4],  // Minute
                        0,  // Seconds
                        0  // Milliseconds
                    );
                    return { ...order, createdAt };
                });
                setOrders(processedOrders);
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

    async function setStatusConfirmOrder(idOrder) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/2`);
            console.log('Order status updated:', response.data);
            toast.success("Nhận đơn hàng thành công")
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }
    const calculateOrderTotal = (orderItems) => {
        return orderItems.reduce((total, item) => {
            return total + (item.quantity * item.product.price);
        }, 0);
    };
    const handleClose = () => {
        setOpen(!open)
    }
    const handleStatusConfirmOrder = (id) => {
        setIdOder(id);
        setOpen(true)
    }
    return (
        <>
            <HeadMerchant />
            <h2 className="center-merchant">Danh sách đơn hàng</h2>

            <table class="table table-bordered">
                <tr>
                    <th className="center">STT</th>
                    <th className="center">Mã đơn hàng</th>
                    <th>Thời gian </th>
                    <th>Thông tin khách hàng </th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                    <th>Chi tiết</th>
                </tr>
                {ordersProducts.map((order, index) => (
                    <tr>
                        <td className="center">{index + 1}</td>
                        <td className="center">{order.id}</td>
                        <td>
                            Thời gian đặt:{" "}
                            {moment(order.createdAt).format(" DD-MM-YYYY HH:mm")}
                        </td>
                        <td>
                            {order.user.name}
                            <br />
                            {order.user.phoneNumber}
                            <br />
                            {order.user.address}
                        </td>
                        <td>
                            {formatNumberWithCommas(calculateOrderTotal(order.orderItems))} đ
                        </td>
                        <td>
                            <div className='button-orders'>
                                <button onClick={() => setStatusConfirmOrder(order.id)} type="button" class="btn btn-success">Nhận đơn</button><br />
                                <button onClick={() => handleStatusConfirmOrder(order.id)} type="button" class="btn btn-danger">Hủy đơn</button>
                            </div>
                        </td>
                        <td className="link">
                            <div>
                                <Link>Chi tiết đơn hàng</Link>
                            </div>

                        </td>
                    </tr>
                ))}
            </table>
            <PopupDelete
                open={open}
                handleClose={handleClose}
                id={id} />
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
                <li
                    className={`page-item ${currentPage === Math.ceil(orders.length / ordersPerPage)
                        ? "disabled"
                        : ""
                        }`}
                >
                    <button onClick={nextPage} className="page-link">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
        </>
    );
}

export default ListOrderShop;