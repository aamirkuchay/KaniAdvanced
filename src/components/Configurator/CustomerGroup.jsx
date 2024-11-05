import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Pagination from '../Pagination/Pagination';
import ViewTable from './ViewTable';
import usecustomerGroup from '../../hooks/useCustomerGroup';

const CustomerGroup = () => {
    const {
        customerGroup,
        edit,
        currentcustomerGroup,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    } = usecustomerGroup();

    return (
        <DefaultLayout>
        <Breadcrumb pageName="Configurator/Add Product Category" />
        <div>
            <Formik
                initialValues={currentcustomerGroup}
                enableReinitialize={true}
                validate={values => {
                    const errors = {};
                   
                    if (!values.productCategoryName) {
                        errors.productCategoryName = 'Required';
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
                                    {edit ? "UPDATE PRODUCT CATEGORY" : "ADD PRODUCT CATEGORY"}
                                    </h3>
                                </div>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-wrap gap-6">
                                        <div className="flex-1 min-w-[300px]">
                                            <label className="mb-2.5 block text-black dark:text-white"> Design Name</label>
                                            <Field
                                                type="text"
                                                name="productCategoryName"
                                                placeholder="Enter product Category Name"
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                            />
                                            <ErrorMessage name="productCategoryName" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                    {edit ? "UPDATE PRODUCT CATEGORY" : "CREATE PRODUCT CATEGORY"}
                                    </button>
                                </div>
                            </div>
                            {!edit && (
                             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                 <div className="border-b border-stroke py-4 px-2 dark:border-strokedark">
                                     <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                         <ViewTable
                                             units={customerGroup}
                                             pagination={pagination}
                                             totalItems={pagination.totalItems}
                                             title={'Product Category'}
                                             handleDelete={handleDelete}
                                             handleUpdate={handleUpdate}
                                         />
                                         <Pagination
                                             totalPages={pagination.totalPages}
                                             currentPage={pagination.currentPage}
                                             handlePageChange={handlePageChange}
                                         />
                                     </h3>
                                 </div>
                             </div>
                         )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </DefaultLayout>
    );
};

export default CustomerGroup;
