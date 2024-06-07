import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import ReactSelect from 'react-select';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchlocation } from '../../redux/Slice/LocationSlice';
import { fetchmaterial } from '../../redux/Slice/MaterialSlice'; // Import fetchmaterial

import useInventoryMaterial from '../../hooks/useInventoryMaterial';

const CreateMaterialInventory = () => {
  const theme = useSelector(state => state?.persisted?.theme);
  const customStyles = createCustomStyles(theme?.mode);
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  // const [dateSelected, setDateSelected] = useState(item ? item?.date : '');
  const [locationSel, setLocationSel] = useState([]);
  const [materialSel, setMaterialSel] = useState([]);
  const flatpickrRef = useRef(null);

  // Fetch locations and materials
  useEffect(() => {
    dispatch(fetchlocation(token));
    dispatch(fetchmaterial(token));
  }, [dispatch, token]);

  const locations = useSelector(state => state?.nonPersisted?.location);
  const materials = useSelector(state => state?.nonPersisted?.material);

  useEffect(() => {
    if (locations.data) {
      const formattedOptions = locations.data.map(location => ({
        value: location.id,
        label: location.address,
      }));
      setLocationSel(formattedOptions);
    }
    console.log('Locations:', locations);
  }, [locations]);

  useEffect(() => {
    if (materials.data) {
      const formattedOptions = materials.data.map(material => ({
        value: material.id,
        label: material.grade, // Adjust based on the actual structure of material object
      }));
      setMaterialSel(formattedOptions);
      console.log('Material Options:', formattedOptions); // Debugging log
    }
    console.log('Materials:', materials);
  }, [materials]);

  const {
    inventoryMaterial,
    // edit,
    // currentMaterial,
    // pagination,
    // handleDelete,
    // handleUpdate,
     handleSubmit,
    // handlePageChange,
    // seloptions
} = useInventoryMaterial();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Material Inventory/Create Material Inventory" />
      <div>
        <Formik
          initialValues={{
            // date: dateSelected,
            locationId: item ? item?.location?.id : '',
            materialId: '',
            quantity: '',
            minimum:0,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.locationId) {
              errors.locationId = 'Field is required';
            }
            if (!values.materialId) {
              errors.materialId = 'Field is required';
            }
            if (!values.quantity) {
              errors.quantity = 'Field is required';
            }
            return errors;
          }}
           onSubmit={handleSubmit} // Define handleSubmit function if needed
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                      Create Material Inventory
                    </h3>
                  </div>
                  <div className="p-6.5 flex flex-wrap gap-6"> 
                    <div className="w-full sm:w-[48%]">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Location
                      </label>
                      <ReactSelect
                        name="locationId"
                        placeholder="Select location..."
                        styles={customStyles}
                        options={locationSel}
                        value={locationSel.find(option => option.value === values.locationId)}
                        onChange={option => setFieldValue('locationId', option.value)}
                      />
                      <ErrorMessage name="locationId" component="div" className="text-red-500" />
                    </div>
                    <div className="w-full sm:w-[48%]">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Material
                      </label>
                      <ReactSelect
                        name="materialId"
                        placeholder="Select material..."
                        styles={customStyles}
                        options={materialSel} // Ensure this is populated correctly
                        value={materialSel.find(option => option.value === values.materialId)}
                        onChange={option => setFieldValue('materialId', option.value)}
                      />
                      <ErrorMessage name="materialId" component="div" className="text-red-500" />
                    </div>
                    {/* <div className="flex-1 min-w-[200px]">
                        <label className="mb-2.5 block text-black dark:text-white">Order Date</label>
                        <Field name="orderDate">
                          {({ field, form }) => (
                            <Flatpickr
                              {...field}
                              placeholder="Enter Order Date"
                              options={{ dateFormat: 'Y-m-d' }}
                              onChange={(date) => form.setFieldValue('orderDate', date[0])}
                              className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          )}
                        </Field>
                        <ErrorMessage name="orderDate" component="div" className="text-red-600 text-sm" />
                      </div> */}
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                      <Field
                        type="text"
                        name="quantity"
                        placeholder="Enter Quantity"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Minimum Quantity</label>
                      <Field
                        type="text"
                        name="minimum"
                        placeholder="Enter minimum"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="minimum" component="div" className="text-red-500" />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-primary text-white py-2 px-4 rounded focus:outline-none"
                >
                  Create Material 
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default CreateMaterialInventory;
