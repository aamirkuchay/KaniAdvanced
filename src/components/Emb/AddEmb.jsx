import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AddEmb = () => {
    const [rows, setRows] = useState([{ id: Date.now(), selectedOption1: null, selectedOption2: null, selectedOption3: null }]);

    const weaveremb = [
        { value: 'BrandA', label: 'Brand A' },
        { value: 'BrandB', label: 'Brand B' },
        { value: 'BrandC', label: 'Brand C' }
    ];

    const addRow = () => {
        setRows([...rows, { id: Date.now(), selectedOption1: null, selectedOption2: null, selectedOption3: null }]);
    };

    const deleteRow = (index) => {
        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            const formData = {
                ...values,
                groups: rows.map(row => ({
                    group: row.selectedOption1,
                    noOfLooms: row.selectedOption2,
                    workers: row.selectedOption3
                }))
            };
            console.log(JSON.stringify(formData, null, 2));
            setSubmitting(false);
        }, 400);
    };


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Weaver/Embroider / Add Weaver-Embroide" />
            <div>
                <Formik
                    initialValues={{
                        WeaverCode: "",
                        WeaverName: "",
                        contact: "",
                        email: "",
                        address: "",
                        bank: "",
                        accountNo: "",
                        ifsc: ""
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.WeaverCode) {
                            errors.WeaverCode = 'Required';
                        }
                        if (values.WeaverCode === " ") {
                            errors.WeaverCode = "Weaver Code Should not Be Empty"
                        }
                        if (!values.WeaverName) {
                            errors.WeaverName = 'Required';
                        }
                        if (values.WeaverName === " ") {
                            errors.WeaverName = "WeaverName Should not Be Empty"
                        }
                        if (!values.contact) {
                            errors.contact = 'Required';
                        }
                        if (values.contact === " ") {
                            errors.contact = "contact Should not Be Empty"
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        if (values.email === " ") {
                            errors.email = "email Should not Be Empty"
                        }
                        if (!values.address) {
                            errors.address = 'Required';
                        }
                        if (values.address === " ") {
                            errors.address = "address Should not Be Empty"
                        }
                        if (!values.bank) {
                            errors.email = 'Required';
                        }
                        if (values.bank === " ") {
                            errors.bank = "bank Should not Be Empty"
                        }
                        if (!values.accountNo) {
                            errors.accountNo = 'Required';
                        }
                        if (values.accountNo === " ") {
                            errors.accountNo = "accountNo Should not Be Empty"
                        }
                        return errors;

                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Weaver/Emb
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Weaver/Embroider Code</label>
                                                <Field
                                                    type="text"
                                                    name="WeaverCode"
                                                    placeholder="Weaver/Embroider Code"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="WeaverCode" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Weaver/Embroider Name</label>
                                                <Field
                                                    type="text"
                                                    name="WeaverName"
                                                    placeholder="Weaver/Embroider Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="WeaverName" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Contact No</label>
                                                <Field
                                                    type="number"
                                                    name="contact"
                                                    placeholder="Contact Number"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="contact" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Email Id</label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Address</label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Bank Name</label>
                                                <Field
                                                    type="text"
                                                    name="bank"
                                                    placeholder="Bank Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="bank" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Bank Account Number</label>
                                                <Field
                                                    type="number"
                                                    name="accountNo"
                                                    placeholder="Enter Bank Account Number"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="accountNo" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> IFSC Code</label>
                                                <Field
                                                    type="text"
                                                    name="ifsc"
                                                    placeholder="Enter IFSC Code"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="ifsc" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        <div className='text-center mt-12'>
                                            <h2 className='text-2xl'>Groups</h2>
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
                                                        <th className="w-1/2 px-4 py-2">Group</th>
                                                        <th className="w-1/4 px-4 py-2">No of Looms</th>
                                                        <th className="w-1/4 px-4 py-2">Workers</th>
                                                        <th className="w-1/4 px-4 py-2">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows.map((row, index) => (
                                                        <tr key={row.id}>
                                                            <td>
                                                                <ReactSelect
                                                                    className='dark:bg-slate-700'
                                                                    value={row.selectedOption1}
                                                                    onChange={(option) => {
                                                                        const newRows = [...rows];
                                                                        newRows[index].selectedOption1 = option;
                                                                        setRows(newRows);
                                                                    }}
                                                                    classNamePrefix="react-select"
                                                                    options={weaveremb}
                                                                    placeholder="Weaver Code"
                                                                />
                                                            </td>
                                                            <td>
                                                                <ReactSelect
                                                                    className='dark:bg-slate-700'
                                                                    value={row.selectedOption2}
                                                                    onChange={(option) => {
                                                                        const newRows = [...rows];
                                                                        newRows[index].selectedOption2 = option;
                                                                        setRows(newRows);
                                                                    }}
                                                                    classNamePrefix="react-select"
                                                                    options={weaveremb}
                                                                    placeholder="No of Looms"
                                                                />
                                                            </td>
                                                            <td>
                                                                <ReactSelect
                                                                    className='dark:bg-slate-700'
                                                                    value={row.selectedOption3}
                                                                    onChange={(option) => {
                                                                        const newRows = [...rows];
                                                                        newRows[index].selectedOption3 = option;
                                                                        setRows(newRows);
                                                                    }}
                                                                    classNamePrefix="react-select"
                                                                    options={weaveremb}
                                                                    placeholder="Workers"
                                                                />
                                                            </td>
                                                            <td>
                                                                {rows.length > 1 && (
                                                                    <button type='button' onClick={() => deleteRow(index)}>
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
                                            Add Product
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

export default AddEmb;