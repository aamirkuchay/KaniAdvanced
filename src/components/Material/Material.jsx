import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Material = () => {
  const formik = useFormik({
    initialValues: {
      field1: '',
      field2: '',
      field3: '',
      field4: '',
      field5: '',
    },
    validationSchema: Yup.object({
      field1: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      field2: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
     
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    
    <DefaultLayout>
        <h1 className="text-3xl font-bold mb-4 text-black ">Material / Add Material </h1>
          {/* <Breadcrumb pageName="Mterial / AddMaterial" /> */}
      <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Material Form</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
  <label htmlFor="field1" className="block text-sm font-medium text-gray-700">
    Field 1
  </label>
  <input
    type="text"
    id="field1"
    name="field1"
    placeholder="Field 1"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.field1}
    className="mt-1 block w-full p-4 text-lg border border-gray-300 rounded-md"
  />
  {formik.touched.field1 && formik.errors.field1 ? (
    <div className="text-red-600 text-sm">{formik.errors.field1}</div>
  ) : null}
</div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="field2" className="block text-sm font-medium text-gray-700">
                Field 2
              </label>
              <input
                type="text"
                id="field2"
                name="field2"
                placeholder="Field 2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.field2}
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
              />
              {formik.touched.field2 && formik.errors.field2 ? (
                <div className="text-red-600 text-sm">{formik.errors.field2}</div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="field3" className="block text-sm font-medium text-gray-700">
                Field 3
              </label>
              <input
                type="text"
                id="field3"
                name="field3"
                placeholder="Field 3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.field3}
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="field4" className="block text-sm font-medium text-gray-700">
                Field 4
              </label>
              <input
                type="text"
                id="field4"
                name="field4"
                placeholder="Field 4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.field4}
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="field5" className="block text-sm font-medium text-gray-700">
              Field 5
            </label>
            <input
              type="text"
              id="field5"
              name="field5"
              placeholder="Field 5"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.field5}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md"
            />
          </div>
          {/* <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Submit
          </button> */}
           <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                Submit
            </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Material;
