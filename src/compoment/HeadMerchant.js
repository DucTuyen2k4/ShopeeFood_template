import React, { useEffect, useState } from 'react'
import HeadMerchant from '../compoment/HeadMerchant'
import '../css/LayoutMarchant.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMagnifyingGlass, faSackDollar, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function HomeMerchant() {
    const [shop, setShop] = useState([]);
    useEffect(() => {
        showShop();
    }, []);
    const showShop = async () => {
        const result = await axios.get("http://localhost:8080/api/shops")
        document.title = "Giao diện chủ shop";
        setShop(result.data);
        console.log(result.data);
    };

    return (
        <div>
            <HeadMerchant />
            <div className='container'>
                <div className='row flex-container mt-4 '>
                    <div className='col-xs-12 col-md-6 title'>Đăng Ký Quán</div>
                    <div className='col-xs-12 col-md-6 right'>
                        <Link to={'/create'} className=' btnCreate'>Tạo quán mới</Link>
                    </div>
                </div>
                <div className='tabContainer'>
                    <span className='textOrange'>Quán của tôi </span>
                </div>
                <div className='listShop'>
                    {shop.map(item => (
                        <div className='carShop'>

                            <Link to={`/detailShop/${item.id}`}>
                                <img className='image' src={`http://localhost:8080/img/${item.image}`} alt="" />
                            </Link>
                            <div className='carShopBody'>
                                <div className='carShopName'>
                                    <span className='carShopNameText'>{item.name}</span>
                                </div>
                                <div className='carShopInfor'>
                                    <span className='carShopTitleText'><FontAwesomeIcon icon={faLocationDot} /> {item.idCity.name} </span>
                                </div>
                                <div className='carShopInfor'>
                                    {/* <span className='carShopTitleText'>Sản Phẩm: {item.idCategory.name} </span> */}
                                    <span className='carShopTitleText'><FontAwesomeIcon icon={faClock} /> {item.timeStart} : {item.timeEnd}</span>
                                </div>
                                {/* <Link to={`updateShop/${item.id}`} className='carShopAction '>Sửa</Link> */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div >
    )
}