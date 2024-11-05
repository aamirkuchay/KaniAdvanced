import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { GET_CUSTOMERGROUP_URL, DELETE_CUSTOMERGROUP_URL, UPDATE_CUSTOMERGROUP_URL, ADD_CUSTOMERGROUP_URL } from "../Constants/utils";

const usecustomerGroup = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [customerGroup, setcustomerGroup] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentcustomerGroup, setCurrentcustomerGroup] = useState({
        customerGroupName:"",
    });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0
    });

    useEffect(() => {
        getcustomerGroup(pagination.currentPage);
    }, [currentcustomerGroup]);

    const getcustomerGroup = async (page) => {
        try {
            const response = await fetch(`${GET_CUSTOMERGROUP_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setcustomerGroup(data?.content);
            setPagination({
                totalItems: data.totalElements,
                pagUnitList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch customerGroup");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_CUSTOMERGROUP_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`customerGroup Deleted Successfully !!`);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = customerGroup.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getcustomerGroup(pagination.currentPage);
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
console.log(item,"hey");
        setCurrentcustomerGroup(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, "logg");
        try {
            const url = edit ? `${UPDATE_CUSTOMERGROUP_URL}/${currentcustomerGroup.id}` : ADD_CUSTOMERGROUP_URL;
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
                toast.success(`customerGroup ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentcustomerGroup({
                    customerGroupName: ""
                });
                // getcustomerGroup(pagination.currentPage); // Fetch updated customerGroup
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
        getcustomerGroup(newPage); // API is 0-indexed for pages
    };

    return {
        customerGroup,
        edit,
        currentcustomerGroup,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default usecustomerGroup;
