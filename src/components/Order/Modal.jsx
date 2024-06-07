import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage, Formik } from 'formik';
import ReactSelect from 'react-select';

const Modal = ({ isOpen, onRequestClose, initialValues, onSubmit, width = "400px", height = "auto" }) => {
  const [formData, setFormData] = useState(initialValues || {});
  const productgrp = [
    { value: 'BrandA', label: 'Brand A' },
    { value: 'BrandB', label: 'Brand B' },
    { value: 'BrandC', label: 'Brand C' },
  ];

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleBackdropClick = () => {
    onRequestClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-11 z-50"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg relative overflow-y-auto"
            style={{ 
              width, 
              height,
              position: 'absolute', 
              right: '50px', 
              top: '50px', 
              transform: 'none' 
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              className="absolute top-0 right-0 m-3 text-gray-600 hover:text-gray-800"
              onClick={onRequestClose}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-slate-500 text-center text-xl dark:text-black">
                Product Detail
              </h3>
            </div>
            <Formik
              initialValues={formData}
              onSubmit={(values, actions) => {
                onSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {({ values, handleSubmit, handleBlur, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-1 block text-black dark:text-[rgb(200,200,200)]">Order Category</label>
                      <ReactSelect
                        name="orderCatagory"
                        value={productgrp.find(option => option.value === values.orderCatagory)}
                        onChange={(option) => setFieldValue('orderCatagory', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="orderCatagory" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="productId" className="mb-3">Product ID</label>
                      <Field
                        type="text"
                        id="productId"
                        name="productId"
                       className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="productId" component="div" className="text-red-600 text-sm" />
                    </div>

                   
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="barCode" className="mb-2">BarCode</label>
                      <Field
                        type="text"
                        id="barCode"
                        name="barCode"
                         className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="barCode" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-1 block text-black dark:text-[rgb(200,200,200)]">Color Group</label>
                      <ReactSelect
                        name="colorGroup"
                        value={productgrp.find(option => option.value === values.colorGroup)}
                        onChange={(option) => setFieldValue('colorGroup', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="colorGroup" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-2.5 block text-black dark:text-[rgb(200,200,200)]">Product Group</label>
                      <ReactSelect
                        name="productGroup"
                        value={productgrp.find(option => option.value === values.productGroup)}
                        onChange={(option) => setFieldValue('productGroup', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="productGroup" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-2.5 block text-black dark:text-[rgb(200,200,200)]">Product Category</label>
                      <ReactSelect
                        name="productCatagory"
                        value={productgrp.find(option => option.value === values.productCatagory)}
                        onChange={(option) => setFieldValue('productCatagory', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="productCatagory" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className=" block text-black dark:text-[rgb(200,200,200)]">Design Name</label>
                      <ReactSelect
                        name="designName"
                        value={productgrp.find(option => option.value === values.designName)}
                        onChange={(option) => setFieldValue('designName', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="designName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">HSN Code</label>
                      <Field
                        type="text"
                        id="hsnCode"
                        name="hsnCode"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="hsnCode" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="colorName" className="mb-2">Color Name</label>
                      <Field
                        type="text"
                        id="colorName"
                        name="colorName"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="colorName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-1 block text-black dark:text-[rgb(200,200,200)]">Style</label>
                      <ReactSelect
                        name="style"
                        value={productgrp.find(option => option.value === values.style)}
                        onChange={(option) => setFieldValue('style', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="style" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-2.5 block text-black dark:text-[rgb(200,200,200)]">Size (in cms)</label>
                      <ReactSelect
                        name="size"
                        value={productgrp.find(option => option.value === values.size)}
                        onChange={(option) => setFieldValue('size', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      />
                      <ErrorMessage name="size" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label className="mb-2.5 block text-black dark:text-[rgb(200,200,200)]">Units</label>
                      <ReactSelect
                        name="units"
                        value={productgrp.find(option => option.value === values.units)}
                        onChange={(option) => setFieldValue('units', option.value)}
                        onBlur={handleBlur}
                        options={productgrp}
                        className="bg-white dark:bg-form-input"
                        classNamePrefix="react-select"
                        placeholder="Select"
                      /> 

                      
                      <ErrorMessage name="units" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Weight(gms)</label>
                      <Field
                        type="text"
                        id="weight"
                        name="weight"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="weight" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Warp Colors</label>
                      <Field
                        type="text"
                        id="warp"
                        name="warp"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="warp" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Weft Colors</label>
                      <Field
                        type="text"
                        id="weft"
                        name="weft"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="weft" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Weave</label>
                      <Field
                        type="text"
                        id="weave"
                        name="weave"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="weave" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Warp Yarn</label>
                      <Field
                        type="text"
                        id="WarpYarn"
                        name="WarpYarn"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="WarpYarn" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Weft Yarn</label>
                      <Field
                        type="text"
                        id="WeftYarn"
                        name="WeftYarn"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="WeftYarn" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Pic & Read</label>
                      <Field
                        type="text"
                        id="pic"
                        name="pic"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="pic" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2">Deying Cost</label>
                      <Field
                        type="text"
                        id="deying"
                        name="deying"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="deying" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2"> Cost</label>
                      <Field
                        type="text"
                        id="cost"
                        name="cost"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="cost" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2"> MRP</label>
                      <Field
                        type="text"
                        id="mrp"
                        name="mro"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="mrp" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[300px] mt-4">
                      <label htmlFor="hsnCode" className="mb-2"> Wholesale Price</label>
                      <Field
                        type="text"
                        id="wPrice"
                        name="wPrice"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <ErrorMessage name="wPrice" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="flex">
                        <div className="flex-1 min-w-[300px] mt-4">
                          <label htmlFor="referenceImages" className="mb-2"> Reference Images </label>
                          <img src={values.referenceImages} alt="Reference Images" className="mt-1" style={{ maxWidth: '100%', height: 'auto' }} />
                          <ErrorMessage name="referenceImages" component="div" className="text-red-600 text-sm" />
                        </div>
                        <div className="flex-1 min-w-[300px] mt-4">
                          <label htmlFor="actualImages" className="mb-2"> Actual Images </label>
                          <img src={values.actualImages} alt="Actual Images" className="mt-1" style={{ maxWidth: '100%', height: 'auto' }} />
                          <ErrorMessage name="actualImages" component="div" className="text-red-600 text-sm" />
                        </div>
                      </div>

                     

                      


                  </div>


                  <div className="mb-6">
                          <label className="mb-2.5 block text-black dark:text-black mt-7">Weaver/Embroider</label>
                          <textarea
                              rows={3}
                              name="weiver"
                              placeholder="Type your message"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-black dark:focus:border-primary"
                          ></textarea>
                      </div>
                  
                      <div className="mb-6">
                          <label className="mb-2.5 block text-black dark:text-black mt-7">Weaver Code</label>
                          <textarea
                              rows={3}
                              name="weiverCode"
                              placeholder="Type your message"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default dark:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-black dark:focus:border-primary"
                          ></textarea>
                      </div>
                  

                  <div className="flex justify-end mt-6">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
