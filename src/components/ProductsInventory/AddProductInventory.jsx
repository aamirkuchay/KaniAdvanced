import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { customStyles as createCustomStyles } from '../../Constants/utils';
import ReactSelect from 'react-select';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchlocation } from '../../redux/Slice/LocationSlice';
import { fetchmaterial } from '../../redux/Slice/MaterialSlice';
import useInventoryMaterial from '../../hooks/useInventoryMaterial';

const AddProductInventory = () => {
  const theme = useSelector(state => state?.persisted?.theme);
  const customStyles = createCustomStyles(theme?.mode);
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

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
  }, [locations]);

  useEffect(() => {
    if (materials.data) {
      const formattedOptions = materials.data.map(material => ({
        value: material.id,
        label: material.description, // Adjust based on the actual structure of material object
      }));
      setMaterialSel(formattedOptions);
    }
  }, [materials]);

  const {
    inventoryMaterial,
    handleSubmit,
  } = useInventoryMaterial();

  // Define validation schema with Yup
  const validationSchema = Yup.object().shape({
    locationId: Yup.string().required('Location is required'),
    materialId: Yup.string().required('Material is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
    minimum: Yup.number().required('Minimum Quantity is required').positive('Minimum Quantity must be positive').integer('Minimum Quantity must be an integer'),
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventory/Create Inventory" />
      <div>
        <Formik
          initialValues={{
            locationId: item ? item?.location?.id : '',
            materialId: '',
            quantity: '',
            minimum: 1,
          }}
          validationSchema={validationSchema} // Add Yup validation schema here
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleSubmit(values, { setSubmitting, resetForm });
            resetForm(); // Reset the form fields after submission
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-5">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                      Create Inventory
                    </h3>
                  </div>


                  <div className="p-6.5 flex flex-wrap gap-6">



                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Purchase</label>
                      <Field
                        type="number"
                        name="purchase"
                        placeholder="Enter Purchase"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white"> Branch Transfer Inward</label>
                      <Field
                        type="number"
                        name="branchTransferInwards"
                        placeholder="Branch Transfer Inwards"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="minimum" component="div" className="text-red-500" />
                    </div>
                  </div>


                  <div className="p-6.5 flex flex-wrap gap-6">



                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Sale </label>
                      <Field
                        type="number"
                        name="sale"
                        placeholder="Enter Sale"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Branch Transfer Outward</label>
                      <Field
                        type="number"
                        name="branchTransferOutwards"
                        placeholder="Branch Transfer Outwards"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="minimum" component="div" className="text-red-500" />
                    </div>
                  </div>


                  <div className="p-6.5 flex flex-wrap gap-6">



                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Closing Balance  </label>
                      <Field
                        type="number"
                        name="closingBalance"
                        placeholder="Enter Closing Balance"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="quantity" component="div" className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">In Progress Orders</label>
                      <Field
                        type="number"
                        name="inProgressOrders"
                        placeholder="Branch Transfer Outwards"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="minimum" component="div" className="text-red-500" />
                    </div>
                  </div>









                  <div className="flex justify-center mt-4 mb-4 items-center">
                    <button
                      type="submit"
                      className="flex w-[300px] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
                      disabled={isSubmitting}
                    >
                      Create Inventory
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default AddProductInventory;
