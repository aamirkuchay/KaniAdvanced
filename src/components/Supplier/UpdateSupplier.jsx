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

            maxHeight: "90px",
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

                // Initialize the rows state only when component mounts
                setRows(supplierData.groupTypes && supplierData.groupTypes.map(group => ({
                    selectedOption1: groups.find(g => g.value === group.groupTypeName),
                    selectedOption3: group.workers.map(worker => ({ value: worker.workerCode, label: worker.workerCode })),
                    numOfLooms: group.noOfLooms
                })));
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addRow = () => {
        setRows([...rows, { id: Date.now(), selectedOption1: null, selectedOption3: [], numOfLooms: 0 }]);
    };

    const deleteRow = (index) => {
        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
    };
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
                                                <label className="mb-2.5 block text-black dark:text-white">Address</label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Address"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-red-500" />
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
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
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
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Email ID</label>
                                                <Field
                                                    type="email"
                                                    name="emailId"
                                                    placeholder="Enter Email ID"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="emailId" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">Supplier Type</label>
                                            <ReactSelect
                                                isDisabled
                                                name="supplierType"
                                                options={seloptions}
                                                styles={customStyles}
                                                value={values.supplierType}
                                                onChange={option => setFieldValue('supplierType', option)}
                                                placeholder="Select Supplier Type"
                                            />
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                className="flex items-center gap-1.5 text-primary"
                                                onClick={addRow}
                                            >
                                                <IoMdAdd size={16} />
                                                Add Group Type
                                            </button>
                                        </div>
                                        <div className="overflow-x-scroll md:overflow-x-visible  md:overflow-y-visible -mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                                            <div className="min-w-full shadow-md rounded-lg">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr className='px-5 py-3 bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider" style={{ minWidth: '250px' }}>Group Type</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Number of Looms</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Workers</th>
                                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rows.map((row, index) => (
                                                            <tr key={index}>
                                                                <td className="px-2 py-2 border-b">
                                                                    <ReactSelect
                                                                        name={`rows[${index}].selectedOption1`}
                                                                        options={groups}
                                                                        styles={customStyles}
                                                                        value={row.selectedOption1}
                                                                        onChange={option => {
                                                                            const updatedRows = [...rows];
                                                                            updatedRows[index].selectedOption1 = option;
                                                                            setRows(updatedRows);
                                                                        }}
                                                                        placeholder="Select Group Type"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-2 border-b">
                                                                    <Field
                                                                        name={`rows[${index}].numOfLooms`}
                                                                        type="number"
                                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                                        value={row.numOfLooms}
                                                                        onChange={e => {
                                                                            const updatedRows = [...rows];
                                                                            updatedRows[index].numOfLooms = parseInt(e.target.value);
                                                                            updatedRows[index].selectedOption3 = generateWorkerOptions(
                                                                                updatedRows[index].selectedOption1?.label || '',
                                                                                values.supplierCode,
                                                                                updatedRows[index].numOfLooms
                                                                            );
                                                                            setRows(updatedRows);
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="px-1 py-2 border-b">
                                                                    <ReactSelect
                                                                        isMulti
                                                                        name={`rows[${index}].selectedOption3`}
                                                                        options={generateWorkerOptions(
                                                                            row.selectedOption1?.label || '',
                                                                            values.supplierCode,
                                                                            row.numOfLooms
                                                                        )}
                                                                        styles={workerSelectStyles}
                                                                        value={row.selectedOption3}
                                                                        onChange={option => {
                                                                            const updatedRows = [...rows];
                                                                            updatedRows[index].selectedOption3 = option;
                                                                            setRows(updatedRows);
                                                                        }}
                                                                        placeholder="Select Workers"
                                                                        components={{ DropdownIndicator: () => null, ClearIndicator: () => null }}
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-2 border-b">
                                                                    <button
                                                                        type="button"
                                                                        className="flex items-center gap-1.5 text-red-600"
                                                                        onClick={() => deleteRow(index)}
                                                                    >
                                                                        <IoMdTrash size={16} />
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                        <div className="mt-4 text-center">
                                            <button
                                                type="submit"
                                                className="rounded bg-primary px-6 py-2 text-white transition hover:bg-opacity-80"
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