import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { ErrorMessage, Field, Form, Formik } from 'formik';


import ReactSelect from 'react-select';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
const AddProduct = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
   

    const weaveremb = [
        { value: 'BrandA', label: 'Brand A' },
        { value: 'BrandB', label: 'Brand B' },
        { value: 'BrandC', label: 'Brand C' }
    ];
    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Products / AddProducts" />
            <div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                {/* <!-- Contact Form --> */}
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Add Product
                                        </h3>
                                    </div>
                                    <form action="#">
                                        <div className="p-6.5">
                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Product Group </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your subject</option>
                                                            <option value="USA" className="text-body dark:text-bodydark">USA</option>
                                                            <option value="UK" className="text-body dark:text-bodydark">UK</option>
                                                            <option value="Canada" className="text-body dark:text-bodydark">Canada</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Color Group </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your product group</option>
                                                            <option value="BrandA" className="text-body dark:text-bodydark">Brand A</option>
                                                            <option value="BrandB" className="text-body dark:text-bodydark">Brand B</option>
                                                            <option value="BrandC" className="text-body dark:text-bodydark">Brand C</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Product Category </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your subject</option>
                                                            <option value="USA" className="text-body dark:text-bodydark">USA</option>
                                                            <option value="UK" className="text-body dark:text-bodydark">UK</option>
                                                            <option value="Canada" className="text-body dark:text-bodydark">Canada</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> HSN Code</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Design Name </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your subject</option>
                                                            <option value="USA" className="text-body dark:text-bodydark">USA</option>
                                                            <option value="UK" className="text-body dark:text-bodydark">UK</option>
                                                            <option value="Canada" className="text-body dark:text-bodydark">Canada</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Color Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Style </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your subject</option>
                                                            <option value="USA" className="text-body dark:text-bodydark">USA</option>
                                                            <option value="UK" className="text-body dark:text-bodydark">UK</option>
                                                            <option value="Canada" className="text-body dark:text-bodydark">Canada</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Size(in cms) </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your product group</option>
                                                            <option value="BrandA" className="text-body dark:text-bodydark">Brand A</option>
                                                            <option value="BrandB" className="text-body dark:text-bodydark">Brand B</option>
                                                            <option value="BrandC" className="text-body dark:text-bodydark">Brand C</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Product Id </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Barcode</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your last name"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>


                                            <div className="mb-4.5 flex flex-wrap gap-6">
                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Reference Images </label>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Actual Images <span className="text-meta-1">*</span> </label>
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <label className="mb-2.5 block text-black dark:text-white"> Product Description </label>
                                                <textarea
                                                    rows={6}
                                                    placeholder="Type your message"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                ></textarea>
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Weaver/Embroider </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                                                        <select
                                                            value={selectedOption}
                                                            onChange={(e) => {
                                                                setSelectedOption(e.target.value);
                                                                changeTextColor();
                                                            }}
                                                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${isOptionSelected ? 'text-black dark:text-white' : ''}`}
                                                        >
                                                            <option value="" disabled className="text-body dark:text-bodydark">Select your product group</option>
                                                            <option value="BrandA" className="text-body dark:text-bodydark">Brand A</option>
                                                            <option value="BrandB" className="text-body dark:text-bodydark">Brand B</option>
                                                            <option value="BrandC" className="text-body dark:text-bodydark">Brand C</option>
                                                        </select>
                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>








                                                <div className="flex-1 min-w-[300px]">
                                                    <label className="mb-2.5 block text-black dark:text-white"> Weaver/Embroider </label>
                                                    <div className="relative z-20 bg-transparent dark:bg-form-input">


                                                    <ReactSelect
                                value={selectedOption}
                                onChange={(option) => {
                                    setSelectedOption(option);
                                    changeTextColor();
                                }}
                                options={weaveremb}
                                classNamePrefix="react-select"
                                placeholder="Weaver Code"
                            />


                                                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g opacity="0.8">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                                </g>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>












                                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                               Add Product
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                           
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    )
}

export default AddProduct
