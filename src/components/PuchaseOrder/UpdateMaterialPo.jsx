import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import flatpickr from 'flatpickr';
import { useSelector } from 'react-redux';
import useMaterialPo from '../../hooks/useMaterialPo';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';

const UpdateMaterialPo = () => {
    const { handleUpdate, edit, currentMaterial, GetMaterialPoById, handleUpdateSubmit } = useMaterialPo();
    const { id } = useParams();

    useEffect(() => {
        GetMaterialPoById(id);
    }, [id]);


    const location = useSelector(state => state?.nonPersisted?.location);
    const supplier = useSelector(state => state?.nonPersisted?.supplier);
    const theme = useSelector(state => state?.persisted?.theme);
    const material = useSelector(state => state?.nonPersisted?.material);

    const [materialPos, setMaterialPos] = useState([]);
    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const flatpickrRef = useRef(null);
    const [dateSelected, setDateSelected] = useState('');

    useEffect(() => {
        if (currentMaterial) {
            setMaterialPos(currentMaterial.materialPos);
            setDateSelected(currentMaterial?.date?.split('T')[0])
            setFormikInitialValues({
                //  date: currentMaterial?.date?.split('T')[0],
                locationId: currentMaterial?.location?.id,
                supplierId: currentMaterial?.supplier?.id,
                status: currentMaterial.status,
                materialPos: currentMaterial.materialPos,
            });

        }
    }, [currentMaterial]);

    useEffect(() => {
        setLocationSel(formatOptions(location.data, 'address', 'id', 'locationObject'));
        setSupplierSel(formatOptions(supplier.data, 'name', 'id', 'supplierObject'));
        setMaterialSel(formatOptions(material.data, 'description', 'id', 'materialObject'));
    }, [location, material, supplier]);

    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z',
                prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow: '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {
                    setDateSelected(dateStr.split('T')[0]);
                },
            });
        }
    }, [flatpickrRef.current]);

    const formatOptions = (data, labelKey, valueKey, objectKey) => {
        return data ? data.map(item => ({
            value: item[valueKey],
            label: item[labelKey],
            [objectKey]: item
        })) : [];
    };

    const handleFieldChange = (setFieldValue, index, field, value) => {
        const newMaterialPos = [...materialPos];
        newMaterialPos[index][field] = value;
        if (field === 'quantity' || field === 'costPerGram') {
            newMaterialPos[index].totalPrice = newMaterialPos[index].quantity * newMaterialPos[index].costPerGram;
        }
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].${field}`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };



    const addRow = (setValues, values) => {
        const defaultMaterialId = materialSel.length > 0 ? materialSel[0].value : '';
        const newMaterialPos = [...values.materialPos, { material: { id: '' }, quantity: '', costPerGram: '', totalPrice: '' }];
        setMaterialPos(newMaterialPos);
        setValues({ ...values, materialPos: newMaterialPos });
    };
    const deleteRow = (index, setValues, values) => {
        const newMaterialPos = values.materialPos.filter((_, rowIndex) => rowIndex !== index);
        setMaterialPos(newMaterialPos);
        setValues({ ...values, materialPos: newMaterialPos });
    };

    const customStyles = createCustomStyles(theme?.mode);

    const [formikInitialValues, setFormikInitialValues] = useState({
        date: "",
        locationId: "",
        supplierId: "",
        status: "",
        materialPos: []
    });

    const validationSchema = Yup.object({
        locationId: Yup.string().required('Required'),
        supplierId: Yup.string().required('Required'),
        materialPos: Yup.array().of(
            Yup.object({
                materialId: Yup.string().required('Required Field'),
                quantity: Yup.number().required('required Field').min(1, 'Must be greater than 0'),
                costPerGram: Yup.number().required('required Field').min(1, 'Must be greater than 0')
            })
        )
    });
    const handleData = (values, actions) => {
        console.log(values, actions, "dataonsubmit")
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material/Material PO" />
            <div>
                <Formik
                    enableReinitialize
                    initialValues={formikInitialValues}
                    //   validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        // Convert dateSelected to ISO string format
                        if (!dateSelected) {
                            toast.error("Please Select Date")
                            return
                        }
                        values.date = dateSelected


                        // Convert locationId and supplierId to numbers if they are not already
                        values.locationId = parseInt(values.locationId, 10);
                        values.supplierId = parseInt(values.supplierId, 10);

                        // Convert materialPos items to the desired format
                        values.materialPos = values?.materialPos?.map(item => ({
                            materialId: parseInt(item?.material?.id || item.materialId, 10),
                            quantity: parseInt(item.quantity, 10),
                            costPerGram: parseInt(item.costPerGram, 10),
                            totalPrice: parseInt(item.totalPrice, 10)
                        }));

                        console.log(values, "sdfghjkl");

                        handleUpdateSubmit({ ...values, id: id }, actions);
                    }}


                >
                    {({ setFieldValue, setValues, values }) => (
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
                                                    placeholder='Select  Date'
                                                    type="text"
                                                    name='date'
                                                    ref={flatpickrRef}
                                                    value={dateSelected}
                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Location</label>
                                                <ReactSelect
                                                    name="locationId"
                                                    value={locationSel.find(option => option.value === values.locationId)}
                                                    onChange={option => setFieldValue('locationId', option.value)}
                                                    options={locationSel}
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Supplier</label>
                                                <ReactSelect
                                                    name="supplierId"
                                                    value={supplierSel.find(option => option.value === values.supplierId)}
                                                    onChange={option => setFieldValue('supplierId', option.value)}
                                                    options={supplierSel}
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">

                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:overflow-x-auto">
                                            <div className="flex justify-between mt-15">
                                                <h2 className='text-2xl font-semibold leading-tight text-center'>
                                                    Material PO Items
                                                </h2>
                                                <button
                                                    type="button"
                                                    onClick={() => addRow(setValues, values)}
                                                    className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                                >
                                                    <IoMdAdd className="mr-2" size={20} />
                                                    Add Row
                                                </button>
                                            </div>
                                        </div>
                                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
                                            <div className="inline-block min-w-full shadow-md rounded-lg ">
                                                <table className="min-w-full leading-normal">
                                                    <thead>
                                                        <tr className='px-5 py-3 bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                Material
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                Quantity
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                Cost Per Gram
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                Total
                                                            </th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {materialPos && materialPos.map((item, index) => (
                                                            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white px-5 py-3'>
                                                                <td className="border-b border-gray-200 text-sm">
                                                                    <div className="flex-1 min-w-[300px]">
                                                                        <ReactSelect
                                                                            name={`materialPos[${index}].materialId`}
                                                                            value={materialSel.find(option => option.value === item.material.id)}
                                                                            onChange={option => handleFieldChange(setFieldValue, index, 'materialId', option.value)}
                                                                            options={materialSel}
                                                                            styles={customStyles}
                                                                        />
                                                                        <ErrorMessage name={`materialPos[${index}].materialId`} component="div" className="text-red-500" />
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 text-sm">
                                                                    <div className="flex-1 min-w-[150px]">
                                                                        <Field
                                                                            type="number"
                                                                            name={`materialPos[${index}].quantity`}
                                                                            value={item.quantity}
                                                                            onChange={(e) => handleFieldChange(setFieldValue, index, 'quantity', e.target.value)}
                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        />
                                                                        <ErrorMessage name={`materialPos[${index}].quantity`} component="div" className="text-red-500" />
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 text-sm">
                                                                    <div className="flex-1 min-w-[150px]">
                                                                        <Field
                                                                            type="number"
                                                                            name={`materialPos[${index}].costPerGram`}
                                                                            value={item.costPerGram}
                                                                            onChange={(e) => handleFieldChange(setFieldValue, index, 'costPerGram', e.target.value)}
                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        />
                                                                        <ErrorMessage name={`materialPos[${index}].costPerGram`} component="div" className="text-red-500" />
                                                                    </div>
                                                                </td>
                                                                <td className="border-b border-gray-200 text-sm">
                                                                    <div className="flex-1 min-w-[150px]">
                                                                        <Field
                                                                            type="number"
                                                                            name={`materialPos[${index}].totalPrice`}
                                                                            value={item.totalPrice}
                                                                            readOnly
                                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                                        />
                                                                        <ErrorMessage name={`materialPos[${index}].totalPrice`} component="div" className="text-red-500" />
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                                                    <div className="flex items-center justify-center">
                                                                        <IoMdTrash type="button" className='text-red-700' onClick={() => deleteRow(index, setValues, values)} size={20} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            Update Material PO
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

export default UpdateMaterialPo;
