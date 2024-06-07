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
import { useParams } from 'react-router-dom';

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
    const [statusSel, setStatusSel] = useState([]);

    const [materialPos, setMaterialPos] = useState([]);
    const [locationSel, setLocationSel] = useState([]);
    const [supplierSel, setSupplierSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const flatpickrRef = useRef(null);
    const [dateSelected, setDateSelected] = useState('');

    useEffect(() => {
        if (currentMaterial) {
            setMaterialPos(currentMaterial.materialPos);
            setDateSelected(currentMaterial?.date?.split('T')[0]);
            setFormikInitialValues({
                locationId: currentMaterial?.location?.id,
                supplierId: currentMaterial?.supplier?.id,
                status: currentMaterial?.status,
                materialPos: currentMaterial.materialPos,
            });
        }
    }, [currentMaterial]);
    console.log(currentMaterial.status, "supraaaaaaaaaaaaaaa");

    useEffect(() => {
        setLocationSel(formatOptions(location.data, 'address', 'id', 'locationObject'));
        setSupplierSel(formatOptions(supplier.data, 'name', 'id', 'supplierObject'));
        setMaterialSel(formatOptions(material.data, 'description', 'id', 'materialObject'));
        setStatusSel(formatStatusOptions());
    }, [location, material, supplier]);

    const formatStatusOptions = () => {
        // Define the status options
        return [
            { value: 'Approved', label: 'Approved' },
            { value: 'Rejected', label: 'Rejected' },
        ];
    };

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
        console.log(value, "selected");
        const newMaterialPos = [...materialPos];
        if (field === 'materialId') {
            newMaterialPos[index].material = { id: value };
            newMaterialPos[index].materialId = value;
        } else {
            newMaterialPos[index][field] = value;
        }

        if (field === 'quantity' || field === 'costPerGram') {
            newMaterialPos[index].totalPrice = newMaterialPos[index].quantity * newMaterialPos[index].costPerGram;
        }
        setMaterialPos(newMaterialPos);
        setFieldValue(`materialPos[${index}].${field}`, value);
        setFieldValue(`materialPos[${index}].totalPrice`, newMaterialPos[index].totalPrice);
    };
    console.log(materialPos, "after setttttttt");

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

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material/Material PO" />
            <div>
                <Formik
                    enableReinitialize
                    initialValues={formikInitialValues}
                    validationSchema={validationSchema}
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
                            quantity: parseFloat(item.quantity, 10),
                            costPerGram: parseFloat(item.costPerGram, 10),
                            totalPrice: parseFloat(item.totalPrice.toFixed(2), 10)
                        }));

                        handleUpdateSubmit({ ...values, id: id }, actions);
                    }}
                >
                    {({ setFieldValue, setValues, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="text-2xl font-semibold leading-tight text-center">
                                            Update Purchase Order
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
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Location
                                                </label>
                                                <Field
                                                    name="locationId"
                                                    options={locationSel}
                                                    component={ReactSelect}
                                                    placeholder="Select Location"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Supplier
                                                </label>
                                                <Field
                                                    name="supplierId"
                                                    options={supplierSel}
                                                    component={ReactSelect}
                                                    placeholder="Select Supplier"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Status
                                                </label>
                                                <Field
                                                    name="status"
                                                    options={statusSel}
                                                    component={ReactSelect}
                                                    placeholder="Select Status"
                                                    styles={customStyles}
                                                    onChange={option => {
                                                        setFieldValue('status', option.value);
                                                    }}
                                                />
                                                <ErrorMessage name="status" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="min-w-[220px]">Material</th>
                                                        <th className="min-w-[150px]">Quantity</th>
                                                        <th className="min-w-[150px]">Cost Per Gram</th>
                                                        <th className="min-w-[150px]">Total Cost</th>
                                                        <th className="min-w-[150px] text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {values?.materialPos?.map((materialPo, index) => (
                                                        <tr key={index}>
                                                            <td className="p-2">
                                                                <Field
                                                                    name={`materialPos[${index}].materialId`}
                                                                    options={materialSel}
                                                                    component={ReactSelect}
                                                                    placeholder="Select Material"
                                                                    styles={customStyles}
                                                                    value={materialSel.find(option => option.value === materialPo?.material?.id || option.value === materialPo.materialId)}
                                                                    onChange={option => handleFieldChange(setFieldValue, index, 'materialId', option.value)}
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].materialId`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td className="p-2">
                                                                <Field
                                                                    name={`materialPos[${index}].quantity`}
                                                                    className="w-full rounded border border-stroke py-1 px-2"
                                                                    type="number"
                                                                    value={materialPo.quantity}
                                                                    onChange={e => handleFieldChange(setFieldValue, index, 'quantity', parseFloat(e.target.value))}
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].quantity`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td className="p-2">
                                                                <Field
                                                                    name={`materialPos[${index}].costPerGram`}
                                                                    className="w-full rounded border border-stroke py-1 px-2"
                                                                    type="number"
                                                                    value={materialPo.costPerGram}
                                                                    onChange={e => handleFieldChange(setFieldValue, index, 'costPerGram', parseFloat(e.target.value))}
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].costPerGram`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td className="p-2">
                                                                <Field
                                                                    name={`materialPos[${index}].totalPrice`}
                                                                    className="w-full rounded border border-stroke py-1 px-2 bg-gray-100"
                                                                    type="number"
                                                                    value={materialPo.totalPrice}
                                                                    readOnly
                                                                />
                                                                <ErrorMessage name={`materialPos[${index}].totalPrice`} component="div" className="text-red-500" />
                                                            </td>
                                                            <td className="p-2 text-center">
                                                                <button
                                                                    type="button"
                                                                    className="text-red-500"
                                                                    onClick={() => deleteRow(index, setValues, values)}
                                                                >
                                                                    <IoMdTrash size={20} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="text-blue-500"
                                                    onClick={() => addRow(setValues, values)}
                                                >
                                                    <IoMdAdd size={20} /> Add Row
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 px-6.5 flex justify-end border-t border-stroke dark:border-strokedark">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 font-medium text-white hover:bg-opacity-90"
                                        >
                                            Update
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