import React from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const MaterialTable = ({ totalItems, title, data, handleUpdate, handleDelete }) => {
    if (totalItems < 1) return (<><hr className='text-slate-300' /><p className='text-slate-400 text-2xl text-center py-5'>No {title} Available</p></>);

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
                                <tr className='px-5 py-3 bg-slate-300 dark:bg-slate-700 dark:text-white'>
                                    <th

                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        SNO
                                    </th>
                                    <th

                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Description
                                    </th>
                                    <th

                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Grade
                                    </th>
                                    <th

                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Unit
                                    </th>
                                    <th

                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item, index) => (
                                    <tr key={item.id} className='bg-white dark:bg-slate-700 dark:text-white px-5 py-3'>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.description}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.grade}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{item.unit.name}</p>
                                        </td>
                                        <td className="px-5 py-5  border-b border-gray-200  text-sm">
                                            <p className="flex text-gray-900 whitespace-no-wrap">
                                                <FiEdit size={17} className='text-teal-500 hover:text-teal-700 mx-2' onClick={(e) => handleUpdate(e, item)} title='Edit Unit' />  |
                                                <FiTrash2 size={17} className='text-red-500  hover:text-red-700 mx-2' onClick={(e) => handleDelete(e, item?.id)} title='Delete Unit' />
                                            </p>
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

export default MaterialTable