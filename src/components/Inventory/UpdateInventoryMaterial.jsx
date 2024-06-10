import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { customStyles as createCustomStyles } from '../../Constants/utils';
import ReactSelect from 'react-select';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchlocation } from '../../redux/Slice/LocationSlice';
import { fetchmaterial } from '../../redux/Slice/MaterialSlice';
import useInventoryMaterial from '../../hooks/useInventoryMaterial';

const UpdateInventoryMaterial = () => {
  const { id } = useParams();
  const theme = useSelector(state => state?.persisted?.theme);
  const customStyles = createCustomStyles(theme?.mode);
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [locationSel, setLocationSel] = useState([]);
  const [materialSel, setMaterialSel] = useState([]);

  const location = useSelector(state => state?.nonPersisted?.location);
  const material = useSelector(state => state?.nonPersisted?.material);
  const { handleUpdateSubmit, inventoryItem, setInventoryItem, fetchInventoryItem } = useInventoryMaterial();

  useEffect(() => {
    fetchInventoryItem(id);
    dispatch(fetchlocation(token));
    dispatch(fetchmaterial(token));
  }, [dispatch, token]);

  useEffect(() => {
    setLocationSel(formatOptions(location.data, 'address', 'id', 'locationObject'));
    setMaterialSel(formatOptions(material.data, 'description', 'id', 'materialObject'));
  }, [location, material]);

  const formatOptions = (data, labelKey, valueKey, objectKey) => {
    return data ? data.map(item => ({
      value: item[valueKey],
      label: item[labelKey],
      [objectKey]: item
    })) : [];
  };

  // Define validation schema with Yup
  const validationSchema = Yup.object().shape({
    location: Yup.object().required('Location is required'),
    material: Yup.object().required('Material is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
    minimum: Yup.number().required('Minimum Quantity is required').positive('Minimum Quantity must be positive').integer('Minimum Quantity must be an integer'),
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Material Inventory/Update Material Inventory" />
      <div>
        {inventoryItem && (
          <Formik
            initialValues={{
              location: locationSel.find(option => option.value === inventoryItem.location.id) || '',
              material: materialSel.find(option => option.value === inventoryItem.material.id) || '',
              quantity: inventoryItem.quantity || '',
              minimum: inventoryItem.minimum || '',
            }}
            validationSchema={validationSchema} // Add Yup validation schema here
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const updatedInventoryItem = {
                id: inventoryItem.id,
                location: {
                  id: values.location.value
                },
                material: {
                  id: values.material.value
                },
                quantity: values.quantity,
                minimum: values.minimum
              };
              handleUpdateSubmit(updatedInventoryItem, { setSubmitting, resetForm });
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="flex flex-col gap-9">
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                        Update Material Inventory
                      </h3>
                    </div>
                    <div className="p-6.5 flex flex-wrap gap-6">
                      <div className="w-full sm:w-[48%]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Location
                        </label>
                        <ReactSelect
                          name="location"
                          placeholder="Select location..."
                          styles={customStyles}
                          options={locationSel}
                          value={values.location}
                          onChange={option => setFieldValue('location', option)}
                        />
                        <ErrorMessage name="location" component="div" className="text-red-500" />
                      </div>
                      <div className="w-full sm:w-[48%]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Material
                        </label>
                        <ReactSelect
                          name="material"
                          placeholder="Select material..."
                          styles={customStyles}
                          options={materialSel}
                          value={values.material}
                          onChange={option => setFieldValue('material', option)}
                        />
                        <ErrorMessage name="material" component="div" className="text-red-500" />
                      </div>
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
                          placeholder="Enter Minimum Quantity"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage name="minimum" component="div" className="text-red-500" />
                      </div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
                        disabled={isSubmitting}
                      >
                        Update Material Inventory
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </DefaultLayout>
  );
};

export default UpdateInventoryMaterial;
