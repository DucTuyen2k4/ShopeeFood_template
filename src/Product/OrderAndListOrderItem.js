
import axios from "axios";
import { useEffect, useState } from "react";
import '../css/LayoutOrederAndListOrderItem.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import HeadHome from "../compoment/HeadHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/LayoutHome.css';
import { faHouse, faBriefcase, faLocationDot, faWallet, faMoneyBill, faMoneyCheckDollar, faBuildingColumns, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import FooterHome from "../compoment/FooterHome";
import Validation from "../css/ValidateAddress.js";

export default function OrderAndListOrderItem() {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [address, setAddress] = useState([]);
  const [shop, setShop] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [note, setNote] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [status, setStatus] = useState(0);
  const [addressToEdit, setAddressToEdit] = useState({});
  const [idUser, setIdUser] = useState(1);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: '',
    details: '',
    contact: ''
  });
 function handleInput(event) {
  const { name, value } = event.target;
  setValues({ ...values, [name]: value });
}

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    const newAddress = {
      nameUser: values.name,
      address: values.details,
      phoneNumber: values.contact,
      status,
    };

    const validationErrors = Validation(newAddress);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/address/${idUser}`, newAddress);
      setIsModalOpen(false);
      getAddressList(); // Cập nhật danh sách địa chỉ sau khi thêm thành công
      setValues({   // Đặt lại giá trị của values thành một đối tượng rỗng
        name: '',
        details: '',
        contact: ''
      });
    } catch (error) {
      console.error('Lỗi khi thêm địa chỉ mới:', error);
    }
  };


  useEffect(() => {
    getShop();
    getAddressList();
    Showcar();
  }, [idUser]);

  useEffect(() => {
    setSum(calculateSum(cart));
  }, [cart]);

  async function CreateOrder(e) {
    e.preventDefault();
    if (!selectedAddressId) {
      alert('Bạn hãy chọn địa chỉ giao hàng');
      return;
    }

    const orderNote = note || ' ';
    try {
      const orderResponse = await axios.post(`http://localhost:8080/api/order/${idUser}/${params.id}/${selectedAddressId}`, orderNote, {
        headers: { 'Content-Type': 'text/plain' },
      });
      console.log('Đặt hàng thành công', orderResponse.data);
      navigate(`/HomeProduct/${params.id}`);
      
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
    }
  }

  async function getShop() {
    try {
      const response = await axios.get(`http://localhost:8080/api/shops/${params.id}`);
      setShop(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu cửa hàng:', error);
    }
  }

  async function getAddressList() {
    try {
      const response = await axios.get(`http://localhost:8080/api/address/${idUser}`);
      setAddress(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách địa chỉ:', error);
    }
  }


  async function getOrderItem() {
    try {
      const response = await axios.get(`http://localhost:8080/api/detailCart/1/${idUser}`);
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
    }
  }


  const formatNumberWithCommas = (number) => number.toLocaleString('de-DE');

  const calculateOrderTotal = (orderItems) =>
    orderItems.reduce((total, item) => total + item.quantity * item.product.price, 0);

  const Showcar = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/detailCart/${params.id}/${idUser}`);
      setCart(response.data);
    } catch (error) {
      console.error('Lỗi khi hiển thị giỏ hàng:', error);
    }
  };

  const addProductToCart = async (idShop, idUser, idProduct) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/detailCart/1/${params.id}/${idProduct}`);
      console.log('Thêm sản phẩm vào giỏ hàng:', response.data);
      Showcar();
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
    }
  };

  const handleMinus = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/detailCart/minus/${id}`);
      Showcar();
    } catch (error) {
      console.error('Lỗi khi giảm số lượng sản phẩm:', error);
    }
  };

  const handlePlus = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/detailCart/plus/${id}`);
      Showcar();
      
    } catch (error) {
      console.error('Lỗi khi tăng số lượng sản phẩm:', error);
    }
  };

  const calculateSum = (cart) =>
    cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const openModal = (status) => {
    setStatus(status);
    setIsModalOpen(true);
    setErrors({}); // Dòng này cần được thêm vào để reset state errors
  };

  const openEditModal = async (addressId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/address/update/${addressId}`);
      setAddressToEdit(response.data);
      setSelectedAddressId(addressId);
      setIsModalEdit(true);
      setErrors({}); // Đặt lại state errors thành một đối tượng trống khi mở modal chỉnh sửa
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu địa chỉ:', error);
    }
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
        getAddressList();
      } catch (error) {
        console.error('Lỗi khi xóa địa chỉ:', error);
      }
    }
  };

  

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedAddress = {
      id: selectedAddressId,
      nameUser: formData.get('name'),
      address: formData.get('details'),
      phoneNumber: formData.get('contact'),
      status: addressToEdit.status,
    };

    const validationErrors = Validation(updatedAddress);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/address/${selectedAddressId}/${idUser}`, updatedAddress);
      setIsModalEdit(false);
      getAddressList();
      setValues({
        name: '',
        details: '',
        contact: ''
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error);
    }
  };

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    setShowWarning(false);
  };

  const renderAddressDiv = (status, icon, label) => {
    const addr = address.find((addr) => addr.status === status);
    if (addr) {
      return (
        <div
          className={`itemG ${selectedAddressId === addr.id ? 'selected' : ''} ${
            status === 1 ? 'home' : 'work'
          }`}
          key={status}
        >
          <FontAwesomeIcon className="exit-icon" icon={faCircleXmark} onClick={() => openDeleteModal(addr.id)} />
          <FontAwesomeIcon className="div-icon" icon={icon} />
          <div className="div-text-in">
            <div className="div-NameAddress">{label}</div>
            <div className="div-text-in-text">{addr.nameUser}</div>
            <div className="div-text-in-text">{addr.address}</div>
            <button className="button-eidt" onClick={() => handleSelectAddress(addr.id)}>
              giao tới địa chỉ này
            </button>
            <FontAwesomeIcon className="penhouse" icon={faPenToSquare} onClick={() => openEditModal(addr.id)} />
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
            <button className="button-eidt" onClick={() => openModal(status)}>
              Thêm
            </button>
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
            <div className="div3">Thanh toán đơn hàng</div>
            <div className="div5">
              <div>
                <label className="The-text">Chọn địa chỉ giao hàng</label>
              </div>
              {showWarning && <div className="warning-message">Bạn hãy chọn địa chỉ </div>}
              <div className="div4">
                <div className="itemG">
                  <FontAwesomeIcon className="div-icon" icon={faLocationDot} />
                  <div className="div-text-in">
                    <div className="div-NameAddress">Other</div>
                    <div className="div-text-in-text">Thêm địa chỉ giao hàng mới</div>
                    <button className="button-eidt-b" onClick={() => openModal(0)}>
                      Thêm địa chỉ giao hàng mới
                    </button>
                  </div>
                </div>
                {renderAddressDiv(1, faHouse, 'Home')}
                {renderAddressDiv(2, faBriefcase, 'Work')}
                {address.map(
                  (addr, index) =>
                    addr.status === 0 && (
                      <div
                        className={`itemG other ${selectedAddressId === addr.id ? 'selected' : ''}`}
                        key={index}
                      >
                        <FontAwesomeIcon className="exit-icon" icon={faCircleXmark} onClick={() => openDeleteModal(addr.id)} />
                        <FontAwesomeIcon className="div-icon ms-10" icon={faLocationDot} />
                        <div className="div-text-in">
                          <div className="div-NameAddress">Other</div>
                          <div className="div-text-in-text">{addr.address}</div>
                          <button className="button-eidt" onClick={() => handleSelectAddress(addr.id)}>
                            giao tới địa chỉ này
                          </button>
                          <FontAwesomeIcon className="penhouse" icon={faPenToSquare} onClick={() => openEditModal(addr.id)} />
                        </div>
                      </div>
                    )
                )}
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
                  <label className="label-hihi">Ghi chú cho cửa hàng</label>
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
              <div className="cart-restaurant">
                <div className="title-cart">{shop.name}</div>
                <div className="restaurant-cart">
                  {cart.map((item) => (
                    <div key={item.id}>
                      <div className="">
                        <div className="row">
                          <div className="col-5 name-cart">{item.product.name}</div>
                          <div className="inputQuantity col-3">
                            <button className="btnQuantity" onClick={() => handleMinus(item.id)}>
                              -
                            </button>
                            <input type="text" className="quantity-value" value={item.quantity} readOnly />
                            <button className="btnQuantity" onClick={() => handlePlus(item.id)}>
                              +
                            </button>
                          </div>
                          <div className="col-4 price-cart">{formatNumberWithCommas(item.product.price * item.quantity)} đ</div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="restaurant-checkout">
                  <div className="restaurant-price">
                    <FontAwesomeIcon className="iconWallet" icon={faWallet} />
                    <span className="sumPrice">Tổng: {formatNumberWithCommas(sum)} đ</span>
                  </div>
                  <form className="payment-form" onSubmit={CreateOrder}>
                    <button type="submit" className="payment-button">
                      + Xác nhận thanh toán
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
        <div className="modal-father">
          <div className="modal-con">
            <h2>Thêm địa chỉ mới</h2>
            <form className="form-cute" onSubmit={handleSubmitAddress}>
                <input className="text-cute" type="text" onChange={handleInput} name="name" placeholder="Tên khách hàng"  />
                {errors.name && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.name}</p>}
                <input className="text-cute" type="text" onChange={handleInput} name="details" placeholder="Địa chỉ nhận hàng"  />
                {errors.details && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.details}</p>}
                <input className="text-cute" type="text" onChange={handleInput} name="contact" placeholder="Số điện thoại nhận hàng"  />
                {errors.contact && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.contact}</p>}
              <button className="button-good" type="submit">
                Xác nhận
              </button>
            </form>
            <button style={{ width: '100%' }} onClick={() => setIsModalOpen(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}
     {isModalEdit && (
        <div className="modal-father">
          <div className="modal-con">
            <h2>Cập nhật địa chỉ</h2>

              <form className="form-cute" onSubmit={handleUpdateAddress}>
                <input className="text-cute" type="text" onChange={handleInput} name="name" placeholder="Tên khách hàng" defaultValue={addressToEdit.nameUser} />
                {errors.name && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.name}</p>}
                <input className="text-cute" type="text" onChange={handleInput} name="details" placeholder="Địa chỉ nhận hàng" defaultValue={addressToEdit.address} />
                {errors.details && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.details}</p>}
                <input className="text-cute" type="text" onChange={handleInput} name="contact" placeholder="Số điện thoại nhận hàng" defaultValue={addressToEdit.phoneNumber} />
                {errors.contact && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.contact}</p>}
                <button className="button-good" type="submit">Cập nhật</button>
              </form>



            <button style={{ width: '100%' }} onClick={() => setIsModalEdit(false)}>Hủy
            
            </button>
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="modal-d">
          <div className="modal-a">
            <h2>Xác nhận xóa địa chỉ</h2>
            <p>Bạn có chắc chắn muốn xóa địa chỉ này không?</p>
            <button className="button-delecute" onClick={handleDeleteAddress}>
              Xóa
            </button>
            <button className="cancle" onClick={() => setIsDeleteModalOpen(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}
        <FooterHome />
      </div>
    );
  }