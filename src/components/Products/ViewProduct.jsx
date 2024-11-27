import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import useProduct from '../../hooks/useProduct';
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { GET_IMAGE, customStyles as createCustomStyles } from '../../Constants/utils';
import { Field, Form, Formik } from 'formik';




const ViewProduct = () => {




    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;

    const referenceImages = []
    const actualImages = []




    const theme = useSelector(state => state?.persisted?.theme);



    const { Product, handleDelete, handleUpdate, handlePageChange, pagination, getProduct,productId,getProductId } = useProduct({ referenceImages, actualImages });
    useEffect(() => {
        getProduct()
        getProductId()
    }, [])

    console.log(productId, "prrrrrrrrrrrrrrr");

    const formattedProductId = productId.map(id => ({
        label: id,
        value: id
      }));



    const customStyles = createCustomStyles(theme?.mode);





    const renderTableRows = () => {
        if (!Product || !Product.length) {
            return (
                <tr className='bg-white dark:bg-slate-700 dark:text-white'>
                    <td colSpan="6" className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">No Data Found</p>
                    </td>
                </tr>
            );
        }

        const startingSerialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;

        return Product.map((item, index) => (
            <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {startingSerialNumber + index}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <div className="relative group">
                    <img
                        className="h-10 w-10 rounded-full transition-transform duration-500 ease-in-out transform group-hover:scale-150 group-hover:shadow-xl"
                        crossOrigin="use-credentials"
                        src={`${GET_IMAGE}/products/getimages/${item?.images[0]?.referenceImage}`}
                        alt="Product Image"
                    />
                    </div>

                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.productId}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.productGroup?.productGroupName}
                    </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {item.productCategory?.productCategoryName}
                    </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                    <p className="flex text-gray-900 whitespace-no-wrap">
                        <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Product' />  |
                        <FiTrash2 size={17} className='text-red-500 hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Product' />
                    </p>
                </td>
            </tr>
        ));
    };

    const handleSubmit = (values) => {
        console.log(values, "logggingggggggg");
        const filters = {
            productId: values.ProductId || undefined,
           
        };
        getProduct(pagination.currentPage, filters)


        // ViewMaterialPo(pagination.currentPage, filters);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Products/ View Products" />
            <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-800">
                <div className="pt-5">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-semibold leading-tight">View Products</h2>
                        <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success dark:bg-white dark:text-slate-800`}>
                            Total PO: {pagination.totalItems}
                        </p>
                    </div>




                    <div className='items-center justify-center'>
      <Formik
        initialValues={{
          ProductId: '', // ProductId will store the selected value from ReactSelect
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-4.5 flex flex-wrap gap-6 mt-12">
              <div className="flex-1 min-w-[300px]">
                <label className="mb-2.5 block text-black dark:text-white">Product Id</label>
                <Field
                  name="ProductId"
                  component={ReactSelect}
                  options={formattedProductId}
                  styles={customStyles}
                  placeholder="Select Product Id"
                  value={formattedProductId.find(option => option.value === values.ProductId)} // Set the selected value
                  onChange={option => setFieldValue('ProductId', option ? option.value : '')} // Update Formik's state when a selection is made
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-12 w-[150px] rounded-lg"
              >
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>





                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SNO</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">IMAGE</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PRODUCT ID</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">PRODUCT GROUP</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">CATEGORY</th>

                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableRows()}
                                </tbody>
                            </table>
                        </div>
                        <Pagination totalPages={pagination.totalPages} currentPage={pagination.currentPage} handlePageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default ViewProduct;
