import HeadMerchant from './compoment/HeadMerchant';
import CreateMerchant from './page/CreateMerchant';
import UpdateMerchant from './page/UpdateMerchant';
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateNewFood from './page/CreateNewFood';
import FoodList from './page/FoodList';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeMerchant from './page/HomeMerchant';
import ListOrderShop from './page/order/ListOrderShop';
import ListOrderUser from './page/order/ListOrderUser';
import HomeProduct from './Product/HomeProduct';
import OrderAndListOrderItem from './Product/OrderAndListOrderItem';
import DetailProductMerchant from './page/DetailProductMerchant';
import DetailsShopMerchant from './page/DetailsShopMerchant';
import { ToastContainer, toast } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ListProduct from './Product/ListProduct';

function App() {
  return (
    <>
      <div >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ListProduct />} ></Route>
            <Route path='/detailShop/:id' element={<DetailsShopMerchant />} ></Route>
            <Route path='/create' element={<CreateMerchant />} ></Route>
            <Route path='/updateShop/:id' element={<UpdateMerchant />} ></Route>
            <Route path="/createFood/:id" element={<CreateNewFood />}></Route>
            <Route path="/foodList/:id" element={<FoodList />}></Route>
            <Route path='/HomeProduct/:id' element={<HomeProduct />} ></Route>
            <Route path='/OrderAndListOrderItem' element={<OrderAndListOrderItem />} ></Route>
            <Route path='/ListOrderShop/:id' element={<ListOrderShop />} ></Route>
            <Route path='/ListOrderUser/:id' element={<ListOrderUser />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
