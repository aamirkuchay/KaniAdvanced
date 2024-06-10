import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_INVENTORY_URL, DELETE_INVENTORY_URL, GET_INVENTORYBYID_URL, GET_INVENTORY_URL, UPDATE_INVENTORY_URL } from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';
import { useNavigate } from 'react-router-dom';

const useInventoryMaterial = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const navigate = useNavigate();
    const [inventoryMaterial, setInventoryMaterial] = useState([]);
    const [edit, setEdit] = useState(false);
    const [inventoryItem, setInventoryItem] = useState(null);

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
    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0
    });

    const fetchInventoryItem = async (id) => {
        try {
            const response = await fetch(`${GET_INVENTORYBYID_URL}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setInventoryItem(data);
        } catch (error) {
            console.error('Error fetching inventory item:', error);
        }
    };




    const ViewInventory = async (page) => {

        try {
            const response = await fetch(`${GET_INVENTORY_URL}?page=${page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setInventoryMaterial(data?.content);
            setPagination({
                totalItems: data?.totalElements,
                data: data?.content,
                totalPages: data?.totalPages,
                currentPage: data?.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Inventory");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_INVENTORY_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                const isCurrentPageEmpty = inventoryMaterial.length === 1;
                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    ViewInventory(pagination.currentPage);
                }
            } else {
                toast.error(data.errorMessage);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };


    const handleUpdate = (e, item) => {
        console.log(item, "onupdate");
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
            const url = `${UPDATE_INVENTORY_URL}/${values.id}`;
            setSubmitting(true)
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
                toast.success(`Inventory Updated successfully`);
                navigate('/inventory/viewMaterialInventory');

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

        try {
            const url = ADD_INVENTORY_URL;
            const method = "POST";

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

                    },
                    location: {
                        id: values.locationId,

                    },
                    quantity: values.quantity,
                    // consumedQuantity: values.consumedQuantity,
                    minimum: values.minimum
                })
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`Material Inventory ${edit ? 'updated' : 'added'} successfully`);
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
                ViewInventory(pagination.currentPage || 1);
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

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        ViewInventory(newPage);
    };

    return {
        ViewInventory,
        inventoryMaterial,
        currentInventory,
        inventoryItem,
        setInventoryItem,
        pagination,
        handleDelete,
        handleUpdateSubmit,
        handleSubmit,
        fetchInventoryItem,
        handlePageChange,
        handleUpdate
    };
};

export default useInventoryMaterial;
