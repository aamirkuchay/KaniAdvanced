import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GET_SUPPLIER_URL, DELETE_SUPPLIER_URL, UPDATE_SUPPLIER_URL, ADD_SUPPLIER_URL } from "../Constants/utils";

const useSupplier = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Supplier, setSupplier] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState({
        name: "",
        phoneNumber: "",
        supplierCode: "",
        address: "",
        bankName: "",
        accountNo: "",
        ifscCode: "",
        emailId: ""
    });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
    });

    useEffect(() => {
        getSupplier(pagination.currentPage);
    }, []);

    const getSupplier = async (page) => {
        try {
            const response = await fetch(`${GET_SUPPLIER_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setSupplier(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagUnitList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Supplier");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_SUPPLIER_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`Supplier Deleted Successfully `);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = Supplier.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getSupplier(pagination.currentPage);
                }
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };

    const handleUpdate = (e, item) => {
        e.preventDefault();
        setEdit(true);
        setCurrentSupplier(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, "from use");
        try {
            const url = edit ? `${UPDATE_SUPPLIER_URL}/${currentSupplier.id}` : ADD_SUPPLIER_URL;
            const method = edit ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`Supplier ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentSupplier({
                    name: "",
                    phoneNumber: "",
                    supplierCode: "",
                    address: "",
                    bankName: "",
                    accountNo: "",
                    ifscCode: "",
                    emailId: ""
                });
                getSupplier(pagination.currentPage); // Fetch updated Supplier
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error, response);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getSupplier(newPage - 1); // API is 0-indexed for pages
    };

    return {
        Supplier,
        edit,
        currentSupplier,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useSupplier;
