
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import ReactSelect from 'react-select';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchlocation } from '../../redux/Slice/LocationSlice';
import { fetchmaterial } from '../../redux/Slice/MaterialSlice';
import useInventoryMaterial from '../../hooks/useInventoryMaterial';
import { GET_INVENTORYBYID_URL } from '../../Constants/utils'; // Import GET_INVENTORYBYID_URL

const UpdateInventoryMaterial = () => {
  const{id}=useParams();
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
  const [inventoryItem, setInventoryItem] = useState(null); // State variable to store inventory item

  const locations = useSelector(state => state?.nonPersisted?.location);
  const materials = useSelector(state => state?.nonPersisted?.material);

  

  useEffect(() => {
    // Fetch inventory item details when the component mounts
    fetchInventoryItem();
    dispatch(fetchlocation(token));
    dispatch(fetchmaterial(token));
  }, [dispatch, token]);

  const fetchInventoryItem = async () => {
    try {
      const response = await fetch(`${GET_INVENTORYBYID_URL}/${id}`, { // Fetch inventory item by ID
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data,"heyyyyyyyyyyyyyyyyyy");
      setInventoryItem(data);
    } catch (error) {
      console.error('Error fetching inventory item:', error);
    }
  };

  const handleFieldChange = (setFieldValue, field, value) => {
    console.log(value, "selected");
    // Assuming inventoryItem is the state variable representing your inventory item
    const newInventoryItem = { ...inventoryItem };
    if (field === 'locationlId') {
      newInventoryItem[index].location = { id: value };
      newInventoryItem[index].locationlId = value;
  } else {
    newInventoryItem[index][field] = value;
  }
  
    // Update the corresponding field in the inventory item
    newInventoryItem[field] = value;
  
    // If the field is quantity or minimum, perform any additional calculations or validations here
  
    // Update the state with the new inventory item
    setInventoryItem(newInventoryItem);
  
    // Update formik's values
    setFieldValue(field, value);
  };
 
  
  // const fetchInventoryItem = async () => {
  //   //         try {
  //   //             const response = await fetch(`${GET_INVENTORYBYID_URL}/${id}`,{
  //   //             method: "GET",
  //   //             headers: {
  //   //                 "Content-Type": "application/json",
  //   //                 "Authorization": `Bearer ${token}`
  //   //             }
  //   //         })
                
  //   //             const data = await response.json();
  //   //             console.log(data);
  //   //            setInventoryItem(data);
  //   //             // setLoading(false);
  //   //         } catch (error) {
  //   //             console.error('Error fetching inventory item:', error);
  //   //             // setLoading(false);
  //   //         }
  //   //     };
    
  //   //     // if (loading) return <div>Loading...</div>;
    
  //   //     if (!inventoryItem) return <div>Item not found</div>;

  useEffect(() => {
    // Populate locationSel options
    // console.log('location.state:', location.state);
   // console.log(locations);
    //console.log(materials);
    if (locations.data) {
      const formattedOptions = locations.data.map(location => ({
        value: location.id,
        label: location.address,
      }));
      setLocationSel(formattedOptions);
    }
  }, [locations]);

  useEffect(() => {
    // Populate materialSel options
    if (materials.data) {
      const formattedOptions = materials.data.map(material => ({
        value: material.id,
        label: material.grade,
      }));
      setMaterialSel(formattedOptions);
    }
  }, [materials]);

  const { handleUpdate } = useInventoryMaterial();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Material Inventory/Update Material Inventory" />
      <div>
        <Formik
          initialValues={{
            locationId: '',
            materialId:  '',
            quantity:  '',
            minimum:  '',
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
          onSubmit={(values, { setSubmitting }) => {
            // handleUpdate(item.id, values, token, () => {
            //   setSubmitting(false);
            //   navigate('/view-inventory');
            // });
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
                        name="locationId"
                        placeholder="Select location..."
                        styles={customStyles}
                        options={locationSel}
                        value={locationSel.find(option => option.value === inventoryItem?.location?.id)}
                       nChange={option => setFieldValue('locationId', option.value)}
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
                        options={materialSel}
                        value={materialSel.find(option => option.value === inventoryItem?.material?.id)}
                        onChange={option => setFieldValue('materialId', option.value)}
                      />
                      <ErrorMessage name="materialId" component="div" className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                      <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                      <Field
                        type="text"
                        name="quantity"
                        value={inventoryItem?.quantity}
                        onChange={option => setFieldValue('quantity', option.value)}
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
                        value={inventoryItem?.minimum}
                        placeholder="Enter Minimum Quantity"
                        onChange={option => setFieldValue('minimum', option.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="minimum" component="div" className="text-red-500" />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-primary text-white py-2 px-4 rounded focus:outline-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update Material'}
                </button>
              </div>
           
              </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default UpdateInventoryMaterial;
