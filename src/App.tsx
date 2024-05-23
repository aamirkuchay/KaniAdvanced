import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader/index.js';
import PageTitle from './components/PageTitle.js';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp.jsx';
import Calendar from './pages/Calendar.js';
import Chart from './pages/Chart.js';
import ECommerce from './pages/Dashboard/ECommerce.js';
import Material from './components/Material/Material.jsx';
import AddProduct from './components/Products/AddProduct.jsx';
import FormLayout from './pages/Form/FormLayout.js';
import Profile from './pages/Profile.js';
import Settings from './pages/Settings.js';
import Tables from './pages/Tables.js';
import Alerts from './pages/UiElements/Alerts.js';
import Buttons from './pages/UiElements/Buttons.js';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Budget from './components/Configurator/Budget.jsx';
import Size from './components/Configurator/Size.jsx';
import Design from './components/Configurator/Design.jsx';
import Style from './components/Configurator/Style.jsx';
import Currency from './components/Configurator/Currency.jsx';
import Unit from './components/Configurator/Unit.jsx';
import ProductGroup from './components/Configurator/ProductGroup.jsx';
import AddColorGroup from './components/Configurator/AddColorGroup.jsx';
import AddProductCategory from './components/Configurator/AddProductCategory.jsx';


import { ToastContainer } from 'react-toastify';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />

        <Route element={<PrivateRoute />}>
        
          <Route
            index
            element={
              <>
                <PageTitle title="Dashboard" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          {/*  Products realted routes  */}

          <Route
            path="/product/addProduct"
            element={
              <>
                <PageTitle title="Add Material" />
                <AddProduct />
              </>
            }
          />

          <Route
            path="/material/addMaterial"
            element={
              <>
                <PageTitle title="Add Material" />
                <Material />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />

          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup" />
                <SignUp />
              </>
            }
          />
        </Route>

        {/* configurator */}
        <Route
          path="/configurator/addbudget"
          element={
            <>
              <PageTitle title="Budget" />
              <Budget />
            </>
          }
        />
        <Route
          path="/configurator/addSize"
          element={
            <>
              <PageTitle title="Size" />
              <Size />
            </>
          }
        />
           <Route
          path="/configurator/adddesign"
          element={
            <>
              <PageTitle title="Size" />
              <Design />
            </>
          }
        />
        <Route
          path="/configurator/addStyle"
          element={
            <>
              <PageTitle title="Style" />
              <Style />
            </>
          }
        />
        <Route
          path="/configurator/addCurrency"
          element={
            <>
              <PageTitle title="Currency" />
              <Currency />
            </>
          }
        />
        <Route
          path="/configurator/addunit"
          element={
            <>
              <PageTitle title="Unit" />
              <Unit />
            </>
          }
        />
         <Route
          path="/configurator/addproductgroup"
          element={
            <>
              <PageTitle title="Add Product Group" />
              <ProductGroup />
            </>
          }
        />
          <Route
          path="/configurator/addcolorgroup"
          element={
            <>
              <PageTitle title="Add Color Group" />
              <AddColorGroup />
            </>
          }
        />
          <Route
          path="/configurator/addproductcategory"
          element={
            <>
              <PageTitle title="Add Product Category" />
              <AddProductCategory />
            </>
          }
        />
      </Routes>
       
    </>
  );
}

export default App;
