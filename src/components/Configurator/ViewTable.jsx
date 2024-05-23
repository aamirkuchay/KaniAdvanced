import React from 'react'
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ViewTable = ({ title, units, totalItems, handleDelete, handleUpdate }) => {

    if (totalItems < 1) return (<><hr className='text-slate-300' /><h3 className='text-slate-400 text-2xl text-center py-5'>No {title} Available</h3></>)
    return (


        <div className="container mx-auto px-4 sm:px-8">
            <div className="pt-5">
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-semibold leading-tight text-center">View {title} </h2>
                    <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
                            bg-success text-success  dark:bg-white dark:text-slate-800`
                        }
                    >
                        Total {title} : {totalItems}
                    </p>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div
                        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                    >
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr className='bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        SNO
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Action
                                    </th>
                                    {/* <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Status
                                    </th> */}
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                    ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {units && units?.map((item, index) => (
                                    <tr className='bg-white dark:bg-slate-700 dark:text-white' key={item.id}>
                                        <td className="px-5 py-2 border-b border-gray-200  text-sm">
                                            <div className="flex">
                                                <div className="flex-shrink-0 w-10 h-10">

                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">

                                                    </p>
                                                    <p className="text-gray-600 whitespace-no-wrap">{index + 1}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item?.name}</p>
                                        </td>
                                        <td className="px-5 py-5  border-b border-gray-200  text-sm">
                                            <p className="flex text-gray-900 whitespace-no-wrap">
                                                <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Unit' />  |
                                                <FiTrash2 size={17} className='text-red-500  hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Unit' />
                                            </p>
                                        </td>

                                        <td
                                            className="px-5 py-5 border-b border-gray-200  text-sm text-right"
                                        >
                                            <button
                                                type="button"
                                                className="inline-block text-gray-500 hover:text-gray-700"
                                            >
                                                <svg
                                                    className="inline-block h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTable