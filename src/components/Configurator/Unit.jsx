import React, { lazy, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ADD_UNIT_URL, GET_UNIT_URL, UPDATE_UNIT_URL, DELETE_UNIT_URL } from "../../Constants/utils";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewTable = lazy(() => import('./ViewTable'));
import Pagination from '../Pagination/Pagination';
import useUnits from '../../hooks/useUnits';
const Unit = () => {
    const {
        units,
        edit,
        currentUnit,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    } = useUnits();

    return (
        <DefaultLayout>
            <Breadcrumb pageName={edit ? "Configurator/Update Unit" : "Configurator/Add Unit"} />
            <div>
                <Formik
                    initialValues={currentUnit}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.name.trim()) {
                            errors.name = 'Field is required';
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
                                            {edit ? 'Update Unit' : 'Add Unit'}
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Unit Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Unit Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4" disabled={isSubmitting}>
                                            {edit ? 'Update Unit' : 'Create Unit'}
                                        </button>
                                    </div>
                                    {!edit && (
                                        <>
                                            <ViewTable units={units} totalItems={pagination.totalItems} title={'Units'} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                            <Pagination
                                                totalItems={pagination.totalItems}
                                                totalPages={pagination.totalPages}
                                                currentPage={pagination.currentPage}
                                                handlePageChange={handlePageChange}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default Unit;
