import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_INVENTORY_URL,GET_INVENTORY_URL,UPDATE_INVENTORY_URL } from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';
import { useNavigate } from 'react-router-dom';

const useInventoryMaterial = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const navigate = useNavigate();
    const [inventoryMaterial, setInventoryMaterial] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentInventory, setCurrentInventory] = useState({
        id: 0,
        material: {
            id: 0,
            unit: {
                id: 0,
                name: ''
            },
            description: '',
            grade: '',
            materialType: ''
        },
        location: {
            id: 0,
            address: '',
            city: '',
            state: '',
            gstin: '',
            pinCode: 0
        },
        quantity: 0,
        consumedQuantity: 0,
        minimum: 0
    });
    // const [pagination, setPagination] = useState({
    //     totalItems: 0,
    //     data: [],
    //     totalPages: 0,
    //     currentPage: 1,
    // });

   

    // useEffect(() => {
    //     dispatch(fetchunit(token));
    //     getMaterial(pagination.currentPage);
    // }, [dispatch, token, pagination.currentPage]);

    const ViewInventory = async (page) => {
        
        try {
            const response = await fetch(`${GET_INVENTORY_URL}?page=${page||1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data,"cam from hook");
            setInventoryMaterial(data?.content);
            // setPagination({
            //     totalItems: data?.totalElements,
            //     data: data?.content,
            //     totalPages: data?.totalPages,
            //     currentPage: data?.number + 1,
            // });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch material");
        }
    };

    // const handleDelete = async (e, id) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`${DELETE_MATERIAL_URL}${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success(data.message);
    //             const isCurrentPageEmpty = inventoryMaterial.length === 1;
    //             if (isCurrentPageEmpty && pagination.currentPage > 1) {
    //                 const previousPage = pagination.currentPage - 1;
    //                 handlePageChange(previousPage);
    //             } else {
    //                 getMaterial(pagination.currentPage);
    //             }
    //         } else {
    //             toast.error(data.errorMessage);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("An error occurred");
    //     }
    // };

    // const handleUpdate = (e, item) => {
    //     e.preventDefault();
    //     setEdit(true);
    //     setCurrentInventory({
    //         ...item,
    //         materialType: seloptions.find(option => option.value === item.materialType) || null
    //     });
    // };
    const handleUpdate = (e, item) => {
        console.log(item,"onupdate");
        e.preventDefault();
        // setEdit(true);
        if (item && item.id) {
            // setitemm(item);
            navigate(`/inventory/updateInventoryMaterial/${item.id}`);
        } else {
            // Handle the case when the item or its ID is missing
            console.error("Item or its ID is missing");
        }

    };
    const handleUpdateSubmit = async (values, { setSubmitting, resetForm }) => {


        try {
            const url = `${ UPDATE_INVENTORY_URL}/${values.id}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                resetForm();
                toast.success(`Material Po Updated successfully`);
                navigate('/material/viewPurchase');

            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }

    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {



         console.log(values)
        try {
            const url =  ADD_INVENTORY_URL;
            const method =  "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: currentInventory.id,
                    material: {
                        id: values.materialId,
                        // unit: {
                        //     id: values.material.unit.id,
                        //     name: values.material.unit.name
                        // },
                    //     description: values.material.description,
                    //     grade: values.material.grade,
                    //     materialType: values.material.materialType
                    },
                    location: {
                        id: values.locationId,
                        // address: values.location.address,
                        // city: values.location.city,
                        // state: values.location.state,
                        // gstin: values.location.gstin,
                        // pinCode: values.location.pinCode
                    },
                    quantity: values.quantity,
                    // consumedQuantity: values.consumedQuantity,
                    minimum:values.minimum
                })
            });

            const data = await response.json();
            console.log(data,"ressssssssssss");
            if (response.ok) {
                toast.success(`Material ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentInventory({
                    id: 0,
                    material: {
                        id: 0,
                        unit: { id: 0, name: '' },
                        description: '',
                        grade: '',
                        materialType: ''
                    },
                    location: {
                        id: 0,
                        address: '',
                        city: '',
                        state: '',
                        gstin: '',
                        pinCode: 0
                    },
                    quantity: 0,
                    consumedQuantity: 0,
                    minimum: 0
                });
                // getMaterial(pagination.currentPage || 1);
            } else {
                toast.error(data.errorMessage);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
     };

    // const handlePageChange = (newPage) => {
    //     setPagination((prev) => ({ ...prev, currentPage: newPage }));
    //     getMaterial(newPage);
    // };

    return {
        ViewInventory,
        inventoryMaterial,
        // edit,
        currentInventory,
        // pagination,
        // handleDelete,
         handleUpdateSubmit,
        handleSubmit,
        // handlePageChange,
        // seloptions,
        handleUpdate
    };
};

export default useInventoryMaterial;
