import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../css/cs.css';
import HeaderMerchant from "../compoment/HeadMerchant.js";
import Validation from "./Validate/ValidateMerchant.js";

function UpdateMerchant() {
    const navigate = useNavigate();
    const params = useParams();
    const [image, setImage] = useState(null);
    const [idCity, setIdCity] = useState([]);
    const [selectedCityId, setSelectedCityId] = useState('');
    const [idCategory, setIdCategory] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    const [values, setValues] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        timeStart: '',
        timeEnd: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const responseCity = await axios.get(`http://localhost:8080/api/cities`);
                const responseCategory = await axios.get(`http://localhost:8080/api/categories`);
                const responseMerchant = await axios.get(`http://localhost:8080/api/shops/${params.id}`);

                setIdCity(responseCity.data);
                setIdCategory(responseCategory.data);

                const dataMerchant = responseMerchant.data;
                setValues({
                    name: dataMerchant.name,
                    address: dataMerchant.address,
                    phoneNumber: dataMerchant.phoneNumber,
                    email: dataMerchant.email,
                    timeStart: dataMerchant.timeStart,
                    timeEnd: dataMerchant.timeEnd,
                });

                // Set selected values from fetched data, or keep default
                setSelectedCityId(dataMerchant.idCity || responseCity.data[0].id);
                setSelectedCategoryId(dataMerchant.idCategory || responseCategory.data[0].id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, [params.id]);

    function handleInput(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }

    async function CreateMerchant(event) {
        event.preventDefault();

        const validationErrors = Validation(values);
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

        try {
            await axios.put(`http://localhost:8080/api/shops/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating merchant:', error);
        }
    }
 
    function handleCityChange(e) {
        setSelectedCityId(e.target.value);
    }

    function handleCategoryChange(e) {
        setSelectedCategoryId(e.target.value);
    }

    return (
        <>
            <HeaderMerchant />
            <form onSubmit={CreateMerchant}>
                <div className='container'>
                    <div className='containerCreate'>
                        <div className='title'>Chỉnh sửa thông tin quán</div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Tên quán</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInput}
                                    className="form-control"
                                    id="name" />
                                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Địa chỉ</label>
                            <div className="col-sm-10">
                                <input type="text"
                                    name="address"
                                    value={values.address}
                                    onChange={handleInput}
                                    className="form-control" id="text" />
                                {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                            </div>
                        </div>

                        <div className="row mb-3 contai">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Email</label>
                            <div className="col-sm-4">
                                <input type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInput}
                                    className="form-control" id="email" />
                                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>
                            <label className="col-sm-2 col-form-label label-center"><span className='warning'>*</span> Số điện thoại</label>
                            <div className="col-sm-4">
                                <input type="number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleInput}
                                    className="form-control" id="phoneNumber" />
                                {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
                            </div>
                        </div>


                        <div className="row mb-3 contai">
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
                            <label className="col-sm-2 col-form-label label-center"><span className='warning'>*</span> Danh mục</label>
                            <div className="col-sm-4 ">
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

                        <div className="row mb-3 contai">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Giờ mở cửa</label>
                            <div className="col-sm-4">
                                <input type="time"
                                    name="timeStart"
                                    value={values.timeStart}
                                    onChange={handleInput}
                                    className="form-control" id="namme" />
                                {errors.timeStart && <p style={{ color: "red" }}>{errors.timeStart}</p>}
                            </div>
                            <label className="col-sm-2 col-form-label label-center"><span className='warning'>*</span> Giờ đóng cửa</label>
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
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Ảnh</label>
                            <div className="col-sm-10">
                                <input type="file" name="image"
                                    onChange={handleImageChange} className="form-control" id="image" />
                                {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"></label>
                            <div className='col'>
                                <Link to={"/"} className='btnBack'>Quay lại</Link>
                                <button type="submit" className="btnSave">
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default UpdateMerchant;