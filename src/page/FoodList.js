import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/LayoutMarchant.css';
import '../css/cs.css';
import '../css/table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPenSquare, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import HeaderMerchant from "../compoment/HeadMerchant.js";
import { Link } from "react-router-dom";

function FoodList() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const params = useParams();

    async function findByNameAndMenu(menuId, productName) {
        try {
            const productResponse = await axios.get(`http://localhost:8080/api/products/FindByPByName/${menuId}?productName=${productName}`);
            document.title = "Danh sách sản phẩm của shop";
            return productResponse.data;
        } catch (error) {
            console.error('Error fetching product data:', error);
            return [];
        }
    }
 
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/menus/${params.id}`);
            const menus = response.data;

            let allProducts = [];

            for (const menu of menus) {
                const menuId = menu.id;
                const products = await findByNameAndMenu(menuId, searchQuery);
                allProducts = [...allProducts, ...products];
            }

            setProducts(allProducts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    function formatNumberWithCommas(number) {
        return number.toLocaleString('de-DE');
    }

    useEffect(() => {
        fetchData();
    }, [params.id, searchQuery]);

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchData();

    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/products/${id}`, { status: newStatus });
            setProducts(products.map(product => product.id === id ? { ...product, status: newStatus } : product));
        } catch (error) {
            console.error('Error updating product status:', error);
        }

    };

    return (
        <>
            <HeaderMerchant />
            <div className="container">
                <div className="container row mt-3">
                    <div className="col-xs-12 col-md-6 title">
                        <Link className="btnSave" to={`/createFood/${params.id}`}>+ Thêm Sản Phẩm</Link>
                    </div>
                    <form className="col-xs-12 col-md-6 right" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-primary" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>
                </div>

                {currentProducts.length > 0 && (
                    <table className="table table-image">
                        <thead>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Số lượng món ăn</th>
                                <th scope="col">Chi tiết</th>
                                <th scope="col">Công cụ</th>
                                <th scope="col">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{formatNumberWithCommas(product.price)} VND</td>
                                    <td><img className='image' src={`http://localhost:8080/img/${product.image}`} alt="" /></td>
                                    <td>{product.quantity} sản phẩm</td>
                                    <td>{product.detail}</td>
                                    <td>
                                        <FontAwesomeIcon className="icon" icon={faTrash} />
                                        <FontAwesomeIcon className="icon" icon={faPenSquare} />
                                    </td>
                                    <td>
                                        <div className="centered-cell">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={`flexSwitchCheckDefault-${product.id}`}
                                                    checked={product.status === 1}
                                                    onChange={(e) => handleStatusChange(product.id, e.target.checked ? 1 : 0)}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                    </table>

                )}

                {/* Pagination */}
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={prevPage} className="page-link">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </li>
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? 'disabled' : ''}`}>
                        <button onClick={nextPage} className="page-link">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default FoodList;