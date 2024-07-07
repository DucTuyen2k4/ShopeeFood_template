import React, { useEffect, useState } from 'react';
import HeadMerchant from '../compoment/HeadMerchant';
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
                <div className="containerDetails" style={{ fontSize: '20px' }}>
                    <div className='header-name' style={{ fontSize: '20px' }}>
                        <div className="title" style={{ fontSize: '20px' }}>Thông tin chi tiết quán - {name} </div>
                        <Link to={`/updateShop/${id}`} className='carShopAction' style={{ fontSize: '20px' }}>Sửa</Link>
                    </div>

                    <div className='row'>
                        <img src={`http://localhost:8080/img/${image}`} alt="Shop" />
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-full col-form-label" style={{ fontSize: '20px' }}>Tên quán: {name} </label>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label label-center" style={{ fontSize: '20px' }}>Danh mục</label>
                        <label className="col-sm-2 col-form-label label-center" style={{ fontSize: '20px' }}>{nameCategory}</label>
                    </div>
                    <div className="row mb-3 contai">
                        <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>Email</label>
                        <div className="col-sm-4">
                            <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>{email}</label>
                        </div>
                        <label className="col-sm-2 col-form-label label-center" style={{ fontSize: '20px' }}>Số điện thoại</label>
                        <div className="col-sm-4">
                            <label className="col-sm-full col-form-label" style={{ fontSize: '20px' }}>{phoneNumber}</label>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>Thành phố</label>
                        <div className="col-md-4">
                            <label className="col-sm-full col-form-label" style={{ fontSize: '20px' }}>{nameCity}</label>
                        </div>
                        <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>Địa chỉ </label>
                        <div className="col-sm-4">
                            <label className="col col-form-label" style={{ fontSize: '20px' }}>{address}</label>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>Giờ mở cửa</label>
                        <div className="col-sm-4">
                            <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>{timeStart}</label>
                        </div>
                        <label className="col-sm-2 col-form-label label-center" style={{ fontSize: '20px' }}>Giờ đóng</label>
                        <div className="col-sm-4">
                            <label className="col-sm-2 col-form-label" style={{ fontSize: '20px' }}>{timeEnd}</label>
                        </div>
                    </div>
                    <Link to={`/foodList/${params.id}`} className='carShopAction mrBotton' >Danh sách sản phẩm</Link>
                    <Link to={`/ListOrderShop/${params.id}`} className='carShopAction' >Đơn hàng của shop</Link>
                </div>
            </div>
        </div>
    )
}
