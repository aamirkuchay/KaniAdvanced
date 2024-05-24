import { useState, useEffect, useCallback } from 'react';
import { ADD_UNIT_URL, GET_UNIT_URL, UPDATE_UNIT_URL, DELETE_UNIT_URL } from '../Constants/utils';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useUnits = () => {
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
    });

    useEffect(() => {
        console.log(pagination)
        fetchUnits(pagination?.currentPage || 1);
    }, [pagination?.currentPage]);

    const fetchUnits = useCallback(async (page) => {
        const config = {
            url: `${GET_UNIT_URL}?page=${page}`,
            options: {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        };
        await handleFetch(config, (data) => {
            console.log("data", data)
            setUnits(data.pagUnitList);
            setPagination({
                totalItems: data.totalItems,
                pagUnitList: data.pagUnitList,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
            });
        }, "Failed to fetch units");
    }, [token]);

    const handleFetch = async (config, onSuccess, errorMessage) => {
        try {
            const response = await fetch(config.url, config.options);
            const data = await response.json();

            if (response.ok) {
                onSuccess(data);
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(errorMessage || "An error occurred");
        }
    };

    const handleDelete = async (id) => {
        const config = {
            url: `${DELETE_UNIT_URL}${id}`,
            options: {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        };
        await handleFetch(config, () => {
            toast.success('Unit deleted successfully');
            fetchUnits(pagination.currentPage); // Fetch updated units
        }, "Failed to delete unit");
    };

    const handleUpdate = (item) => {
        setEdit(true);
        setCurrentUnit(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const url = edit ? `${UPDATE_UNIT_URL}/${currentUnit.id}` : ADD_UNIT_URL;
        const method = edit ? "PUT" : "POST";
        const config = {
            url: url,
            options: {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            }
        };
        await handleFetch(config, () => {
            toast.success(`Unit ${edit ? 'updated' : 'added'} successfully`);
            resetForm();
            setEdit(false);
            setCurrentUnit({ name: '' });
            fetchUnits(pagination.currentPage); // Fetch updated units
        }, `Failed to ${edit ? 'update' : 'add'} unit`);
        setSubmitting(false);
    };

    const handlePageChange = (newPage) => {

        setPagination((prev) => ({ ...prev, currentPage: newPage }));
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
