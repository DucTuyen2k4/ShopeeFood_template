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

    // Function to handle input changes
    function handleInput(event) {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
        // Clear error message when the user starts typing
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }

    // Function to handle image change
    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Validate form values
            const validationErrors = Validation(values);
            if (Object.keys(validationErrors).length !== 0) {
                setErrors(validationErrors);
                return;
            }
            // Check if an image is selected
            if (!image) {
                setErrors({ ...errors, image: "Cần có ảnh" });
                return;
            }
            // Prepare form data for submission
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

            // Send POST request to create merchant
            const response = await axios.post(`http://localhost:8080/api/shops`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // Navigate to home page after successful creation
            navigate('/homeMerchant');
            console.log('Merchant created:', response.data);
        } catch (error) {
            console.error('Error creating merchant:', error);
        }
    }

    // Fetch list of cities from API
    async function fetchCities() {
        try {
            const response = await axios.get(`http://localhost:8080/api/cities`);
            setIdCity(response.data);

            if (response.data.length > 0) {
                const firstCityId = response.data[0].id;
                setSelectedCityId(firstCityId);
                fetchCategories(firstCityId); // Fetch categories for the first city
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    // Fetch list of categories from API
    async function fetchCategories(idCity) {
        try {
            const response = await axios.get(`http://localhost:8080/api/categories/idCity/${idCity}`);
            setIdCategory(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    // useEffect to fetch cities when component mounts
    useEffect(() => {
        fetchCities();
    }, []);

    // Function to handle city selection
    function handleCityChange(e) {
        const selectedCity = e.target.value;
        setSelectedCityId(selectedCity);
        fetchCategories(selectedCity); // Fetch categories when a new city is selected
    }

    // Function to handle category selection
    function handleCategoryChange(e) {
        setSelectedCategoryId(e.target.value);
    }

    return (
        <div>
            <HeadMerchant />
            <div className="container">
                <div className="containerCreate ">
                    <div className="title">Thông tin đăng ký quán</div>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Tên quán </label>
                            <div className="col-sm-10">
                                <input type="text"
                                    placeholder="Tên quán"
                                    name="name"
                                    className="form-control"
                                    onChange={handleInput}
                                    id="name" />
                                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span>  Địa chỉ </label>
                            <div className="col-sm-10">
                                <input type="text"
                                    name="address"
                                    placeholder="Địa chỉ cụ thể quán"
                                    onChange={handleInput}
                                    className="form-control" id="text" />
                                {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                            </div>
                        </div>
                        <div className="row mb-3 contai">
                            <label className="col-sm-2 col-form-label">
                                <span className="warning">*</span> Email
                            </label>
                            <div className="col-sm-4">
                                <input type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    onChange={handleInput}
                                    className="form-control" id="email" />
                                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>
                            <label className="col-sm-2 col-form-label label-center"><span className='warning'>*</span> Số điện thoại</label>
                            <div className="col-sm-4">
                                <input type="text"
                                    name="phoneNumber"
                                    placeholder="Số điện thoại bàn hoặc di động"
                                    onChange={handleInput}
                                    className="form-control" id="phoneNumber" />
                                {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span>  Thành phố</label>
                            <div className="col-md-4">
                                <select className="form-select"
                                    onChange={handleCityChange}
                                    value={selectedCityId}>
                                    {idCity.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <label className="col-sm-2 col-form-label label-center"><span className='warning'>*</span>  Danh mục</label>
                            <div className="col-sm-4">
                                <select className="form-select"
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
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Giờ mở cửa</label>
                            <div className="col-sm-4">
                                <input type="time"
                                    name="timeStart"
                                    onChange={handleInput}
                                    className="form-control" id="namme" />
                                {errors.timeStart && <p style={{ color: "red" }}>{errors.timeStart}</p>}
                            </div>
                            <label className="col-sm-2 col-form-label label-center">
                                <span className="warning">*</span> Giờ đóng cửa
                            </label>
                            <div className="col-sm-4">
                                <input type="time"
                                    name="timeEnd"
                                    value={values.timeEnd}
                                    onChange={handleInput}
                                    className="form-control" id="namme" />
                                {errors.timeEnd && <p style={{ color: "red" }}>{errors.timeEnd}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">
                                <span className="warning">*</span> Ảnh
                            </label>
                            <div className="col-sm-10">
                                <input type="file" name="image"
                                    onChange={handleImageChange} className="form-control" id="image" />
                                {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"></label>
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
