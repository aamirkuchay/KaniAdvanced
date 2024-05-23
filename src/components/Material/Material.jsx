import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import ReactSelect from 'react-select';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AddProduct = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const productgrp = [
        { value: 'BrandA', label: 'Brand A' },
        { value: 'BrandB', label: 'Brand B' },
        { value: 'BrandC', label: 'Brand C' },
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: '50px', // Increase height of the control
            fontSize: '16px', // Increase font size
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '10px 14px', // Increase padding inside the control
        }),
        input: (provided) => ({
            ...provided,
            fontSize: '16px', // Increase font size for input
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '16px', // Increase font size for selected value
        }),
    };

    const formik = useFormik({
        initialValues: {
            unit: '',
            price: '',
            productDescription: '',
            grade: '',
        },
        validationSchema: Yup.object({
            unit: Yup.string().required('Required'),
            price: Yup.string().required('Required'),
            productDescription: Yup.string().required('Required'),
            grade: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Material / Add Material" />
            <div>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                Add Material
                            </h3>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="p-6.5">
                                <div className="mb-6">
                                    <label className="mb-2.5 block text-black dark:text-white">Product Description</label>
                                    <textarea
                                        rows={3}  // Reduced the number of rows for smaller height
                                        name="productDescription"
                                        placeholder="Type your message"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.productDescription}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                    {formik.touched.productDescription && formik.errors.productDescription ? (
                                        <div className="text-red-600 text-sm">{formik.errors.productDescription}</div>
                                    ) : null}
                                </div>

                                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Unit</label>
                                        <ReactSelect
                                            name="unit"
                                            value={productgrp.find(option => option.value === formik.values.unit)}
                                            onChange={(option) => formik.setFieldValue('unit', option.value)}
                                            onBlur={formik.handleBlur}
                                            options={productgrp}
                                            styles={customStyles}
                                            className="bg-white dark:bg-form-input"
                                            classNamePrefix="react-select"
                                            placeholder="Unit"
                                        />
                                        {formik.touched.unit && formik.errors.unit ? (
                                            <div className="text-red-600 text-sm">{formik.errors.unit}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            placeholder="Price"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.price}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.price && formik.errors.price ? (
                                            <div className="text-red-600 text-sm">{formik.errors.price}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Grade</label>
                                        <input
                                            type="text"
                                            name="grade"
                                            placeholder="Grade"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.grade}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.grade && formik.errors.grade ? (
                                            <div className="text-red-600 text-sm">{formik.errors.grade}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddProduct;
