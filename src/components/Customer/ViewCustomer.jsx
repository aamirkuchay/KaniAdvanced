import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import MaterialPoModal from '../../hooks/MaterialPoModal';  // Import the modal component
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';
import useCustomer from '../../hooks/useCustomer';
import { ErrorMessage, Field } from 'formik';


const ViewCustomer = () => {
  const { Customer, getCustomer, handleDelete, pagination, handleUpdate, handlePageChange, GetCustomerById } = useCustomer();
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterialPos, setSelectedMaterialPos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getCustomer();
  }, []);

  const handleViewMaterialPos = (materialPos) => {
    setSelectedMaterialPos(materialPos);
    setShowModal(true);
  };

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };
  console.log(Customer, "cusssssssss");

  // const filteredCustomer = Customer?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  // console.log(filteredCustomer,"filteredddddddddddddd");
  const renderTableRows = () => {
    // if (!filteredCustomer || !filteredCustomer.length) return (
    //   <tr>
    //     <td colSpan="6" className="text-center">No results found</td>
    //   </tr>
    // );

    const startingSerialNumber = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
    return Customer.map((item, index) => (
      <tr key={index} className='bg-white dark:bg-slate-700 dark:text-white'>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {startingSerialNumber + index}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.customerName}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {item.countryName}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap"> {item?.customerGroup?.customerGroupName}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap"> {item?.retailLocation}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 text-sm">
          <p className="text-gray-900 whitespace-no-wrap"> {item?.shippingAddress}</p>
        </td>


        <td className="px-5 py-5  border-b border-gray-200  text-sm">
          <p className="flex text-gray-900 whitespace-no-wrap">
            <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Customer' />  |
            <FiTrash2 size={17} className='text-red-500  hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Customer' />
          </p>
        </td>
      </tr>
    ));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer / View Customer" />
      <div className="container mx-auto px-4 sm:px-8 bg-white dark:bg-slate-800">
        <div className="pt-5">
          {/* <div className="flex justify-center items-center p-3">
            <input
              type="text"
              name="search"
              placeholder="Search by Name"
              className="w-[300px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
              value={searchQuery}
              // onChange={handleSearch}
            />
            <button className="w-[80px] h-12 rounded-lg bg-blue-700 text-white dark:bg-blue-600 dark:text-slate-300  ml-4">
              Search
            </button>
          </div> */}
          <div className="flex justify-between mt-10">
            <h2 className="text-xl font-semibold leading-tight">
              View Customer
            </h2>
            <p
              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success  dark:bg-white dark:text-slate-800`}
            >
              Total Customer: {pagination.totalItems}
            </p>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-slate-300 dark:bg-slate-700 dark:text-white">
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      S.No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer Group
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Retail Location
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Shipping Address
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
              </table>
            </div>
            <Pagination
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCustomer;