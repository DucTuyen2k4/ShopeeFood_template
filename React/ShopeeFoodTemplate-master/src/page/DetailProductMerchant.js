import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HeadMerchant from '../compoment/HeadMerchant'
import axios from 'axios';

export default function DetailProductMerchant() {
    const params = useParams();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [nameCity, setNameCity] = useState('');
    const [nameCategory, setNameCategory] = useState('');

    async function getOder() {
        const response = await axios.get(`http://localhost:8080/api/order/1`);
        // setId(response.data.id)
        // setName(response.data.user.name);
        // setAddress(response.data.user.address);
        // setPhoneNumber(response.data.user.phoneNumber);
        // setEmail(response.data.user.email);
        // setImage(response.data.image);
        // setTimeStart(response.data.timeStart);
        // setTimeEnd(response.data.timeEnd);
        // setNameCity(response.data.idCity.name);
        // setNameCategory(response.data.idCategory.name);
        console.log(response.data);
        console.log(response.data.oderItems.cart.idUser.address);
    }
      
    useEffect(() => {
        getOder();
    }, []);
    return (
        <div>
            <HeadMerchant />
            <div className="container">
                <div className="containerDetails">
                    <div className='header-name'>
                        <div className="title">Thông tin chi tiết sản phẩm </div>
                    </div>

                    <div className='row'>
                        <img src={`http://localhost:8080/img/}`}></img>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Mã Đơn Hàng</label>
                        <div className="col-md-4">
                            <label className="col-sm-2 col-form-label"></label>
                        </div>
                        <label class="col-sm-3 col-form-label">Thời Gian Đặt Hàng</label>
                        <div className="col-sm-4">
                            <label class="col-sm-5 col-form-label"></label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Tên Món</label>
                        <div className="col-md-4">
                            <label className="col-sm-2 col-form-label"></label>

                        </div>
                        <label class="col-sm-2 col-form-label">Số Lượng</label>
                        <div className="col-sm-4">
                            <label class="col-sm-5 col-form-label"></label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Giá Tiền</label>
                        <div className="col-md-4">
                            <label className="col-sm-2 col-form-label"></label>
                        </div>
                        <label class="col-sm-2 col-form-label">Thành Tiền</label>
                        <div className="col-sm-4">
                            <label class="col-sm-5 col-form-label"></label>
                        </div>
                    </div>
                    <hr/>
                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label">Tên Khách Hàng </label>
                        <div className="col-md-4">
                            <label className="col-sm-2 col-form-label"></label>
                        </div>
                        <label class="col-sm-2 col-form-label">Số Điện Thoại</label>
                        <div className="col-sm-4">
                            <label class="col-sm-5 col-form-label"></label>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Địa Chỉ</label>
                        <div className="col-md-4">
                            <label className="col-sm-2 col-form-label"></label>
                        </div>
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-4">
                            <label class="col-sm-5 col-form-label"></label>
                        </div>
                    </div>
                    <Link to={`updateShop/}`} className='carShopAction mrBotton'>Xác nhận đơn </Link>
                    <Link to={`updateShop/}`} className='carShopAction '>Từ chối đơn</Link>

                </div>
            </div>

        </div>
    )
}