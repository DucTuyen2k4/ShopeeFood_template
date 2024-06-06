import React, { useEffect, useState } from 'react'
import HeadHome from '../compoment/HeadHome'
import '../css/ListProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faThumbsUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FooterHome from '../compoment/FooterHome';
import axios from 'axios';
export default function ListProduct() {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    async function listProduct() {
        const response = await axios.get("http://localhost:8080/api/shops")
        console.log(response.data);
        setProduct(response.data);
    }
    useEffect(() => {
        listProduct();
    }, []);
    return (
        <div className='wrapper'>
            <HeadHome />
            <div className='container'>
                <div className="now-search-filter">
                    <div className="nav-filter clearfix">
                        <div className="list-filter">
                            <div className="item-filter ">
                                <span className="dropdown-toggle" id="District">Khu vực</span>
                                <div className="container-box-filter">
                                    <div className="content">
                                        <div className="custom-checkbox">
                                            <input type="checkbox" data-text="Quận 1" id="district 1" />
                                            <label for="district 1">Quận 1</label></div><div className="custom-checkbox">
                                            <input type="checkbox" data-text="Gò Vấp" id="district 2" />
                                            <label for="district 2">Gò Vấp</label>
                                        </div>
                                        <div className="custom-checkbox">
                                            <input type="checkbox" data-text="Quận 2" id="district 4" />
                                            <label for="district 4">Quận 2</label>
                                        </div><div className="custom-checkbox">
                                            <input type="checkbox" data-text="Quận 3" id="district 5" />
                                            <label for="district 5">Quận 3</label>
                                        </div><div className="custom-checkbox">
                                            <input type="checkbox" data-text="Quận 4" id="district 6" />
                                            <label for="district 6">Quận 4</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="item-filter ">
                                <span className="dropdown-toggle" id="Category">Phân loại</span>
                                <div className="container-box-filter">
                                    <div className="content">
                                        <div>
                                            <div className="custom-checkbox">
                                                <input type="checkbox" data-text="Đồ ăn" id="category 1000000" />
                                                <label for="category 1000000">Đồ ăn</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="custom-checkbox">
                                                <input type="checkbox" data-text="Đồ uống" id="category 1000001" />
                                                <label for="category 1000001">Đồ uống</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="float-right">
                            <div className="result">200 Kết quả</div>
                            <select className="filter-sort"><option value="8">Đúng nhất</option>
                                <option value="3">Gần tôi</option>
                                <option value="36">Đánh giá</option>
                                <option value="35">Bán chạy</option>
                                <option value="37">Giao nhanh</option>
                            </select>
                        </div>
                        <div className="tag-filter">
                        </div>
                    </div>
                </div>
                <div classNameName='now-list-restaurant'>
                    <div classNameName='list-restaurant'>
                        {product.map((product) => (
                            <div className="item-restaurant">
                                <Link to={`/HomeProduct/${product.id}`} target="_blank" className="item-content">
                                    <div className="img-restaurant">
                                        <div className="tag-preferred">
                                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>Yêu thích
                                        </div>
                                        <img src={`http://localhost:8080/img/${product.image}`} className="" />
                                    </div>
                                    <div className="info-restaurant">
                                        <div className="info-basic-res">
                                            <h4 className="name-res">
                                                <span className="icon icon-quality-merchant"></span>{product.name}
                                            </h4>
                                            <div className="address-res" >{product.address}</div>
                                        </div>
                                        <p className="content-promotion">
                                            <FontAwesomeIcon icon={faTag} className="fas" /> Giảm món
                                        </p>
                                        <div className="opentime-status">
                                            <span className="stt online" title="Mở cửa" ></span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Pagination */}
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={prevPage} className="page-link">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </li>
                {Array.from({ length: Math.ceil(product.length / productsPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === Math.ceil(product.length / productsPerPage) ? 'disabled' : ''}`}>
                    <button onClick={nextPage} className="page-link">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </li>
            </ul>
            <FooterHome />
        </div >
    )
}
