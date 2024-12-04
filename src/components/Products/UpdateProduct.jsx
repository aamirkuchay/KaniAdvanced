import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Field, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_PRODUCTBYID_URL, UPDATE_PRODUCT_URL } from '../../Constants/utils';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { customStyles as createCustomStyles } from '../../Constants/utils';
import useProduct from '../../hooks/useProduct';
import { toast } from 'react-toastify';



const UpdateProduct = () => {
    
    const referenceImages="";
    const actualImages="";
     const productIdField="";
     
    const [product, setProduct] = useState(null); // To store fetched product data
    const [colorGroupOptions, setColorGroupOptions] = useState([]); // Color group options for ReactSelect
    const [isLoading, setIsLoading] = useState(true); // Loader state
    const theme = useSelector(state => state?.persisted?.theme);
    const customStyles = createCustomStyles(theme?.mode);
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const colorGroup = useSelector(state => state?.nonPersisted?.color);
    const design = useSelector(state => state?.nonPersisted?.design); const [designOptions, setdesignOptions] = useState([])
    const [styleOptions, setstyleOptions] = useState([])
    const [sizeOptions, setsizeOptions] = useState([])
    const style = useSelector(state => state?.nonPersisted?.style);
    const size = useSelector(state => state?.nonPersisted?.size);
    const [productCategoryOptions, setproductCategoryOptions] = useState([]);
    const [hsnOptions, sethsnOptions] = useState([]);
 const productCategory = useSelector(state => state?.nonPersisted?.productCategory);
 const hsnCode = useSelector(state => state?.nonPersisted?.hsn);
 const [supplierNameOptions, setsupplierNameOptions] = useState([])
    const [supplierCodeOptions, setsupplierCodeOptions] = useState([])
    const supplier = useSelector(state => state?.nonPersisted?.supplier);
    const [productGroupOption, setproductGroupOption] = useState([])
    const productGroup = useSelector(state => state?.nonPersisted?.productGroup);
 
    const navigate = useNavigate(); // Initialize navigate
    // const {  handleUpdateSubmit } = useProduct({referenceImages,actualImages,productIdField});

    const [previews, setPreviews] = useState([]);
    const [previewsActual, setPreviewsActual] = useState([]);

    const { token } = currentUser;
    const { id } = useParams();
    const productId = id;
    // Fetch product by ID

    // const handleUpdateSubmit = async (values, { setSubmitting }) => {
    //     console.log(values, "Submitted values:");
    
    //     // Ensure `id` exists
      


        

    
    //     // Explicitly map only the `id` of the supplier and supplierCode
    //     const product = {
    //         ...values,
    //         productGroup: { id: values.productGroup?.id || 0 }, 
    //         supplier: { id: values.supplier?.id || 0 },  // Ensure that only `id` is included
    //         supplierCode: { id: values.supplierCode?.id || 0 },  // Ensure only `id` of supplierCode
    //     };
    
    //     // Log to ensure the product object looks as expected
    //     console.log("Product object to send:", JSON.stringify(product, null, 2));
    
    //     try {
    //         const url = `${UPDATE_PRODUCT_URL}/${id}`;
    //         console.log("Update URL:", url);
    
    //         const response = await fetch(url, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json", // Set correct content type
    //                 "Authorization": `Bearer ${token}`, // Include token if required
    //             },
    //             body: JSON.stringify(product), // Send raw JSON
    //         });
    
    //         const data = await response.json();
    
    //         if (response.ok) {
    //             console.log(data, "Update response:");
    //             toast.success("Product updated successfully");
    //             navigate('/inventory/viewMaterialInventory');
    //         } else {
    //             console.error("Update failed:", data.errorMessage);
    //             toast.error(data.errorMessage || "An error occurred while updating the product.");
    //         }
    //     } catch (error) {
    //         console.error("Error during update:", error);
    //         toast.error("An error occurred while updating the product.");
    //     } finally {
    //         if (setSubmitting) setSubmitting(false); // Stop any loading spinner
    //     }
    // };


    const handleUpdateSubmit = async (values, { setSubmitting }) => {
        console.log(values, "Submitted values:");
    
        // Ensure `id` exists

    
        // Create FormData instance
        const formData = new FormData();
    
        // Map the necessary fields to create the product object
        const product = {
            ...values,
            productGroup: { id: values.productGroup?.id || 0 },
            supplier: { id: values.supplier?.id || 0 },
            supplierCode: { id: values.supplierCode?.id || 0 },
        };
    
        // Append product data as JSON
        formData.append("product", JSON.stringify(product));
    
        // Append file if provided
        if (values.file) {
            formData.append("file", values.file); // Replace "file" with the appropriate field name
        }
    
        // Log the FormData content (for debugging)
        console.log("FormData content:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const url = `${UPDATE_PRODUCT_URL}/${id}`;
            console.log("Update URL:", url);
    
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
        
            let data;
            try {
                data = await response.json();
            } catch {
                data = await response.text();
            }
        
            if (response.ok) {
                console.log(data, "Update response:");
                toast.success("Product updated successfully");
                 navigate('/product/viewProducts');
            } else {
                console.error("Update failed. Status:", response.status, response.statusText);
                console.error("Raw response:", data);
                toast.error(data || "A conflict occurred while updating the product.");
            }
        } catch (error) {
            console.error("Error during update:", error);
            toast.error("An error occurred while updating the product.");
        } finally {
            if (setSubmitting) setSubmitting(false);
        }
        
    };
    
    const getProductById = async () => {
        try {
            const response = await fetch(`${GET_PRODUCTBYID_URL}/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }

            const data = await response.json();
            setProduct(data); // Store fetched product
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false); // Stop loader
        }
    };
    console.log(product,'hloooooo')

    // Fetch data when component mounts
    useEffect(() => {
        getProductById();
    }, [id]);

    // Prepare color group options
    useEffect(() => {
        if (colorGroup.data) {
            const formattedOptions = colorGroup.data.map((color) => ({
                value: color.id,
                label: color.colorName,
                colorGroupObject: color,
                color:{id:color.id}
            }));
            setColorGroupOptions(formattedOptions);
        }
    }, [colorGroup.data]);
    useEffect(() => {
        if (productCategory.data) {
            const formattedOptions = productCategory.data.map(prodCat => ({
                value: prodCat.id,
                label: prodCat?.productCategoryName,
                productCategoryObject: prodCat,
                productCategoryid: {id:prodCat.id},
                
            }));
            setproductCategoryOptions(formattedOptions);
        }
    }, [productCategory.data]);
    useEffect(() => {
        if (hsnCode.data) {
            const formattedOptions = hsnCode.data.map(hsn => ({
                value: hsn.id,
                label: hsn?.hsnCodeName,
                hsnObject: hsn,
                hsnCode: { id: hsn.id }
            }));
            sethsnOptions(formattedOptions);
        }
    }, [hsnCode.data]);
    useEffect(() => {
        if (design.data) {
            const formattedOptions = design.data.map(design => ({
                value: design.id,
                label: design?.designName,
                designObject: design,
                designid:{id: design.id}
            }));
            setdesignOptions(formattedOptions);
        }
    }, [design.data]);
    useEffect(() => {
        if (style.data) {
            const formattedOptions = style.data.map(style => ({
                value: style.id,
                label: style?.stylesName,
                styleObject: style,
                styleid: {id : style.id}
            }));
            setstyleOptions(formattedOptions);
        }
    }, [style.data]);
    useEffect(() => {
        if (size.data) {
            const formattedOptions = size.data.map(size => ({
                value: size.id,
                label: size?.sizeName,
                sizeObject: size,
                sizeid: {id : size.id}
            }));
            setsizeOptions(formattedOptions);
        }
    }, [size.data]);

    useEffect(() => {
        if (supplier.data) {
            const formattedOptions = supplier.data.map(supp => ({
                value: supp.id,
                label: supp?.name,
                supplierNameObject: supp,
                suplierid: { id: supp.id }
            }));
            setsupplierNameOptions(formattedOptions);
        }
    }, [supplier.data]);
    useEffect(() => {
        if (supplier.data) {
            const formattedOptions = supplier.data.map(supp => ({
                value: supp.id,
                label: supp?.supplierCode,
                supplierCodeObject: supp,
                suplieridd: { id: supp.id }
            }));
            setsupplierCodeOptions(formattedOptions);
        }
    }, [supplier.data]);


    useEffect(() => {
        if (productGroup.data) {
            const formattedOptions = productGroup.data.map(product => ({
                value: product.id,
                label: product.productGroupName,
                productGroupObject: product,
            }));
            setproductGroupOption(formattedOptions);
        }
    }, [productGroup.data]);



    // Show loader until product data is fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }





    const onSubmit = async (values,e) => {
        console.log("Form submission triggered");
        console.log(values, "Received values from frontend");
    
        const formattedValues = {
            // productId: id, // Assuming `id` is defined and corresponds to the product being updated
            // productId: productId,
            productGroup: { 
                id: values.productGroup?.id , 
                
                // productGroupName: values.productGroup?.productGroupName || "" 
            },
            colors: { 
                // id: values.colors?.id || { id: 1 }, 
                 id: values.colors?.id , 
                 
            },
            //colors: product?.colors || { id: 1, colorName: "green" },
            productCategory: { 
                 id: values.productCategory?.id , 
                // productCategoryName: values.productCategory?.productCategoryName || "" 
            },
            design: { 
                id: values.design?.id , 
                // designName: values.design?.designName || "" 
            },
            // hsnCode: { 
            //     id: values.hsnCode?.id , 
            //     // hsnCodeName: values.hsnCode?.hsnCodeName || "" 
            // },
            hsnCode: { 

                id: values.hsnCode?.id , // Only the `id` is sent
            },
            
            warpColors: values.warpColors || "",
            weftColors: values.weftColors || "",
            warpYarn: values.warpYarn || "",
            weftYarn: values.weftYarn || "",
            weave: values.weave || "",
            finishedWeight: values.finishedWeight || null,
            materialWeight: values.materialWeight || null,
            gstDetails: values.gstDetails || "",
            gstDescription: values.gstDescription || "",
            gstRate: values.gstRate || null,
            taxationType: values.taxationType || "",
            pixAndReed: values.pixAndReed || "",
            cost: values.cost || 0,
            dyeingCost: values.dyeingCost || 0,
            baseColour: values.baseColour || "",
            embroideryColors: values.embroideryColors || "",
            fabricWeave: values.fabricWeave || "",
            fabricCode: values.fabricCode || "",
            fabricCost: values.fabricCost || 0,
            embroideryCost: values.embroideryCost || 0,
            totalCost: values.totalCost || 0,
            kaniColors: values.kaniColors || "",
            mrp: values.mrp || 0,
            wholesalePrice: values.wholesalePrice || 0,
            usdPrice: values.usdPrice || 0,
            euroPrice: values.euroPrice || 0,
            gbpPrice: values.gbpPrice || 0,
            rmbPrice: values.rmbPrice || 0,
            units: values.units || "",
            productDescription: values.productDescription || "",
            supplier: {
                // name: values.supplier?.name || ""
                id: values.supplier?.id ,
            },
            supplierCode: {
                // supplierCode: values.supplierCode?.supplierCode || ""
                id: values.supplierCode?.id,
            }
        };
    
        console.log(JSON.stringify(formattedValues, null, 2), "Formatted Values");
        handleUpdateSubmit(formattedValues,e);
    };
    
   
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Products / UpdateProduct" />
            <div>
                <Formik
                    enableReinitialize // Update initial values when product data changes
                    initialValues={{
                        // id: product?.id || "",
                        productGroup: product?.productGroup ||{id:0} ,
                          colors: product?.colors || { id: 0  },
                        // colors: product?.colors?.id || '',
                        
                        productCategory: product?.productCategory || {id:0} ,
                        hsnCode: product?.hsnCode || { id:0},
                        design: product?.design || { id: 0 },
                        styles: product?.styles || { id: 0},
                        sizes: product?.sizes || { id: 1, sizeName: "3l" },
                        productId:product?.productId || '',
                        colorName: product?.colorName || '',
                        barcode:product?.barcode || '',
                        finishedWeight:product?.finishedWeight || '',
                        materialWeight:product?.materialWeight || '',
                        warpColors:product?.warpColors || '',
                        weftColors:product?.weftColors || '',
                        weave:product?.weave || '',
                        warpYarn:product?.warpYarn || '',
                        weftYarn:product?.weftYarn || '',
                        pixAndReed:product?.pixAndReed || '',
                        units:product?.units || '',
                        cost:product?.cost || '',
                         mrp:product?.mrp || '',
                         dyeingCost:product?.dyeingCost || '',
                         wholesalePrice:product?.wholesalePrice || '',
                         usdPrice:product?.usdPrice || '',
                         euroPrice:product?.euroPrice || '',
                         gbpPrice:product?.gbpPrice || '',
                         rmbPrice:product?.rmbPrice || '',
                         productDescription:product?.productDescription || '',
                         baseColour:product?.baseColour || '',
                         kaniColors:product?.kaniColors || '',
                         fabricWeave:product?.fabricWeave || '',
                         fabricCode:product?.fabricCode || '',
                         fabricCost:product?.fabricCost || '',
                         supplier: product?.supplier || { id: 0 },
                         supplierCode: product?.supplierCode || { id:  0},
                         embroideryCost:product?.embroideryCost || '',
                         totalCost:product?.totalCost || '',







                    }}
                    // onSubmit={(values) => {
                    //     console.log('Submitted values:', values);
                    //     // Add API call for updating the product here
                    // }}
                    // onSubmit={onSubmit}
                    onSubmit={handleUpdateSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <form>
                            <div className="flex flex-col gap-9">
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            Update Product
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            {/* Product Group Field */}
                                            {/* <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Product Group
                                                </label>
                                                <Field
                                                    name="productGroup"
                                                    type="text"
                                                    readOnly
                                                    placeholder="Product Group"
                                                    value={values.productGroup}
                                                     onChange={(option) => setFieldValue('productGroup', option ? option.productGroup : null)}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-field dark:text-white dark:focus:border-primary"
                                                />
                                            </div> */}
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white">Product Group</label>
                                                <div className="bg-white dark:bg-form-Field">
                                                    <ReactSelect
                                                        name="productGroup"
                                                        value={productGroupOption?.find(option => option.value === values.productGroup?.id) || null}
                                                        onChange={(option) => setFieldValue('productGroup', option ? option.productGroupObject : null)}
                                                        options={productGroupOption}
                                                        styles={customStyles}
                                                        className="bg-white dark:bg-form-Field"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Product Group"
                                                        isDisabled={true}  // This makes the select readonly
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex-1 min-w-[300px]">
    <label className="mb-2.5 block text-black dark:text-white">
        Color Group
    </label>
    <div className="z-20 bg-transparent dark:bg-form-field">
        <ReactSelect
            name="colors"
            value={
                colorGroupOptions.find(option => option.value === values.colors?.id) || null
            } // Match the current value
            // onChange={(option) => {
            //     setFieldValue(
            //         'colors',
            //         option
            //             ? { id: option.value, colorName: option.label }
            //             : null
            //     ); // Update the formik state
            // }}
            onChange={(option) => setFieldValue('colors', option ? option.color : null)}
            options={colorGroupOptions}
            styles={customStyles} // Apply custom styles
            className="bg-white dark:bg-form-field"
            classNamePrefix="react-select"
            placeholder="Select Color Group" // Static placeholder
        />
    </div>
</div>


                                        </div>

                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Product Category </label>
                                                <div className=" z-20 bg-transparent dark:bg-form-Field">
                                                    <ReactSelect
                                                        name="productCategory"
                                                        value={productCategoryOptions?.find(option => option.value === values.productCategory?.id) || null}
                                                        onChange={(option) => setFieldValue('productCategory', option ? option.productCategoryid : null)}
                                                        options={productCategoryOptions}
                                                        styles={customStyles} // Pass custom styles here
                                                        className="bg-white dark:bg-form-Field"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Product Category"
                                                        isDisabled={true}  // This makes the select readonly
        
                                                    />


                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> HSN Code</label>
                                                <ReactSelect
                                                    name="hsnCode"
                                                    value={hsnOptions?.find(option => option.value === values.hsnCode?.id) || null}
                                                    // onChange={(option) => setFieldValue('supplier', option ? option.suplierid : null)}
                                                    onChange={(option) => setFieldValue('hsnCode', option ? option.hsnCode : null)}
                                                    options={hsnOptions}
                                                    styles={customStyles} // Pass custom styles here
                                                    className="bg-white dark:bg-form-Field"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select Hsn Code"

                                                    
                                                />
                                            </div>
                                        </div>

                                                        
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Design Name </label>
                                                <div className=" z-20 bg-transparent dark:bg-form-Field">
                                                    <ReactSelect
                                                        name="design"
                                                        value={designOptions?.find(option => option.value === values.design?.id) || null}
                                                        onChange={(option) => setFieldValue('design', option ? option.designid : null)}
                                                        options={designOptions}
                                                        styles={customStyles} // Pass custom styles here
                                                        className="bg-white dark:bg-form-Field"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Design"
                                                        isDisabled={true}  // This makes the select readonly
        
                                                    />
                                                    {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g opacity="0.8">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                            </g>
                                                        </svg>
                                                    </span> */}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Color Name</label>
                                                <Field
                                                    name='colorName'
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                  
                                                    readOnly // Make the field read-only

                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Style </label>
                                                <div className="relative z-20 bg-transparent dark:bg-form-Field">
                                                    <ReactSelect
                                                        name="styles"
                                                        value={styleOptions?.find(option => option.value === values.styles?.id) || null}
                                                        onChange={(option) => setFieldValue('styles', option ? option.styleid : null)}
                                                        options={styleOptions}
                                                        styles={{
                                                            ...customStyles,
                                                            menuPortal: (base) => ({
                                                                ...base,
                                                                zIndex: 9999,  // Set high z-index to make sure the dropdown appears above other components
                                                            }),
                                                        }} // Pass custom styles here
                                                        className="bg-white dark:bg-form-Field"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Style"
                                                        isDisabled={true}  // This makes the select readonly
        
                                                    />

                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Size(in cms) </label>
                                                <div className="relative z-20 bg-transparent dark:bg-form-Field">
                                                    <ReactSelect
                                                        name="sizes"
                                                        value={sizeOptions?.find(option => option.value === values.sizes?.id) || null}
                                                        onChange={(option) => setFieldValue('sizes', option ? option.sizeid : null)}
                                                        options={sizeOptions}
                                                        // styles={customStyles} // Pass custom styles here
                                                        className="bg-white dark:bg-form-Field"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Size"
                                                        isDisabled={true}  // This makes the select readonly
        
                                                    />

                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Product Id </label>
                                                <Field
                                                    name='productId'
                                                    type="text"
                                                    placeholder="Enter Product id"
                                                     value={values.productId}
                                                    readOnly
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Barcode</label>
                                                <Field
                                                    name='barcode'
                                                    type="text"
                                                    placeholder="Enter your last name"
                                                    // value={product.barcode}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>




                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Finished Weight </label>
                                                <Field
                                                    name='finishedWeight'
                                                    type="number"
                                                    placeholder="Enter Finished Weight"
                                                    value={values.finishedWeight}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> Material Weight</label>
                                                <Field
                                                    name='materialWeight'
                                                    type="numer"
                                                    placeholder="Enter material Weight"
                                                    value={values.materialWeight}
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        {product.productGroup?.productGroupName === "Contemporary Pashmina" && (
                                        <>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Warp Colors
                                                        </label>
                                                        <Field
                                                            name="warpColors"
                                                            type="text"
                                                            placeholder="Enter Warp Colors"
                                                            value={values.warpColors}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Weft Colors
                                                        </label>
                                                        <Field
                                                            name="weftColors"
                                                            type="text"
                                                            placeholder="Enter Weft Colors"
                                                            value={values.weftColors}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>



                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Wave </label>
                                                        <Field
                                                            name='weave'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.weave}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Warp Yarn</label>
                                                        <Field
                                                            name='warpYarn'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.warpYarn}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Weft Yarn</label>
                                                        <Field
                                                            name='weftYarn'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.weftYarn}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                
<div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Cost Price </label>
                                                        <Field
                                                            name='cost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.cost}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
                                                        <Field
                                                            name='mrp'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.mrp}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
                                                        <Field
                                                            name='dyeingCost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.dyeingCost}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Wholesale Price</label>
                                                        <Field
                                                            name='wholesalePrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.wholesalePrice}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
                                                        <Field
                                                            name='usdPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.usdPrice}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> EURO Price</label>
                                                        <Field
                                                            name='euroPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.euroPrice}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
                                                        <Field
                                                            name='gbpPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.gbpPrice}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
                                                        <Field
                                                            name='rmbPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.rmbPrice}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                                </>
                                        )}



{product.productGroup?.productGroupName === "Kani" && (
                                        <>
                                         <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Base Color </label>
                                                        <Field
                                                            name='baseColour'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            value={values.baseColour}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Kani Colors</label>
                                                        <Field
                                                            name='kaniColors'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            value={values.kaniColors}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    {/* <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Weight(gms) </label>
                                                        <Field
                                                            name='weight'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div> */}
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Units</label>
                                                        <Field
                                                            name='units'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Cost Price </label>
                                                        <Field
                                                            name='cost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
                                                        <Field
                                                            name='mrp'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
                                                        <Field
                                                            name='dyeingCost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> WholeSale Price</label>
                                                        <Field
                                                            name='wholesalePrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
                                                        <Field
                                                            name='usdPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Euro Price</label>
                                                        <Field
                                                            name='euroPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
                                                        <Field
                                                            name='gbpPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
                                                        <Field
                                                            name='rmbPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                        </>
                                        )}

                                         {/* Conditionally render the fields based on the selected product group */}
                                         {product.productGroup?.productGroupName === "Pashmina Embroidery" && (

<>
    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Base Color</label>
            <Field
                name="baseColour"
                type="text"
                placeholder="Enter Base Color"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Embroidery Colors</label>
            <Field
                name="embroideryColors"
                type="text"
                placeholder="Enter Embroidery Colors"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>





    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Wave </label>
            <Field
                name='fabricWeave'
                type="text"
                placeholder="Enter your first name"
                value={values.fabricWeave}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Code</label>
            <Field
                name='fabricCode'
                type="text"
                placeholder="Enter your last name"
                value={values.fabricCode}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>




    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Cost </label>
            <Field
                name='fabricCost'
                type="text"
                placeholder="Enter your first name"
                value={values.fabricCost}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Embroidery Cost</label>
            <Field
                name='embroideryCost'
                type="text"
                placeholder="Enter your last name"
                value={values.embroideryCost}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>




    <div className="mb-4.5 flex flex-wrap gap-6">
        {/* <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Weight(gms) </label>
            <Field
                name='weight'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div> */}
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Units</label>
            <Field
                name='units'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>

    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Total Cost </label>
            <Field
                name='totalCost'
                type="text"
                placeholder="Enter your first name"
                value={values.totalCost}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
            <Field
                name='mrp'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
            <Field
                name='dyeingCost'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Wholesale Price</label>
            <Field
                name='wholesalePrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
            <Field
                name='usdPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Euro Price</label>
            <Field
                name='euroPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
            <Field
                name='gbpPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
            <Field
                name='rmbPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>

</>
)}

{product.productGroup?.productGroupName === "Contemporary Wool" && (
                                            <>
                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Warp Colors </label>
                                                        <Field
                                                            name='warpColors'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Weft Colors</label>
                                                        <Field
                                                            name='weftColors'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Wave </label>
                                                        <Field
                                                            name='weave'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Warp Yarn</label>
                                                        <Field
                                                            name='warpYarn'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Weft Yarn</label>
                                                        <Field
                                                            name='weftYarn'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">


                                                    {/* <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Weight(gms)</label>
                                                        <Field
                                                            name='weight'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div> */}
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Units </label>
                                                        <Field
                                                            name='units'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Cost Price </label>
                                                        <Field
                                                            name='cost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
                                                        <Field
                                                            name='mrp'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
                                                        <Field
                                                            name='dyeingCost'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> Wholesale Price</label>
                                                        <Field
                                                            name='wholesalePrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
                                                        <Field
                                                            name='usdPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> EURO Price</label>
                                                        <Field
                                                            name='euroPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>


                                                <div className="mb-4.5 flex flex-wrap gap-6">
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
                                                        <Field
                                                            name='gbpPrice'
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-[300px]">
                                                        <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
                                                        <Field
                                                            name='rmbPrice'
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}




 {/* Wool Embroidery */}

 {product.productGroup?.productGroupName === "Wool Embroidery" && (

<>
    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Base Color</label>
            <Field
                name="baseColour"
                type="text"
                placeholder="Enter Base Color"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Embroidery Colors</label>
            <Field
                name="embroideryColors"
                type="text"
                placeholder="Enter Embroidery Colors"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>






    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Wave </label>
            <Field
                name='fabricWeave'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Code</label>
            <Field
                name='fabricCode'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>




    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Fabric Cost </label>
            <Field
                name='fabricWeave'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Embroidery Cost</label>
            <Field
                name='fabricCode'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>




    <div className="mb-4.5 flex flex-wrap gap-6">
        {/* <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Weight(gms) </label>
            <Field
                name='weight'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div> */}
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Units</label>
            <Field
                name='units'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Total Cost </label>
            <Field
                name='totalCost'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
            <Field
                name='mrp'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
            <Field
                name='dyeingCost'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Wholesale Price</label>
            <Field
                name='wholesalePrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
            <Field
                name='usdPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Euro Price</label>
            <Field
                name='euroPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
            <Field
                name='gbpPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
            <Field
                name='rmbPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>
</>
)}
 {/* Papier Machie */}

 {product.productGroup?.productGroupName === "Papier Machie" && (

<>

    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Base Color</label>
            <Field
                name="baseColour"
                type="text"
                placeholder="Enter Base Color"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white">Pattern Color</label>
            <Field
                name="patternColor"
                type="text"
                placeholder="Enter Embroidery Colors"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>















    <div className="mb-4.5 flex flex-wrap gap-6">

        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Units</label>
            <Field
                name='units'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Cost Price </label>
            <Field
                name='cost'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> MRP</label>
            <Field
                name='mrp'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Dyeing Cost </label>
            <Field
                name='dyeingCost'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Wholesale Price</label>
            <Field
                name='wholesalePrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> USD Price </label>
            <Field
                name='usdPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> Euro Price</label>
            <Field
                name='euroPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


    <div className="mb-4.5 flex flex-wrap gap-6">
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> GBP Price </label>
            <Field
                name='gbpPrice'
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
        <div className="flex-1 min-w-[300px]">
            <label className="mb-2.5 block text-black dark:text-white"> RMB Price</label>
            <Field
                name='rmbPrice'
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
            />
        </div>
    </div>


</>
)}




                                                <div className="mb-6">
                                            <label className="mb-2.5 block text-black dark:text-white"> Product Description </label>
                                            <textarea
                                                name='productDescription'
                                                rows={6}
                                                placeholder="Type your message"
                                                value={values.productDescription}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                                            ></textarea>
                                        </div>

                                        


                                      
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex flex-col space-y-4">
                                                {/* Upload Field */}
                                                <div className="flex-1 min-w-[500px] max-w-[600px]">
                                                    <label className="mb-2.5 block text-black dark:text-white">
                                                        Reference Image <span className="text-meta-1">*</span>
                                                    </label>
                                                    <div className="relative w-full">
                                                        <Field
                                                            name="refrenceImage"
                                                            type="file"
                                                            //multiple={false}
                                                            multiple // Allow multiple files
                                                            accept="image/*"
                                                            // onChange={handleFileChange}
                                                            className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="flex flex-col items-center justify-center space-y-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 rounded text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary">
                                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border p-3 border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 16 16"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <p>
                                                                <span className="text-primary">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                            <p>(max, 800 X 800px)</p>
                                                        </div>
                                                    </div>
                                                </div>


                                                {previews.length > 0 && (
                                                    <div className="mt-4">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Image Previews
                                                        </label>
                                                        {/* Box Wrapper */}
                                                        <div className="p-4 border-2 border-dashed rounded-md bg-gray-50 dark:bg-boxdark dark:border-strokedark">
                                                            {/* Grid Layout */}
                                                            <div className="grid grid-cols-4 gap-4">
                                                                {previews.map((preview, index) => (
                                                                    <div key={index} className="relative group">
                                                                        {/* Image Preview */}
                                                                        <img
                                                                            src={preview.url}
                                                                            alt={`Preview ${index + 1}`}
                                                                            className="h-20 border rounded object-cover min-w-[100px] max-w-[100px] transition-transform duration-200 hover:scale-110"
                                                                        />
                                                                        {/* Cancel Button */}
                                                                        <button
                                                                            // onClick={() => handleRemoveImage(index)}
                                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            &times;
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}



                                            </div>

                                            <div className="flex-1 min-w-[300px]">
                                                {/* Upload Field */}
                                                <div className="flex-1 min-w-[500px] max-w-[600px]">
                                                    <label className="mb-2.5 block text-black dark:text-white">
                                                        Actual Image <span className="text-meta-1">*</span>
                                                    </label>
                                                    <div className="relative w-full">
                                                        <Field
                                                            name="actualImage"
                                                            type="file"
                                                            //multiple={false}
                                                            multiple // Allow multiple files
                                                            accept="image/*"
                                                            // onChange={handleFileChangeActual}
                                                            className="absolute inset-0 z-50 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <div className="flex flex-col items-center justify-center space-y-3 border-[1.5px] border-stroke bg-transparent py-3 px-5 rounded text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary">
                                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border p-3 border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                                                <svg
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 16 16"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                                        fill="#3C50E0"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <p>
                                                                <span className="text-primary">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                            <p>(max, 800 X 800px)</p>
                                                        </div>
                                                    </div>
                                                </div>


                                                {previewsActual.length > 0 && (
                                                    <div className="mt-4">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            Image Previews
                                                        </label>
                                                        {/* Box Wrapper */}
                                                        <div className="p-4 border-2 border-dashed rounded-md bg-gray-50 dark:bg-boxdark dark:border-strokedark">
                                                            {/* Grid Layout */}
                                                            <div className="grid grid-cols-4 gap-4">
                                                                {previewsActual.map((previewActual, index) => (
                                                                    <div key={index} className="relative group">
                                                                        {/* Image Preview */}
                                                                        <img
                                                                            src={previewActual.url}
                                                                            alt={`Preview ${index + 1}`}
                                                                            className="h-20 border rounded object-cover min-w-[100px] max-w-[100px] transition-transform duration-200 hover:scale-110"
                                                                        />
                                                                        {/* Cancel Button */}
                                                                        <button
                                                                            // onClick={() => handleRemoveActual(index)}
                                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            &times;
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}



                                            </div>




                                        </div>

                                        <div className="flex-1 min-w-[300px]">
                                            <label className="mb-2.5 block text-black dark:text-white"> Supplier</label>
                                            <div className=" z-20 bg-transparent dark:bg-form-Field">
                                                <ReactSelect
                                                    name="supplier"
                                                    value={supplierNameOptions?.find(option => option.value === values.supplier?.id) || null}
                                                    onChange={(option) => setFieldValue('supplier', option ? option.suplierid : null)}
                                                    options={supplierNameOptions}
                                                    styles={customStyles} // Pass custom styles here
                                                    className="bg-white dark:bg-form-Field"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select supplier Name"
                                                />
                                                {/* <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                    <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill=""></path>
                                                        </g>
                                                    </svg>
                                                </span> */}
                                            </div>
                                        </div>








                                        <div className="flex-1 min-w-[300px]">
                                            <label className="mb-2.5 block text-black dark:text-white"> Supplier Code </label>
                                            <div className=" bg-transparent dark:bg-form-Field">


                                                <ReactSelect
                                                    name="supplierCode"
                                                    value={supplierCodeOptions?.find(option => option.value === values.supplierCode?.id) || null}
                                                    onChange={(option) => setFieldValue('supplierCode', option ? option?.suplieridd : null)}
                                                    options={supplierCodeOptions}
                                                    styles={customStyles} // Pass custom styles here
                                                    className="bg-white dark:bg-form-Field"
                                                    classNamePrefix="react-select"
                                                    placeholder="Select supplier Code"
                                                />



                                            </div>
                                        </div>


                                        <div className="flex justify-center mt-4"> {/* Centering the button */}
    <button
        type="button" // Ensures the button does not trigger the form submission
        onClick={(e) => handleUpdateSubmit(values, e)}
        className="w-1/3 px-6 py-2 text-white bg-primary rounded-lg shadow hover:bg-primary-dark focus:outline-none" // Increased width
    >
        Update
    </button>
</div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
};

export default UpdateProduct;
