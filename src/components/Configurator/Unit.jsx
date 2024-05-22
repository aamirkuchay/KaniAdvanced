import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ADD_UNIT_URL } from "../../Constants/utils";
import { GET_UNIT_URL } from "../../Constants/utils";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsDatabaseExclamation } from 'react-icons/bs';

const Unit = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch(ADD_UNIT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            const data = await response.json();

            if (response.ok) {
                console.log(response,"juju");
                toast.success("Unit added successfully");
                resetForm();
            } else {
                console.log(data,"failed");
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const [getUnit, setgetUnit] = useState([])

    useEffect(() => {


        const getUnit=async()=>{
            const res= await fetch(GET_UNIT_URL,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            setgetUnit(data)

        }
        getUnit()
      
    }, [])
    console.log(getUnit,"heyy");
    

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Configurator/Add Unit" />
            <div>
               
                <Formik
                    initialValues={{ name: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Required';
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
                                            Add Unit
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Unit Name</label>
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
                                            Add Unit
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

export default Unit;
