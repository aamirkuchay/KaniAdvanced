import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import useSupplier from '../../hooks/useSupplier';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { UPDATE_SUPPLIER_URL } from "../../Constants/utils";
import { toast } from 'react-toastify';

const UpdateSupplier = () => {
    const { seloptions, groups, GetSupplierById, currentSupplier } = useSupplier();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState(null);
    const theme = useSelector(state => state?.persisted?.theme);
    const customStyles = createCustomStyles(theme?.mode);
    const workerSelectStyles = {
        ...customStyles,
        control: (provided) => ({
            ...provided,
            ...customStyles.control,
            backgroundColor: customStyles.control.backgroundColor,
            border: "1px light gray",
            maxHeight: "80px",
            overflow: "auto",
            marginLeft: "10px"
        }),
    };
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [rows, setRows] = useState([]);

    useEffect(() => {
        console.log("Captured id from URL: ", id); // Log the captured id from URL
        const fetchData = async () => {
            const supplierData = await GetSupplierById(id);
            
            if (supplierData) {
                setInitialValues({
                    name: supplierData?.name,
                    phoneNumber: supplierData?.phoneNumber,
                    supplierCode: supplierData?.supplierCode,
                    address: supplierData?.address,
                    bankName: supplierData?.bankName,
                    accountNo: supplierData?.accountNo,
                    ifscCode: supplierData?.ifscCode,
                    emailId: supplierData?.emailId,
                    supplierType: seloptions.find(option => option.value === supplierData.supplierType),
                });

                setRows(supplierData.groupTypes && supplierData.groupTypes.map(group => ({
                    selectedOption1: groups.find(g => g.value === group.groupTypeName),
                    selectedOption3: group.workers.map(worker => ({ value: worker.workerCode, label: worker.workerCode })),
                    numOfLooms: group.noOfLooms
                })));
            }
        };
        fetchData();
    }, [id]); // Add id as a dependency

    const handleUpdateSubmit = async (values, { setSubmitting }) => {
        const formData = {
            ...values,
            supplierType: values.supplierType?.value,
            groupTypes: rows.map(row => ({
                groupTypeName: row.selectedOption1.value,
                noOfLooms: row.numOfLooms,
                workers: row.selectedOption3.map(worker => ({ workerCode: worker.value }))
            }))
        };

        try {
            const url = `${UPDATE_SUPPLIER_URL}/${id}`; // Adjust the URL if needed
            const method = "PUT"; // Use PUT method for updating

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Supplier updated successfully`);
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const addRow = () => {
        setRows([...rows, { id: Date.now(), selectedOption1: null, selectedOption3: [], numOfLooms: 0 }]);
    };

    const deleteRow = (index) => {
        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
    };

    const generateWorkerOptions = (groupName, supplierCode, numOfLooms) => {
        const workerOptions = [];
        for (let i = 1; i <= numOfLooms; i++) {
            const label = `${groupName.slice(0, 3).toUpperCase()}-${supplierCode.slice(0, 5)}-${String(i).padStart(3, '0')}`;
            workerOptions.push({ value: label, label });
        }
        return workerOptions;
    };

    if (!initialValues) {
        return <div>Loading...</div>;
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Supplier / Update Supplier" />
            <div>
                <Formik
                    initialValues={initialValues}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
                        }
                        if (!values.phoneNumber) {
                            errors.phoneNumber = 'Required';
                        }
                        if (values.phoneNumber.length < 10) {
                            errors.phoneNumber = 'Phone Number Must Be Greater than 10 digits';
                        }
                        if (!values.supplierCode) {
                            errors.supplierCode = 'Required';
                        }
                        if (!values.address) {
                            errors.address = 'Required';
                        }
                        if (!values.bankName) {
                            errors.bankName = 'Required';
                        }
                        if (!values.accountNo) {
                            errors.accountNo = 'Required';
                        }
                        if (values.accountNo.length < 10) {
                            errors.accountNo = 'Account Number Must Be Greater than 10 digits';
                        }
                        if (!values.ifscCode) {
                            errors.ifscCode = 'Required';
                        }
                        if (!values.emailId) {
                            errors.emailId = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={handleUpdateSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Update Supplier
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Supplier Code</label>
                                                <Field
                                                    readOnly
                                                    type="text"
                                                    name="supplierCode"
                                                    placeholder="Enter Supplier Code"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="supplierCode" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Phone Number</label>
                                                <Field
                                                    type="text"
                                                    name="phoneNumber"
                                                    placeholder="Enter Phone Number"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Supplier Type</label>
                                                <ReactSelect
                                                    name="supplierType"
                                                    options={seloptions}
                                                    value={values.supplierType}
                                                    onChange={(selectedOption) => setFieldValue('supplierType', selectedOption)}
                                                    placeholder="Select Supplier Type"
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierType" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Address</label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Address"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Email Id</label>
                                                <Field
                                                    type="email"
                                                    name="emailId"
                                                    placeholder="Enter Email Id"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="emailId" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Bank Name</label>
                                                <Field
                                                    type="text"
                                                    name="bankName"
                                                    placeholder="Enter Bank Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="bankName" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Account Number</label>
                                                <Field
                                                    type="text"
                                                    name="accountNo"
                                                    placeholder="Enter Account Number"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="accountNo" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">IFSC Code</label>
                                                <Field
                                                    type="text"
                                                    name="ifscCode"
                                                    placeholder="Enter IFSC Code"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="ifscCode" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-6.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Group Types
                                                <button
                                                    type="button"
                                                    onClick={addRow}
                                                    className="ml-2 p-2 text-green-500 hover:text-green-700"
                                                >
                                                    <IoMdAdd size={24} />
                                                </button>
                                            </label>
                                            {rows.map((row, index) => (
                                                <div key={index} className="mb-4 flex items-center gap-4">
                                                    <ReactSelect
                                                        name={`groupTypes.${index}.selectedOption1`}
                                                        options={groups}
                                                        value={row.selectedOption1}
                                                        onChange={selectedOption => {
                                                            const updatedRows = [...rows];
                                                            updatedRows[index].selectedOption1 = selectedOption;
                                                            updatedRows[index].selectedOption3 = [];
                                                            setRows(updatedRows);
                                                        }}
                                                        placeholder="Select Group Type"
                                                        styles={customStyles}
                                                    />
                                                    <Field
                                                        type="number"
                                                        name={`groupTypes.${index}.numOfLooms`}
                                                        placeholder="Enter Number of Looms"
                                                        value={row.numOfLooms}
                                                        onChange={e => {
                                                            const updatedRows = [...rows];
                                                            updatedRows[index].numOfLooms = e.target.value;
                                                            updatedRows[index].selectedOption3 = generateWorkerOptions(
                                                                row.selectedOption1.value,
                                                                values.supplierCode,
                                                                e.target.value
                                                            );
                                                            setRows(updatedRows);
                                                        }}
                                                        className=" rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                    />
                                                    <ReactSelect
                                                        name={`groupTypes.${index}.selectedOption3`}
                                                        options={generateWorkerOptions(
                                                            row.selectedOption1?.value,
                                                            values.supplierCode,
                                                            row.numOfLooms
                                                        )}
                                                        value={row.selectedOption3}
                                                        onChange={selectedOptions => {
                                                            const updatedRows = [...rows];
                                                            updatedRows[index].selectedOption3 = selectedOptions;
                                                            setRows(updatedRows);
                                                        }}
                                                        isMulti
                                                        placeholder="Select Workers"
                                                        styles={workerSelectStyles}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteRow(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <IoMdTrash size={24} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full rounded bg-primary py-3 px-5 text-white transition hover:bg-opacity-90"
                                            >
                                                Update Supplier
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

export default UpdateSupplier;