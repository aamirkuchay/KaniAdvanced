import React from 'react';

const MaterialPoModal = ({ show, onClose, materialPos }) => {
    if (!show) return null;

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto flex items-center md:mt-12 md:ml-[190px] justify-center">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
            <div className="bg-slate-100 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-[600px] sm:ml-4 z-50">
                <div className="px-4 py-5 sm:px-6 ">
                    <h3 className="text-lg leading-6 font-bold text-gray-900 text-center bg-slate-100 h-12  ">Material POs</h3>
                </div>
                <div className="px-4 py-5 sm:px-6 overflow-y-auto max-h-80">
                    <div className="overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead className='bg-white'>
                                <tr className='bg-gray-200'>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Cost/ Gram
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Total Price
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Material Description
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Material Grade
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {materialPos.map((po, idx) => (
                                    <tr key={idx} className='bg-white'>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.id}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.costPerGram}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.quantity}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.totalPrice}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.material.description}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            {po.material.grade}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MaterialPoModal;