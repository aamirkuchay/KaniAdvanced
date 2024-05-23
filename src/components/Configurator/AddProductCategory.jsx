import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AddProductCategory = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            if (!values.name.trim()) {
                // If name field is empty
                formik.setFieldError('name', 'Name cannot be empty');
                setSubmitting(false);
            } else {
                // Otherwise, proceed with form submission
                console.log(values);
                // You can continue with your form submission logic here
            }
        },
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Product Category" />
            <div>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                Product Category
                            </h3>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-wrap gap-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <label className="mb-2.5 block text-black dark:text-white">Product Catagory Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Add Product Catagory "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-600 text-sm">{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
                                    disabled={formik.isSubmitting}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddProductCategory;
