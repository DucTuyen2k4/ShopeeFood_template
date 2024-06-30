// import { keyboard } from "@testing-library/user-event/dist/keyboard";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useNavigation } from "react-router-dom";
// import '../css/cs.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faExclamation } from "@fortawesome/free-solid-svg-icons";
// import HeaderMerchant from "../compoment/HeadMerchant.js";
// function CreateNewFood() {
//     // const navigation = useNavigation();
//     const navigate = useNavigate()
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [image, setImage] = useState(null);
//     const [detail, setDetail] = useState('');
//     const [menus, setMenus] = useState([]);
//     const [selectedMenuId, setSelectedMenuId] = useState(1); // Mặc định chọn menu đầu tiên
//     const createProduct = async (event) => {
//         event.stopPropagation();
//         event.preventDefault();
 
//         var formData = new FormData();
//         formData.append('name', name);
//         formData.append('price', price);
//         formData.append('quantity', quantity);
//         formData.append('image', image);
//         formData.append('detail', detail);
//         formData.append('menus', selectedMenuId);

//         try {
//             await axios.post(`http://localhost:8080/api/products`, formData, {
//                 headers: { 'Content-Type': `multipart/form-data;` },
//             })
//             navigate('/')
//         } catch (error) {
//             console.error(error)
//         }

//     }


//     async function getListMenu() {
//         try {
//             const response = await axios.get(`http://localhost:8080/menus`);
//             setMenus(response.data);
//         } catch (error) {
//             console.error('Error fetching menus:', error);
//         }
//     }

//     useEffect(() => {
//         getListMenu();
//     }, []);

//     function handleMenuChange(e) {
//         const selectedValue = e.target.value;
//         setSelectedMenuId(selectedValue);
//     }

//     function handleImageChange(e) {
//         const file = e.target.files[0];
//         setImage(file);
//     }

//     return (
//         <>
//             {/* <HeaderMerchant /> */}

//             <section className="vh-100" style={{ backgroundColor: '#ffffff' }}>
//                 <form onSubmit={createProduct}>
//                     <div className="container h-100">
//                         <div className="row d-flex justify-content-center align-items-center h-100">
//                             <div className="col-xl-9">
//                                 <div className="card" style={{ borderRadius: '15px' }}>
//                                     <div className="card-body">
//                                         <div className="row align-items-center pt-4 pb-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">Tên</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <input
//                                                     type="text"
//                                                     onChange={(e) => {
//                                                         if (e.target.value.trim() !== '') {
//                                                             setName(e.target.value);
//                                                         }
//                                                     }}
//                                                     className="form-control form-control-lg"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="row align-items-center pt-4 pb-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">Giá</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <input type="number" onChange={(e) => setPrice(e.target.value)} className="form-control form-control-lg" />
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="row align-items-center pt-4 pb-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">Danh mục</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <select className="form-select" onChange={handleMenuChange} value={selectedMenuId}>
//                                                     {menus.map((menu) => (
//                                                         <option key={menu.id} value={menu.id}>
//                                                             {menu.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="row align-items-center pt-4 pb-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">Số lượng</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <input type="number" onChange={(e) => setQuantity(e.target.value)} className="form-control form-control-lg" />
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="row align-items-center pt-4 pb-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">Mô tả</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <input type="text" onChange={(e) => setDetail(e.target.value)} className="form-control form-control-lg" />
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="row align-items-center py-3">
//                                             <div className="col-md-3 ps-5">
//                                                 <h6 className="mb-0">HÌnh ảnh món ăn</h6>
//                                             </div>
//                                             <div className="col-md-9 pe-5">
//                                                 <input type="file" onChange={handleImageChange} id="formFileLg" className="form-control  form-control-lg" />
//                                             </div>
//                                         </div>
//                                         <hr className="mx-n3" />
//                                         <div className="px-5 py-4">
//                                             <input type="submit" value={"Luu"} className="btn btn-primary btn-lg" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </section>
//         </>
//     );
// }

// export default CreateNewFood;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import '../css/cs.css';
// import HeaderMerchant from "../compoment/HeadMerchant.js";
// import Validation from "./Validation.js";

// function UpdateMerchant() {
//     const navigate = useNavigate();
//     const params = useParams();
//     const [image, setImage] = useState(null);
//     const [idCity, setIdCity] = useState([]);
//     const [selectedCityId, setSelectedCityId] = useState(1);
//     const [idCategory, setIdCategory] = useState([]);
//     const [selectedCategoryId, setSelectedCategoryId] = useState(1);

//     const [values, setValues] = useState({
//         name: '',
//         address: '',
//         phoneNumber: '',
//         email: '',
//         timeStart: '',
//         timeEnd: ''
//     });
//     const [errors, setErrors] = useState({});

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const responseCity = await axios.get(`http://localhost:8080/api/cities`);
//                 const responseCategory = await axios.get(`http://localhost:8080/api/categories`);
//                 const responseMerchant = await axios.get(`http://localhost:8080/api/shops/${params.id}`);

