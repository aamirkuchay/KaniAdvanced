import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import flatpickr from 'flatpickr';
import { useSelector } from 'react-redux';
import useMaterialPo from '../../hooks/useMaterialPo';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateMaterialPo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state?.item;

    console.log(item,"update");

  const itemId=item.id
    const locations = useSelector(state => state?.nonPersisted?.location);
    const suppliers = useSelector(state => state?.nonPersisted?.supplier);
    const theme = useSelector(state => state?.persisted?.theme);
    const materials = useSelector(state => state?.nonPersisted?.material);

    const [materialPos, setMaterialPos] = useState(item ? item.materialPos : [{ materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);
    const [submitted, setSubmitted] = useState(false);
    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const [dateSelected, setDateSelected] = useState(item ? item.date : '');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (locations.data) {
            const formattedOptions = locations.data.map(location => ({
                value: location.id,
                label: location.address,
                locationObject: location
            }));
            setLocationSel(formattedOptions);
        }
        if (suppliers.data) {
            const formattedSupOptions = suppliers.data.map(supplier => ({
                value: supplier.id,
                label: supplier.name,
                supplierObject: supplier
            }));
            setSupplierSel(formattedSupOptions);
        }
        if (materials.data) {
            const formattedMatOptions = materials.data.map(material => ({
                value: material.id,
                label: material.description,
                materialObject: material
            }));
            setMaterialSel(formattedMatOptions);
        }
    }, [locations, materials, suppliers]);

    const { handleUpdateSubmit } = useMaterialPo();

    const flatpickrRef = useRef(null);

    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z', // Display format
                prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow: '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {
                    setDateSelected(dateStr.split('T')[0]); // Update the date for display
                },
            });
        }
    }, [flatpickrRef.current]);
    const addRow = () => {
        setMaterialPos([...materialPos, { materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);
    };

    const deleteRow = (index, setFieldValue) => {
        const newMaterialPos = materialPos.filter((_, rowIndex) => rowIndex !== index);
        setMaterialPos(newMaterialPos);
        setFieldValue('materialPos', newMaterialPos);
    };

    const handleQuantityChange = (setFieldValue, index, value) => {
        const newMaterialPos = [...materialPos];
        newMaterialPos[index].quantity = value;
        newMaterialPos[index].totalPrice = value * newMaterialPos[index].costPerGram; // Recalculate total price
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].quantity`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };

    const handleCostPerGramChange = (setFieldValue, index, value) => {
        const newMaterialPos = [...materialPos];
        newMaterialPos[index].costPerGram = value;
        newMaterialPos[index].totalPrice = value * newMaterialPos[index].quantity; // Recalculate total price
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].costPerGram`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };

    const customStyles = createCustomStyles(theme?.mode);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material/Material PO" />
            <div>
                <Formik
                    initialValues={{
                        date: dateSelected,
                        locationId: item ? item?.location?.id : "",
                        supplierId: item ? item.supplier.id : "",
                        status: item ? item.status : "",
                        materialPos: materialPos
                    }}
                    // validate={values => {
                    //     const errors = {};

                    //     if (!values.locationId) {
                    //         errors.locationId = 'Field is required';
                    //     }
                    //     if (!values.supplierId) {
                    //         errors.supplierId = 'Field is required';
                    //     }
                    //     if (!dateSelected) {
                    //         errors.date = 'Field is required';
                    //     }
                    //     if (values.materialPos.length === 0) {
                    //         errors.materialPos = 'At least one material item is required';
                    //     } else {
                    //         // Iterate through each material item and validate its fields
                    //         values.materialPos.forEach((materialItem, index) => {
                    //             if (!materialItem.materialId) {
                    //                 if (!errors.materialPos) {
                    //                     errors.materialPos = [];
                    //                 }
                    //                 if (!errors.materialPos[index]) {
                    //                     errors.materialPos[index] = {};
                    //                 }
                    //                 errors.materialPos[index].materialId = 'Material is required';
                    //             }
                    //             if (!materialItem.quantity || isNaN(materialItem.quantity) || materialItem.quantity <= 0) {
                    //                 if (!errors.materialPos) {
                    //                     errors.materialPos = [];
                    //                 }
                    //                 if (!errors.materialPos[index]) {
                    //                     errors.materialPos[index] = {};
                    //                 }
                    //                 errors.materialPos[index].quantity = 'Required';
                    //             }
                    //             if (!materialItem.costPerGram || isNaN(materialItem.costPerGram) || materialItem.costPerGram <= 0) {
                    //                 if (!errors.materialPos) {
                    //                     errors.materialPos = [];
                    //                 }
                    //                 if (!errors.materialPos[index]) {
                    //                     errors.materialPos[index] = {};
                    //                 }
                    //                 errors.materialPos[index].costPerGram = 'Required';
                    //             }
                    //         });
                    //     }
                    //     return errors;
                    // }}
                    onSubmit={(values, actions) => {
                        console.log("iam sumitted");
                        handleUpdateSubmit(values,itemId, actions);
                        setSubmitted(true);
                        values.date = dateSelected;
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            UPDATE PURCHASE ORDER
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Date</label>
                                                <input
                                                    placeholder='Select A Date'
                                                    type="text"
                                                    name='date'
                                                    ref={flatpickrRef}
                                                    value={dateSelected.split('T')[0]}
                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Location</label>
                                                <Field
                                                    name="locationId"
                                                    options={locationSel}
                                                    styles={customStyles}
                                                    component={ReactSelect}
                                                    placeholder={values.locationId ? locationSel.find(option => option.value === values.locationId)?.label : 'Search Location'}
                                                    onChange={option => setFieldValue('locationId', option.value)}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Supplier</label>
                                                <Field
                                                    name="supplierId"
                                                    options={supplierSel}
                                                    styles={customStyles}
                                                    component={ReactSelect}
                                                    placeholder={values.supplierId ? supplierSel.find(option => option.value === values.supplierId)?.label : 'Search Supplier'}
                                                    onChange={option => setFieldValue('supplierId', option.value)}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Status</label>
                                                <Field
                                                    as="select"
                                                    name="status"
                                                    className="form-select w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                >
                                                    <option value="" disabled>Select a status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        {values.materialPos.length > 0 && (
                                            <div>
                                                <h3 className="font-medium text-black dark:text-white">Materials</h3>
                                                {values.materialPos.map((material, index) => (
                                                    <div key={index} className="mt-5 grid grid-cols-5 gap-4">
                                                        <div className="col-span-5 sm:col-span-1">
                                                            <label className="mb-2.5 block text-black dark:text-white">Material</label>
                                                            <Field
                                                                name={`materialPos[${index}].materialId`}
                                                                options={materialSel}
                                                                styles={customStyles}
                                                                component={ReactSelect}
                                                                value={ material.material.description} // Set the selected value
                                                                placeholder={material.material.description}
                                                                onChange={option => setFieldValue(`materialPos[${index}].materialId`, option.value)}
                                                            />
                                                            <ErrorMessage name={`materialPos[${index}].materialId`} component="div" className="text-red-500" />
                                                        </div>
                                                        <div className="col-span-5 sm:col-span-1">
                                                            <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                                                            <Field
                                                                name={`materialPos[${index}].quantity`}
                                                                type="number"
                                                                className="form-input w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                onChange={e => handleQuantityChange(setFieldValue, index, e.target.value)}
                                                            />
                                                            <ErrorMessage name={`materialPos[${index}].quantity`} component="div" className="text-red-500" />
                                                        </div>
                                                        <div className="col-span-5 sm:col-span-1">
                                                            <label className="mb-2.5 block text-black dark:text-white">Cost per Gram</label>
                                                            <Field
                                                                name={`materialPos[${index}].costPerGram`}
                                                                type="number"
                                                                className="form-input w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                onChange={e => handleCostPerGramChange(setFieldValue, index, e.target.value)}
                                                            />
                                                            <ErrorMessage name={`materialPos[${index}].costPerGram`} component="div" className="text-red-500" />
                                                        </div>
                                                        <div className="col-span-5 sm:col-span-1">
                                                            <label className="mb-2.5 block text-black dark:text-white">Total Price</label>
                                                            <Field
                                                                name={`materialPos[${index}].totalPrice`}
                                                                type="number"
                                                                disabled
                                                                className="form-input w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            />
                                                        </div>
                                                        <div className="col-span-5 sm:col-span-1 flex items-center justify-end">
                                                            <button type="button" className="text-red-500" onClick={() => deleteRow(index, setFieldValue)}>
                                                                <IoMdTrash className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                 <div className="mt-4">
                                                    <button type="button" className="flex items-center text-blue-500" onClick={addRow}>
                                                        <IoMdAdd className="mr-2 w-5 h-5" />
                                                        Add Material
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="mt-6 flex justify-end gap-4">
                                            <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                                Cancel
                                            </button>
                                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                                Update
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

export default UpdateMaterialPo;