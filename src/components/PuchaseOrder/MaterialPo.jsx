import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import flatpickr from 'flatpickr';
import { useSelector } from 'react-redux';
import useMaterialPo from '../../hooks/useMaterialPo';

const MaterialPo = () => {
    const location = useSelector(state => state?.nonPersisted?.location);
    const supplier = useSelector(state => state?.nonPersisted?.supplier);
    const material = useSelector(state => state?.nonPersisted?.material);
    const [materialPos, setMaterialPos] = useState([{  materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);

    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const [dateSelected, setDateSelected] = useState('');

    useEffect(() => {
        if (location.data) {
            const formattedOptions = location.data.map(location => ({
                value: location.id,
                label: location.address,
                locationObject: location
            }));
            setLocationSel(formattedOptions);
        }
        if (supplier.data) {
            const formattedSupOptions = supplier.data.map(supplier => ({
                value: supplier.id,
                label: supplier.name,
                supplierObject: supplier
            }));
            setSupplierSel(formattedSupOptions);
        }
        if (material.data) {
            const formattedMatOptions = material.data.map(material => ({
                value: material.id,
                label: material.description,
                materialObject: material
            }));
            setMaterialSel(formattedMatOptions);
        }
    }, [location, material, supplier]);

    const { handleSubmit } = useMaterialPo();

    const flatpickrRef = useRef(null);

    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z', // Display format
              
                prevArrow:
                    '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow:
                    '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {
                   
                    setDateSelected(dateStr.split('T')[0]); // Update the date for display
                },
            });
        }
    }, [flatpickrRef.current]);

    const addRow = () => {
        setMaterialPos([...materialPos, {  materialId: null, quantity: '', costPerGram: '', totalPrice: '' }]);
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
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '50px', // Set the minimum height here
            height: '50px',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '50px',
            padding: '0 6px'
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0',
            padding: '0'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '50px'
        })
    };
    const customStyle = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '50px', // Set the minimum height here
            height: '50px',
            width:'190px'
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '50px',
            padding: '0 6px',
            width:'50px'
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0',
            padding: '0',
            width:'50px'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '50px',
            width:'30px'
        }),
        menu: (provided, state) => ({
            ...provided,
            
            width:'190px'
        })
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Weaver/Embroider / Add Weaver-Embroider" />
            <div>
                <Formik
                    initialValues={{
                        date: null,
                        locationId: "",
                        supplierId: "",
                        status: "",
                        materialPos: materialPos
                    }}
                    validate={values => {
                        const errors = {};

                        if (!values.locationId) {
                            errors.locationId = 'Required';
                        }
                        if (!values.supplierId) {
                            errors.supplierId = 'Required';
                        }
                      
                       
                       
                        return errors;
                    }}
                    onSubmit={(values, actions) => {
                        values.date = dateSelected;
                        handleSubmit(values, actions);
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Material PO
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Date</label>
                                                <input
                                                    type="text"
                                                    name='date'
                                                    ref={flatpickrRef}
                                                    value={dateSelected.split('T')[0]}
                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Location</label>
                                                <ReactSelect
                                                    name="locationId"
                                                    value={locationSel.find(option => option.value === values.location)}
                                                    onChange={(option) => setFieldValue('locationId', option.value)}
                                                    options={locationSel}
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Location"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Supplier</label>
                                                <ReactSelect
                                                    name="supplierId"
                                                    value={supplierSel.find(option => option.value === values.supplier)}
                                                    onChange={(option) => setFieldValue('supplierId', option.value)}
                                                    options={supplierSel}
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Supplier"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Status</label>
                                                <Field
                                                    type="text"
                                                    name="status"
                                                    placeholder="Status"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="status" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        <div className='text-center mt-12'>
                                            <h2 className='text-2xl'>Material Po's</h2>
                                        </div>
                                        <div className='text-end'>
                                            <button type='button' onClick={addRow}>
                                                <IoMdAdd size={34} />
                                            </button>
                                        </div>

                                        <div className="w-full">
                                            <table className="table-fixed w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="w-1/4   py-2">Material</th>
                                                        <th className="w-1/4  py-2">Quantity</th>
                                                        <th className="w-1/5  py-2">Cost Per Gram</th>
                                                        <th className="w-1/5  py-2">Total Price</th>
                                                        <th className="w-1/6  py-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {materialPos.map((row, index) => (
                                                        <tr key={row.id}>
                                                            <td>
                                                                <ReactSelect
                                                                   
                                                                    value={materialSel.find(option => option.value === row.materialId)}
                                                                    onChange={(option) => {
                                                                        const newMaterialPos = [...materialPos];
                                                                        newMaterialPos[index].materialId = option.value;
                                                                        setMaterialPos(newMaterialPos);
                                                                        setFieldValue(`materialPos[${index}].materialId`, option.value);
                                                                    }}
                                                                    classNamePrefix="react-select"
                                                                    options={materialSel}
                                                                    placeholder="Select Material"
                                                                    styles={customStyle}
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    name={`materialPos[${index}].quantity`}
                                                                    placeholder="Quantity"
                                                                    className="w-full rounded  border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary dark:text-white"
                                                                    onChange={(e) => handleQuantityChange(setFieldValue, index, e.target.value)}
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].quantity`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    name={`materialPos[${index}].costPerGram`}
                                                                    placeholder="Cost Per Gram"
                                                                    className="w-full rounded border-[1.5px]  dark:text-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                                    onChange={(e) => handleCostPerGramChange(setFieldValue, index, e.target.value)}
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].costPerGram`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    name={`materialPos[${index}].totalPrice`}
                                                                    placeholder="Total Price"
                                                                    className="w-full rounded border-[1.5px]  dark:text-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:focus:border-primary"
                                                                    readOnly
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].totalPrice`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td>
                                                                {materialPos.length > 1 && (
                                                                    <button type='button' onClick={() => deleteRow(index, setFieldValue)}>
                                                                        <IoMdTrash size={24} />
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            Add Material
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

export default MaterialPo;