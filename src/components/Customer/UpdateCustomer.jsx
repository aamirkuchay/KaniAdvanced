import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelect from 'react-select';
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import useCustomer from '../../hooks/useCustomer';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_CUSTOMER_URL} from "../../Constants/utils"; 
import { toast } from 'react-toastify';

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const { seloptions, groups, GetCustomerById, currentCustomer } =
    useCustomer();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [CustomerType, setCustomerType] = useState();
  const theme = useSelector((state) => state?.persisted?.theme);
  const customStyles = createCustomStyles(theme?.mode);
  const workerSelectStyles = {
    ...customStyles,
    control: (provided) => ({
      ...provided,
      ...customStyles.control,
      backgroundColor: customStyles.control.backgroundColor,

      maxHeight: '90px',

      overflow: 'auto',
      marginLeft: '10px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure dropdown is above other elements
    }),
  };

  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const CustomerData = await GetCustomerById(id);

      if (CustomerData) {
        setInitialValues({
          name: CustomerData?.name,
          phoneNumber: CustomerData?.phoneNumber,
          CustomerCode: CustomerData?.CustomerCode,
          address: CustomerData?.address,
          bankName: CustomerData?.bankName,
          accountNo: CustomerData?.accountNo,
          ifscCode: CustomerData?.ifscCode,
          emailId: CustomerData?.emailId,
          CustomerType: seloptions.find(
            (option) => option.value === CustomerData.CustomerType,
          ),
        });

        // Initialize the rows state with readonly property for fetched data
        setRows(
          CustomerData.groupTypes &&
            CustomerData.groupTypes.map((group) => ({
              selectedOption1: groups.find(
                (g) => g.value === group.groupTypeName,
              ),
              selectedOption3: group.workers.map((worker) => ({
                value: worker.workerCode,
                label: worker.workerCode,
              })),
              numOfLooms: group.noOfLooms,
              readonly: true, // Mark as readonly
            })),
        );
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      selectedOption1: null,
      selectedOption3: [],
      numOfLooms: 0,
      readonly: false,
    };
    setRows([...rows, newRow]);
  };
  const deleteRow = (index) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  const handleUpdateSubmit = async (values, { setSubmitting }) => {
    const formData = {
      ...values,
      CustomerType: values.CustomerType?.value,
      groupTypes: rows?.map((row) => ({
        groupTypeName: row?.selectedOption1?.value,
        noOfLooms: row?.numOfLooms,
        workers: row?.selectedOption3?.map((worker) => ({
          workerCode: worker.value,
        })),
      })),
    };

    try {
      const url = `${UPDATE_CUSTOMER_URL}/${id}`; // Adjust the URL if needed
      const method = 'PUT'; // Use PUT method for updating

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Customer updated successfully`);
        navigate('/Customer/view');
      } else {
        toast.error(`${data.errorMessage}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const generateWorkerOptions = (groupName, CustomerCode, numOfLooms = 1) => {
    const workerOptions = [];
    for (let i = 1; i <= numOfLooms; i++) {
      const label = `${groupName
        .slice(0, 3)
        .toUpperCase()}-${CustomerCode.slice(0, 5)}-${String(i).padStart(
        3,
        '0',
      )}`;
      workerOptions.push({ value: label, label });
    }
    return workerOptions;
  };
  const handleGroupChange = (index, option) => {
    const newRows = [...rows];
    newRows[index].selectedOption1 = option;
    newRows[index].selectedOption3 = generateWorkerOptions(
      option.label,
      initialValues.CustomerCode,
      newRows[index].numOfLooms,
    );
    setRows(newRows);
  };

  const handleLoomsChange = (index, numOfLooms) => {
    const newRows = [...rows];
    newRows[index].numOfLooms = numOfLooms;
    newRows[index].selectedOption3 = generateWorkerOptions(
      newRows[index].selectedOption1?.label,
      initialValues.CustomerCode,
      numOfLooms,
    );
    setRows(newRows);
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customer / Update Customer" />
      <div>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.phoneNumber) {
              errors.phoneNumber = 'Required';
            }
            if (values.phoneNumber.length < 10) {
              errors.phoneNumber =
                'Phone Number Must Be Greater than 10 digits';
            }
            if (!values.CustomerCode) {
              errors.CustomerCode = 'Required';
            }
            if (!values.address) {
              errors.address = 'Required';
            }
            if (!values.bankName) {
              errors.bankName = 'Required';
            }
            if (!values.accountNo) {
              errors.accountNo = 'Required';
            }
            if (values.accountNo.length < 10) {
              errors.accountNo =
                'Account Number Must Be Greater than 10 digits';
            }
            if (!values.ifscCode) {
              errors.ifscCode = 'Required';
            }
            if (!values.emailId) {
              errors.emailId = 'Required';
            }
            return errors;
          }}
          onSubmit={handleUpdateSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="flex flex-col gap-9">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                      Update Customer
                    </h3>
                  </div>
                  <div className="p-6.5">
                    <div className="mb-4.5 flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Customer Code
                        </label>
                        <Field
                          readOnly
                          type="text"
                          name="CustomerCode"
                          placeholder="Enter Customer Code"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="CustomerCode"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Phone Number
                        </label>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter Phone Number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Email Id
                        </label>
                        <Field
                          type="text"
                          name="emailId"
                          placeholder="Enter Email Id"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="emailId"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Bank Name
                        </label>
                        <Field
                          type="text"
                          name="bankName"
                          placeholder="Enter Bank Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="bankName"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-wrap gap-6">
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Account Number
                        </label>
                        <Field
                          type="text"
                          name="accountNo"
                          placeholder="Enter Account Number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="accountNo"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="flex-1 min-w-[300px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          IFSC Code
                        </label>
                        <Field
                          type="text"
                          name="ifscCode"
                          placeholder="Enter IFSC Code"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                        />
                        <ErrorMessage
                          name="ifscCode"
                          component="div"
                          className="text-red-500"
                        />
                      </div>
                      <div className="min-w-[320px] sm:min-w-[400px]">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Customer Type
                        </label>
                        <ReactSelect
                          isDisabled
                          styles={customStyles}
                          options={seloptions}
                          value={values?.CustomerType}
                          onChange={(option) =>
                            setFieldValue('CustomerType', option)
                          }
                        />
                      </div>
                    </div>
                  </div>

                
                  <button
                    type="submit"
                    className="bg-primary w-[300px] sm:w-[840px]  sm:ml-[20px] mb-4 text-white py-2 px-4 rounded hover:bg-primary-dark  mt-3 ml-5 mr-10 z-[3000]"
                  >
                    Update Customer
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default UpdateCustomer;