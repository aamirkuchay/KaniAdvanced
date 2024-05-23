import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ADD_UNIT_URL, GET_UNIT_URL, UPDATE_UNIT_URL, DELETE_UNIT_URL } from "../../Constants/utils";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewTable from './ViewTable';
import Pagination from '../Pagination/Pagination';

const Unit = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [units, setUnits] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentUnit, setCurrentUnit] = useState({ name: '' });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagUnitList: [],
        totalPages: 0,
        currentPage: 1,
    });

    useEffect(() => {
        getUnits(pagination.currentPage);
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_UNIT_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Unit deleted successfully');
                getUnits(pagination.currentPage); // Fetch updated units
            } else {
                const data = await response.json();
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleUpdate = (e, item) => {
        e.preventDefault();
        setEdit(true);
        setCurrentUnit(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {

        try {
            const url = edit ? `${UPDATE_UNIT_URL}/${currentUnit.id}` : ADD_UNIT_URL;
            const method = edit ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(`Unit ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentUnit({ name: '' });
                getUnits(pagination.currentPage); // Fetch updated units
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

    const getUnits = async (page) => {
        try {
            const response = await fetch(`${GET_UNIT_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUnits(data.pagUnitList);
            setPagination({
                totalItems: data.totalItems,
                pagUnitList: data.pagUnitList,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch units");
        }
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getUnits(newPage);
    };

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
