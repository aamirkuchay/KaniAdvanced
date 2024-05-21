import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'

const Material = () => {

    const [material, setMaterial] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMaterial(values => ({ ...values, [name]: value }))
    }

    return (

        <DefaultLayout>
            {material?.materialName}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add Material Form
                    </h3>
                </div>
                <form action="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Material Name
                                </label>
                                <input
                                    type="text"
                                    name='materialName'
                                    value={material.materialName || ""}
                                    onChange={handleChange}
                                    placeholder="Enter Material name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Unit
                                </label>
                                <input
                                    type="text"
                                    name='unit'
                                    value={material.unit || ""}
                                    onChange={handleChange}
                                    placeholder="Enter Material Unit"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Price <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name='price'
                                value={material.price || ""}
                                onChange={handleChange}
                                placeholder="Enter Material Price"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Material Type
                            </label>
                            <input
                                type="text"
                                name='materialType'
                                value={material.materialType || ""}
                                onChange={handleChange}
                                placeholder="Enter Material Type"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        {/* <SelectGroupOne /> */}



                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Submit
                        </button>
                    </div>
                </form>
            </div>


        </DefaultLayout>
    )
}

export default Material