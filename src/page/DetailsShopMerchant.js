import React, { useEffect, useState } from 'react'
import HeadMerchant from '../compoment/HeadMerchant'
import '../css/LayoutMarchant.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DetailsShopMerchant() {
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

    async function getProduct() {
        const response = await axios.get(`http://localhost:8080/api/shops/${params.id}`);
        setId(response.data.id)
        setName(response.data.name);
        setAddress(response.data.address);
        setPhoneNumber(response.data.phoneNumber);
        setEmail(response.data.email);
        setImage(response.data.image);
        setTimeStart(response.data.timeStart);
        setTimeEnd(response.data.timeEnd);
        setNameCity(response.data.idCity.name);
        setNameCategory(response.data.idCategory.name);
    }

    useEffect(() => {
        getProduct();
        document.title = "Chi tiết shop";
    }, []);

    return (
        <div>
            <HeadMerchant />
            <div className="container">
                <div className="containerDetails">
                    <div className='header-name'>
                        <div className="title">Thông tin chi tiết quán - {name} </div>
                        <Link to={`/updateShop/${id}`} className='carShopAction'>Sửa</Link>
                    </div>

                    <div className='row'>
                        <img src={`http://localhost:8080/img/${image}`}></img>
                    </div>
                    <div className="row mb-3">
                        <label class="col-sm-full col-form-label">Tên quán: {name} </label>

                    </div>
                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label label-center">Danh mục</label>
                        <label class="col-sm-2 col-form-label label-center">{nameCategory}</label>

                    </div>
                    <div className="row mb-3 contai">
                        <label class="col-sm-2 col-form-label">Email</label>

                        <div className="col-sm-4">
                            <label class="col-sm-2 col-form-label">{email}</label>
                        </div>
                        <label class="col-sm-2 col-form-label label-center">Số điện thoại</label>
                        <div className="col-sm-4">
                            <label class="col-sm-full col-form-label">{phoneNumber}</label>
                          
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Thành phố</label>
                        <div className="col-md-4">
                            <label className="col-sm-full col-form-label">{nameCity}</label>

                        </div>
                        <label class="col-sm-2 col-form-label">Địa chỉ </label>
                        <div className="col-sm-4">
                            <label class="col-sm-2 col-form-label">{address}</label>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label ">Giờ mở cửa</label>
                        <div className="col-sm-4">
                            <label class="col-sm-2 col-form-label ">{timeStart}</label>

                        </div>
                        <label class="col-sm-2 col-form-label label-center">Giờ đóng</label>
                        <div className="col-sm-4">
                            <label class="col-sm-2 col-form-label ">{timeEnd}</label>
                        </div>
                    </div>
                    <Link to={`/foodList/${params.id}`} className='carShopAction mrBotton'>Danh sách sản phẩm</Link>
                    <Link to={`/ListOrderShop/${params.id}`} className='carShopAction'>Đơn hàng của shop</Link>

                </div>
            </div>

        </div>
    )
}