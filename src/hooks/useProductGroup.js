import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GET_productGroup_URL, DELETE_productGroup_URL, UPDATE_productGroup_URL, ADD_productGroup_URL } from "../Constants/utils";

const useproductGroup = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [productGroup, setproductGroup] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentproductGroup, setCurrentproductGroup] = useState({
        productGroupName:"",
    });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage:0
    });

    useEffect(() => {
        getproductGroup(pagination.currentPage);
    }, [productGroup]);

    const getproductGroup = async (page) => {
        try {
            const response = await fetch(`${GET_productGroup_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setproductGroup(data?.content);
            setPagination({
                totalItems: data.totalElements,
                pagUnitList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage:data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch productGroup");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_productGroup_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`productGroup Deleted Successfully !!`);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = productGroup.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getproductGroup(pagination.currentPage);
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
       
        setCurrentproductGroup(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values,"logg");
        try {
            const url = edit ? `${UPDATE_productGroup_URL}/${currentproductGroup.id}` : ADD_productGroup_URL;
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
                toast.success(`productGroup ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentproductGroup({
                    productGroupName:""
                });
                // getproductGroup(pagination.currentPage); // Fetch updated productGroup
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
        getproductGroup(newPage); // API is 0-indexed for pages
    };

    return {
        productGroup,
        edit,
        currentproductGroup,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useproductGroup;
