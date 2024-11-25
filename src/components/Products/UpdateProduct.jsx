import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Breadcrumb from '../Breadcrumbs/Breadcrumb'
import { Formik } from 'formik'
import { Form } from 'react-router-dom'

const UpdateProduct = () => {
  return (
    <>
     <DefaultLayout>
     <Breadcrumb pageName="Products / UpdateProduct" />
     <div>

        <Formik
        // initialValues={currentProduct}
        // onSubmit={handleSubmit}
        >
        {({ setFieldValue, values, refImage }) => (
            <Form>

<div className="flex flex-col gap-9">
    {/* <!-- Contact Form --> */}
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Update Product
                                        </h3>
                                    </div>

        </div>
</div>
            </Form>

        )}
        </Formik>
     </div>
     </DefaultLayout>
    </>
  )
}

export default UpdateProduct