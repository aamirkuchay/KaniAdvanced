import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_UNIT_URL, GET_UNIT_URL, UPDATE_UNIT_URL, DELETE_UNIT_URL } from "../Constants/utils";

const useUnits = (searchValue) => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [units, setUnits] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentUnit, setCurrentUnit] = useState({ name: '' });

    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagUnitList: [],
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: 0,
    });

    useEffect(() => {
        console.log(`Fetching units with search value: ${searchValue}`);
        getUnits(pagination.currentPage, searchValue);
    }, [searchValue]);

    const getUnits = async (page, searchValue) => {
        try {
            console.log(`Sending request to fetch units with search value: ${searchValue}`);
            const response = await fetch(`${GET_UNIT_URL}?page=${page}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name: searchValue })
            });
            const data = await response.json();
            console.log('Received units data:', data);
            setUnits(data.content);
            setPagination({
                totalItems: data.totalElements,
                pagUnitList: data.content,
                totalPages: data.totalPages,
                currentPage: data.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch units");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_UNIT_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`Unit Deleted successfully`);   

                const isCurrentPageEmpty = units.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getUnits(pagination.currentPage, searchValue);
                }
            } else {
                const data = await response.json();
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
        setCurrentUnit(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const url = edit ? `${UPDATE_UNIT_URL}/${currentUnit.id}` : ADD_UNIT_URL;
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
                toast.success(`Unit ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentUnit({ name: '' });
                getUnits(pagination.currentPage, searchValue);
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

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getUnits(newPage);
    };

    return {
        units,
        edit,
        currentUnit,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useUnits;