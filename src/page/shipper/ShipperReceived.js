import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HeadHome from "../../compoment/HeadHome";
import { toast } from "react-toastify";

function ShipperReceived() {
    const [orderShip, setShipOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getOrderByShip();
    }, []);

    async function getOrderByShip() {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/orderReceived`);
            setShipOrder(response.data);
            setTotalPages(Math.ceil(response.data.length / ordersPerPage));
            document.title = "Đơn hàng đã nhận";
       
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    async function setStatusConfirmOrder(idOrder, idStatus) {
        try {
            const response = await axios.put(`http://localhost:8080/api/order/status/${idOrder}/${idStatus}`);
            console.log('Order status updated:', response.data);
            getOrderByShip();
            if (`${idStatus}`==6){
                toast.success("Đơn hàng đã nhận bắt đầu giao hàng.")
            }
            if (`${idStatus}` == 7) {
                toast.success("Giao thành công.")
            }
           
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderShip.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
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
            <h2 className="center-ship">Đơn hàng của bạn</h2>
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
                                {order.addressOrder.address} {/* Hiển thị địa chỉ nhận hàng */}
                            </td>
                           
                            <td className="center">
                                <div className='button-orders'>
                                    {order.status.id === 4 && (
                                        <button onClick={() => setStatusConfirmOrder(order.id, 6)} type="button" className="btn btn-success">Bắt đầu giao hàng</button>
                                    )}
                                    {order.status.id === 6 && (
                                        <button onClick={() => setStatusConfirmOrder(order.id, 7)} type="button" className="btn btn-success">Giao thành công</button>
                                    )}
                                    {order.status.id === 7 && (
                                        <div>Đơn hàng đã giao thành công</div>
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
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button onClick={nextPage} className="page-link">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
        </>
    );
}

export default ShipperReceived;
