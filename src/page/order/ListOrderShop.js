import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ListOrderShop.css"; // Import the CSS file
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faPenSquare,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalMerchant from "./ModalMerchant";
import { toast } from "react-toastify";
import PopupDelete from "../../compoment/PopupDelete";
import HeadHome from "../../compoment/HeadHome";

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
      const response = await axios.put(
        `http://localhost:8080/api/order/status/${idOrder}/2`
      );
      console.log("Order status updated:", response.data);
      toast.success("Nhận đơn hàng thành công");
    } catch (error) {
      console.error("Error updating order status:", error);
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
      // Ensure the data is an array and log its length
      if (Array.isArray(response.data)) {
        console.log("API returned an array with length:", response.data.length);
        // Process createdAt to keep only the necessary parts
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
  const searchOrderByStatus = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/status/${value}`
      );
      // Ensure the data is an array and log its length
      if (Array.isArray(response.data)) {
        console.log("API returned an array with length:", response.data.length);
        // Process createdAt to keep only the necessary parts
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
        console.log("avc", processedOrders);
      } else {
        console.error("API did not return an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const ordersProducts = orders.slice(indexOfFirstProduct, indexOfLastProduct);
  const [selectedValue, setSelectedValue] = useState("1");

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
      console.log(orderId);
      const response = await axios.get(
        `http://localhost:8080/api/order/orderItem/${orderId}`
      );
      test.current = response.data;
      console.log(test.current);
    }
  }
  const handleClose = () => {
    setOpen(!open);
  };
  const handleStatusConfirmOrder = (id) => {
    setIdOder(id);
    setOpen(true);
  };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    searchOrderByStatus(event.target.value);
  };

  return (
    <>
      <HeadHome />
      <div className="block-section">
        <div className="container">
          <h1 className="block-title mb-4 center">Danh sách đơn hàng</h1>
          {/* <div className="history-switch">
                        <div class="item now active">ShopeeFood</div>
                    </div> */}
          <div class="history-table-container">
            <div class="filter-table">
              <div class="filter-table-item ">
                <div class="text-nowrap">
                  <span class="filter-table-label">Trạng thái</span>
                  <select
                    name=""
                    value={selectedValue}
                    onChange={handleChange}
                    class="form-control filter-table-input"
                  >
                    <option value="1" selected="">
                      All
                    </option>
                    <option value="6">Hoàn tất</option>
                    <option value="3">Hủy</option>
                  </select>
                </div>
              </div>
              <div class="filter-table-item">
                <div class="text-nowrap">
                  <span class="filter-table-label">Từ ngày</span>
                  <input
                    value=""
                    type="date"
                    class="flatpickr-input"
                    readonly="readonly"
                  />
                </div>
              </div>
              <div class="filter-table-item">
                <div class="text-nowrap">
                  <span class="filter-table-label">Đến ngày</span>
                  <input
                    mindate="Mon May 27 2024 08:26:05 GMT+0700 (Indochina Time)"
                    value=""
                    type="date"
                    class="flatpickr-input"
                    readonly="readonly"
                  />
                </div>
              </div>
              <div class="filter-table-item">
                <button type="button" class="btns btn-primary">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <table class="table table-bordered">
            <tr>
              <th className="center">STT</th>
              <th className="center">Mã đơn hàng</th>
              <th>Thời gian </th>
              <th>Thông tin khách hàng </th>
              <th className="center">Thành tiền</th>
              <th className="px-3">Trạng thái</th>
              <th className="center">Chi tiết</th>
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
                <td className="center">
                  {formatNumberWithCommas(
                    calculateOrderTotal(order.orderItems)
                  )}{" "}
                  đ
                </td>
                <td>
                  {order.status.id == 1 ? (
                    <div className="button-orders">
                      <button
                        onClick={() => setStatusConfirmOrder(order.id)}
                        type="button"
                        class="btn btn-success"
                      >
                        Nhận đơn
                      </button>
                      <br />
                      <button
                        onClick={() => handleStatusConfirmOrder(order.id)}
                        type="button"
                        class="btn btn-danger"
                      >
                        Hủy đơn
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{order.status.type}</span>
                    </div>
                  )}
                </td>
                <td className="link center">
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
          </table>
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
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(orders.length / ordersPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <button onClick={nextPage} className="page-link">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </li>
          </ul>
          <ModalMerchant
            show={modalShow}
            id={orderId}
            users={user}
            onHide={() => setModalShow(false)}
          ></ModalMerchant>
        </div>
      </div>
    </>
  );
}

export default ListOrderShop;
