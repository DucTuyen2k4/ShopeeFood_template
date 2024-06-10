import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadMerchant from "../compoment/HeadMerchant.js";
import "../css/LayoutMarchant.css";
import Validation from "./Validate/ValidateMerchantCreate.js";
export default function CreateMerchant() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [idCity, setIdCity] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState(1);
    const [idCategory, setIdCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [values, setValues] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        timeStart: '',
        timeEnd: ''
    });
    const [errors, setErrors] = useState({});
    function handleInput(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        // Clear error message when the user starts typing
        setErrors({ ...errors, [name]: '' });
    }
    async function CreateMerchant(event) {
        event.preventDefault();
        try {
            const validationErrors = Validation(values); // Assuming Validation function returns errors object
            if (Object.keys(validationErrors).length !== 0) {
                setErrors(validationErrors);
                return;
            }
            if (!image) {
                setErrors({ ...errors, image: "Cần có ảnh" });
                return;
            }
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("address", values.address);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("email", values.email);
            formData.append("timeStart", values.timeStart);
            formData.append("timeEnd", values.timeEnd);
            formData.append("image", image);
            formData.append('idCity', selectedCityId);
            formData.append('idCategory', selectedCategoryId);
            const response = await axios.post(`http://localhost:8080/api/shops`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate('/homeMerchant');
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }
    async function getListCity() {
        try {
            const response = await axios.get(`http://localhost:8080/api/cities`);
            setIdCity(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    }
    useEffect(() => {
        getListCity();
    }, []);
    async function getListCategory() {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories`);
            setIdCategory(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    }
    useEffect(() => {
        getListCategory();
    }, []);

    function handleCityChange(e) {
        setSelectedCityId(e.target.value);
    }
    function handleCategoryChange(e) {
        setSelectedCategoryId(e.target.value);
    }
    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }
return (
    <div>
        <HeadMerchant />
        <div className="container">
            <div className="containerCreate ">
                <div className="title">Thông tin đăng ký quán</div>

                <form onSubmit={CreateMerchant} >
                    <div className="row mb-3">

                        <label class="col-sm-2 col-form-label"><span className='warning'>*</span> Tên quán </label>
                        <div className="col-sm-10">
                            <input type="text"
                                placeholder="Tên quán"
                                name="name"
                                class="form-control"
                                onChange={handleInput}
                                id="name" />
                            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label"><span className='warning'>*</span>  Địa chỉ </label>
                        <div className="col-sm-10">
                            <input type="text"
                                name="address"
                                placeholder="Địa chỉ cụ thể quán"
                                onChange={handleInput}
                                class="form-control" id="text" />
                            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                        </div>
                    </div>
                    <div className="row mb-3 contai">

                        <label class="col-sm-2 col-form-label">
                            <span className="warning">*</span> Email
                        </label>
                        <div className="col-sm-4">

                            <input type="email"
                                name="email"
                                placeholder="Nhập email"
                                onChange={handleInput}
                                class="form-control" id="email" />
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <label class="col-sm-2 col-form-label label-center"><span className='warning'>*</span> Số điện thoại</label>
                        <div className="col-sm-4">

                            <input type="text"
                                name="phoneNumber"
                                placeholder="Số điện thoại bàn hoặc di động"
                                onChange={handleInput}
                                class="form-control" id="phoneNumber" />
                            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label"><span className='warning'>*</span>  Thành phố</label>
                        <div className="col-md-4">
                            <select class="form-select"
                                onChange={handleCityChange}
                                value={selectedCityId}>
                                {idCity.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label class="col-sm-2 col-form-label label-center"><span className='warning'>*</span>  Danh mục</label>
                        <div className="col-sm-4">
                            <select class="form-select"
                                onChange={handleCategoryChange}
                                value={selectedCategoryId}>
                                {idCategory.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label "><span className='warning'>*</span> Giờ mở cửa</label>
                        <div className="col-sm-4">
                            <input type="time"
                                name="timeStart"

                                onChange={handleInput}
                                class="form-control" id="namme" />
                            {errors.timeStart && <p style={{ color: "red" }}>{errors.timeStart}</p>}
                        </div>
                        <label class="col-sm-2 col-form-label label-center">
                            <span className="warning">*</span> Giờ đóng cửa
                        </label>
                        <div className="col-sm-4">
                            <input type="time"
                                name="timeEnd"
                                value={values.timeEnd}
                                onChange={handleInput}
                                class="form-control" id="namme" />
                            {errors.timeStart && <p style={{ color: "red" }}>{errors.timeStart}</p>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label">
                            <span className="warning">*</span> Ảnh
                        </label>
                        <div className="col-sm-10">
                            <input type="file" name="image"
                                onChange={handleImageChange} class="form-control" id="image" />
                            {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label class="col-sm-2 col-form-label"></label>
                        <div className='col'>
                            <Link to={"/homeMerchant"} className=' btnBack'>Quay lại</Link>
                            <button type="submit" className="btnSave">
                                Lưu
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

}


