import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import HeadMerchant from "../compoment/HeadMerchant";
import "../css/LayoutMarchant.css";
import Validation from "./Validate/ValidationFood.js";

export default function CreateNewFood() {
    const params = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [menus, setMenus] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState(null); // Sửa lại để không có giá trị mặc định
    const [values, setValues] = useState({
        name: '',
        price: '',
        quantity: '',
        detail: '',
    });
    const [errors, setErrors] = useState({});

    async function getListMenu() {
        console.log(menus)
        try {
            const response = await axios.get(`http://localhost:8080/api/menus/${params.id}`);
            const menuData = response.data;
            document.title = "Món ăn của shopper";
            // Nếu danh sách menu rỗng, thêm menu mặc định
            if (menuData.length === 0) {
                setMenus([{ id: 1, name: "Menu mặc định" }]);
                setSelectedMenuId(1); // Đặt menu mặc định là menu đầu tiên
            } else {
                setMenus(menuData);
                setSelectedMenuId(menuData[0].id); // Chọn menu đầu tiên nếu có
            }
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    }

    useEffect(() => {
        getListMenu();
    }, []);
    function handleInput(event) {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });

    }

    function handleMenuChange(e) {
        setSelectedMenuId(e.target.value);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }

    async function handleSubmit(event) {
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
        formData.append("price", values.price);
        formData.append("quantity", values.quantity);
        formData.append("detail", values.detail);
        formData.append("image", image);
        formData.append('menus', selectedMenuId);

        try {
            await axios.post("http://localhost:8080/api/products", formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate(`/foodList/${params.id}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    return (
        <div>
            <HeadMerchant />
            <div className="container">
                <div className="containerCreate ">
                    <div className="title">Thông tin món ăn mới</div>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Tên món ăn</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleInput}
                                    className="form-control"
                                    id="name"
                                    value={values.name}
                                />
                                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Giá</label>
                            <div className="col-sm-10">
                                <div className="contai">
                                <input
                                    type="number"
                                    name="price"
                                    onChange={handleInput}
                                    className="form-control-b"
                                    id="price"
                                    value={values.price}
                                />
                                 <label className="col-sm-2 col-form-label-b"><span className='warning'>*</span>Số lượng</label>
                                   <input
                                    type="number"
                                    name="quantity"
                                    onChange={handleInput}
                                    className="form-control-b"
                                    id="quantity"
                                    value={values.quantity}
                                />
                                {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                            </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Danh mục</label>
                            <div className="col-sm-10">
                                <select
                                    className="form-select"
                                    onChange={handleMenuChange}
                                    value={selectedMenuId || ''}
                                >
                                    {menus.map((menu) => (
                                        <option key={menu.id} value={menu.id}>
                                            {menu.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                     
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Mô tả</label>
                            <div className="col-sm-10">
                            <textarea
                              name="detail"
                              onChange={handleInput}
                              className="form-control"
                              id="detail"
                              value={values.detail}
                            />
                                {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-2 col-form-label"><span className='warning'>*</span> Ảnh</label>
                            <div className="col-sm-10">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="form-control"
                                    id="image"
                                />
                                {errors.image && <p style={{ color: "red" }}>{errors.image}</p>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10 offset-sm-2">
                                <Link to={`/foodList/${params.id}`} className='btnBack'>Quay lại</Link>
                                <button type="submit" className="btnSave">Lưu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}