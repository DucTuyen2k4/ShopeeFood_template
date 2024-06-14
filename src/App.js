import HeadMerchant from './compoment/HeadMerchant';
import CreateMerchant from './page/CreateMerchant';
import UpdateMerchant from './page/UpdateMerchant';
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateNewFood from './page/CreateNewFood';
import FoodList from './page/FoodList';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeMerchant from './page/HomeMerchant';
import ListOrderShop from './page/order/ListOrderShop';
import Shipper from './page/shipper/ShipperByOrder';
import ShipperReceived from './page/shipper/ShipperReceived';
import ListOrderUser from './page/order/ListOrderUser';
import HomeProduct from './Product/HomeProduct';
import OrderAndListOrderItem from './Product/OrderAndListOrderItem';
import DetailProductMerchant from './page/DetailProductMerchant';
import DetailsShopMerchant from './page/DetailsShopMerchant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TheFirstTemplate from './Product/TheFirstTemplate';

import ListProduct from './Product/ListProduct';



function App() {
  return (
    <>
      <div >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TheFirstTemplate />} ></Route>
            <Route path='/homeMerchant' element={<HomeMerchant />} ></Route>
            <Route path='/detailShop/:id' element={<DetailsShopMerchant />} ></Route>
            <Route path='/create' element={<CreateMerchant />} ></Route>
            <Route path='/updateShop/:id' element={<UpdateMerchant />} ></Route>
            <Route path="/createFood/:id" element={<CreateNewFood />}></Route>
            <Route path="/foodList/:id" element={<FoodList />}></Route>
            <Route path='/HomeProduct/:id' element={<HomeProduct />} ></Route>
            <Route path='/OrderAndListOrderItem/:id' element={<OrderAndListOrderItem />} ></Route>
            <Route path='/ListOrderShop/:id' element={<ListOrderShop />} ></Route>
            <Route path='/shipper' element={<Shipper />} ></Route>
            <Route path='/ShipperReceived' element={<ShipperReceived />} ></Route>
            <Route path='/ListOrderUser/:id' element={<ListOrderUser />} ></Route>
            <Route path='/listProduct' element={<ListProduct />}></Route>
            
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
