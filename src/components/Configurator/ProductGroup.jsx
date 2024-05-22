import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ProductGroup = () => {
    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Configurator/Add Product Group" />
            <div>
                <Formik
                    initialValues={{ productgroup: '' }}
                    validate={values => {
                        const errors = {};
                       
                        if (!values.productgroup) {
                            errors.productgroup = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                {/* Form fields */}
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add product Group
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Product Group Name</label>
                                                <Field
                                                    type="text"
                                                    name="productgroup"
                                                    placeholder="Enter productgroup Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="productgroup" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            Add product Group
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
}

export default ProductGroup;
