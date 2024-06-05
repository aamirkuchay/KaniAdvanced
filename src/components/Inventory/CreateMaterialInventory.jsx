import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import flatpickr from 'flatpickr';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import * as Yup from 'yup';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { ErrorMessage, Formik } from 'formik';
import { Form } from 'react-router-dom';
import ReactSelect from 'react-select';


const CreateMaterialInventory = () => {
    const location = useSelector(state => state?.nonPersisted?.location);
    const theme = useSelector(state => state?.persisted?.theme);
    const material = useSelector(state => state?.nonPersisted?.material);
    // const { handleSubmit, edit } = useMaterialInventory();
    const [locationSel, setLocationSel] = useState([]);
    const [materialSel, setMaterialSel] = useState([]);
    const flatpickrRef = useRef(null);
    const [dateSelected, setDateSelected] = useState('');




    useEffect(() => {
        if (flatpickrRef.current) {
            flatpickr(flatpickrRef.current, {
                mode: 'single',
                static: true,
                monthSelectorType: 'static',
                dateFormat: 'Y-m-d\\TH:i:S.Z',
                prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow: '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                onChange: (selectedDates, dateStr) => {
                    console.log("Selected date:", dateStr); // Log the selected date
                    setDateSelected(dateStr.split('T')[0]);
                },
            });
        }
    }, [flatpickrRef.current]);

    const customStyles = createCustomStyles(theme?.mode);

    const initialValues = {
        date: "",
        locationId: "",
        materialId: "",
        quantity: "",

    };


    const validationSchema = Yup.object({
        // date: Yup.string().required('Date is required'),
        locationId: Yup.string().required('Required'),
        materialId: Yup.string().required('Required'),
        quantity: Yup.string().required('required')


    });



    return (

        <DefaultLayout>
            <Breadcrumb pageName="Material/Material PO" />
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}


                    onSubmit={(values, actions) => {
                        values.date = dateSelected;
                        if (!dateSelected) {
                            toast.error("Please select a date")
                            return
                        }
                        handleSubmit(values, actions);
                    }}
                >
                    {({ setFieldValue, setValues, values }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="text-2xl font-semibold leading-tight text-center">
                                            Create Material Inventory
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Date</label>
                                                <input
                                                    placeholder='Select  Date'
                                                    type="text"
                                                    name='date'
                                                    ref={flatpickrRef}
                                                    value={dateSelected}
                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Location</label>
                                                <ReactSelect
                                                    name="locationId"
                                                    value={locationSel.find(option => option.value === values.locationId)}
                                                    onChange={option => setFieldValue('locationId', option.value)}
                                                    options={locationSel}
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="locationId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Supplier</label>
                                                <ReactSelect
                                                    name="materialId"
                                                    value={materialSel.find(option => option.value === values.materialId)}
                                                    onChange={option => setFieldValue('supplierId', option.value)}
                                                    options={materialSel}
                                                    styles={customStyles}
                                                />
                                                <ErrorMessage name="supplierId" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Date</label>
                                                <input
                                                    placeholder='Select  Date'
                                                    type="text"
                                                    name='quantity'

                                                    className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="date" component="div" className="text-red-500" />
                                            </div>
                                        </div>


                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            Save Matrial Inventory
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    )
}

export default CreateMaterialInventory