//                 setIdCity(responseCity.data);
//                 setIdCategory(responseCategory.data);

//                 const dataMerchant = responseMerchant.data;
//                 setValues({
//                     name: dataMerchant.name,
//                     address: dataMerchant.address,
//                     phoneNumber: dataMerchant.phoneNumber,
//                     email: dataMerchant.email,
//                     timeStart: dataMerchant.timeStart,
//                     timeEnd: dataMerchant.timeEnd
//                 });
//                 setSelectedCityId(dataMerchant.idCity);
//                 setSelectedCategoryId(dataMerchant.idCategory);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         fetchData();
//     }, [params.id]);

//     function handleInput(event) {
//         const { name, value } = event.target;
//         setValues({ ...values, [name]: value });
//         setErrors({ ...errors, [name]: '' });
//     }

//     function handleImageChange(e) {
//         const file = e.target.files[0];
//         setImage(file);
//     }

//     async function CreateMerchant(event) {
//         event.preventDefault();

//         // Validation
//         const validationErrors = Validation(values);
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }


//         const formData = new FormData();
//         formData.append("name", values.name);
//         formData.append("address", values.address);
//         formData.append("phoneNumber", values.phoneNumber);
//         formData.append("email", values.email);
//         formData.append("timeStart", values.timeStart);
//         formData.append("timeEnd", values.timeEnd);
//         formData.append("image", image);
//         formData.append('idCity', selectedCityId);
//         formData.append('idCategory', selectedCategoryId);

//         try {
//             await axios.put(`http://localhost:8080/api/shops/${params.id}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             navigate('/');
//         } catch (error) {
//             console.error('Error updating merchant:', error);
//         }
//     }

//     function handleCityChange(e) {
//         setSelectedCityId(e.target.value);
//     }

//     function handleCategoryChange(e) {
//         setSelectedCategoryId(e.target.value);
//     }
//     return (
//         <>
//             <HeaderMerchant />
//             <form onSubmit={CreateMerchant}>
//                 <div className='container' >
//                     <div className='containerCreate '>
//                         <div className='title'>Chỉnh sửa thông tin quán</div>
//                         <div className="row mb-3">

//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span> Tên quán </label>
//                             <div className="col-sm-10">
//                                 <input type="text"
//                                     name="name"
//                                     value={values.name}
//                                     onChange={handleInput}
//                                     class="form-control"
//                                     id="name" />
//                                 {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span> Số điện thoại</label>
//                             <div className="col-sm-10">

//                                 <input type="number"
//                                     name="phoneNumber"
//                                     value={values.phoneNumber}
//                                     onChange={handleInput}
//                                     class="form-control" id="phoneNumber" />
//                                 {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span>  Email</label>
//                             <div className="col-sm-10">
//                                 <input type="email"
//                                     name="email"
//                                     value={values.email}
//                                     onChange={handleInput}
//                                     class="form-control" id="email" />
//                                 {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span>  Địa chỉ </label>
//                             <div className="col-sm-10">
//                                 <input type="text"
//                                     name="address"
//                                     value={values.address}
//                                     onChange={handleInput}
//                                     class="form-control" id="text" />
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label className="col-sm-2 col-form-label"><span className='warning'>*</span>  Thành phố</label>
//                             <div className="col-md-9 pe-5">
//                                 <select className="form-select"
//                                     onChange={handleCityChange}
//                                     value={selectedCityId}>
//                                     {idCity.map((city) => (
//                                         <option key={city.id} value={city.id}>
//                                             {city.name}
//                                         </option>
//                                     ))}
//                                 </select>


//                             </div>

//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span>  Danh mục</label>
//                             <div className="col-sm-10">
//                                 <select className="form-select"
//                                     onChange={handleCategoryChange}
//                                     value={selectedCategoryId}>
//                                     {idCategory.map((category) => (
//                                         <option key={category.id} value={category.id}>
//                                             {category.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span> Giờ mở cửa</label>
//                             <div className="col-sm-10">
//                                 <input type="time"
//                                     name="timeStart"
//                                     value={values.timeStart}
//                                     onChange={handleInput}
//                                     class="form-control" id="namme" />
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span> Giờ đóng cửa</label>
//                             <div className="col-sm-10">
//                                 <input type="time"
//                                     name="timeEnd"
//                                     value={values.timeEnd}
//                                     onChange={handleInput}
//                                     class="form-control" id="namme" />
//                             </div>
//                         </div>
//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"><span className='warning'>*</span>  Ảnh</label>
//                             <div className="col-sm-10">
//                                 <input type="file" name="image"
//                                     onChange={handleImageChange}
//                                     class="form-control" id="image" />
//                             </div>
//                         </div>


//                         <div className="row mb-3">
//                             <label class="col-sm-2 col-form-label"></label>
//                             <div className='col'>
//                                 <Link to={"/"} className=' btnBack'>Quay lại</Link>
//                                 <button type="submit" className="btnSave">
//                                     Lưu
//                                 </button>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </form>
//         </>
//     );
// }

// export default UpdateMerchant;