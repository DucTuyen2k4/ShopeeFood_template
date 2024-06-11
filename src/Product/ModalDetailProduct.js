import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../css/modal-detailProduct.css";

function ModalDetailProduct(props) {
    const [detailProduct, setDetailProduct] = useState({});
    const { handleClose, show, idDetailProduct } = props;

    function formatNumberWithCommas(number) {
        return number.toLocaleString("de-DE");
    }
    const fetchData = async (idDetailProduct) => {
        if (idDetailProduct) {
            const response = await axios.get(
                `http://localhost:8080/api/products/detailProduct/${idDetailProduct}`
            );
            setDetailProduct(response.data);
        }
    };
    useEffect(() => {
        fetchData(props.idDetailProduct);
    }, [props.idDetailProduct]);

    

    return (
        <>
            <div
                className={`custom-modal ${show ? "show" : ""}`}
                onClick={handleClose}
            >
                <div className="custom-modal-body" onClick={(e) => e.stopPropagation()}>
                    <div className="image-container">
                        <img
                            className="custom-image"
                            src={`http://localhost:8080/img/${detailProduct.image}`}
                            alt={detailProduct.name}
                        />
                        <div className="overlay">
                            <div className="product-name">
                                <span className="name-product" >{detailProduct.name}</span>
                            </div>
                            <div className="productDetail-price">
                                <span className="nameDetail-price" >{detailProduct.price} đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ModalDetailProduct;