import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { useSelector } from 'react-redux';
import { ADDBOM, customStyles as createCustomStyles } from '../../Constants/utils';
import useProduct from '../../hooks/useProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddLocationInventory = () => {
    const navigate = useNavigate();
    const [Locations, setLocations] = useState([]);
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const { id } = useParams();

    const referenceImages = '';
    const actualImages = '';
    const productIdField = '';

    const { getLocation, Location } = useProduct({ referenceImages, actualImages, productIdField });

    const theme = useSelector(state => state?.persisted?.theme);
    const customStyles = createCustomStyles(theme?.mode);

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (Location) {
            const formattedOptions = Location.map((location) => ({
                value: location.id,
                label: location.address,
                unitObject: location,
            }));
            setLocations(formattedOptions);
        }
    }, [Location]);

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values,"val");
        // Format the selected locations into the required structure
        const formData = {
            location: values.location.map(loc => ({ id: loc.value })) // Ensure we only send the location ids
        };
        console.log(formData,"foemmm");

        // try {
        //     const url = `${ADDBOM}/${id}`;
        //     const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${token}`
        //         },
        //         body: JSON.stringify(formData)
        //     });

        //     const data = await response.json();

        //     if (response.ok) {
        //         toast.success(`Location Inventory added successfully`);
        //         navigate("/product/viewProducts");
        //     } else {
        //         toast.error(`${data.errorMessage}`);
        //     }
        // } catch (error) {
        //     console.error(error);
        //     toast.error("An error occurred");
        // } finally {
        //     setSubmitting(false);
        // }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Product / Add Location Inventory" />
            <div>
                <Formik
                    initialValues={{
                        location: [] // Initialize as an empty array for multiple selection
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Location Inventory
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            {/* Add any other fields here */}
                                        </div>

                                        <div className='text-center flex justify-between'>
                                            <h2 className='text-2xl'>Add Location Inventory</h2>
                                        </div>

                                        <div className="overflow-x-scroll md:overflow-x-visible md:overflow-y-visible -mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                                            <div className="min-w-full shadow-md rounded-lg">
                                                <table className="table-fixed w-full">
                                                    <thead>
                                                        <tr className='px-5 py-3 bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" style={{ minWidth: '250px' }}>Location LIST</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="px-2 py-2 border-b">
                                                                <ReactSelect
                                                                    name="location"
                                                                    isMulti
                                                                    value={values.location} // Bind value to formik state
                                                                    onChange={(selectedOptions) => setFieldValue("location", selectedOptions)}
                                                                    classNamePrefix="react-select"
                                                                    options={Locations}
                                                                    placeholder="Location List"
                                                                    styles={customStyles}
                                                                />
                                                                <ErrorMessage name="location" component="div" className="text-red-500" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-4 items-center">
                                            <button type="submit" className="flex w-[300px] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                                Add Location Inventory
                                            </button>
                                        </div>
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

export default AddLocationInventory;
