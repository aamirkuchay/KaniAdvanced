import { useState, useEffect, useCallback } from 'react';
import { ADD_LOCATION_URL, GET_LOCATION_URL, UPDATE_LOCATION_URL, DELETE_LOCATION_URL } from "../Constants/utils"
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function useLocation() {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [Location, setLocation] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentLocation, setCurrentLocation] = useState({ name: '' });
    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagLocationList: [],
        totalPages: 0,
        currentPage: 1,
    });

    // useEffect(() => {
    //     fetchLocations(pagination.currentPage);
    // }, [pagination.currentPage]);

    // const fetchLocations = useCallback(async (page) => {
    //     const config = {
    //         url: `${GET_LOCATION_URL}?page=${page}`,
    //         options: {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         }
    //     };
    //     await handleFetch(config, (data) => {
    //         setLocation(data.pagLocationList);
    //         setPagination({
    //             totalItems: data.totalItems,
    //             pagLocationList: data.pagLocationList,
    //             totalPages: data.totalPages,
    //             currentPage: data.currentPage,
    //         });
    //     }, "Failed to fetch Locations");
    // }, [token]);

    // const handleFetch = async (config, onSuccess, errorMessage) => {
    //     try {
    //         const response = await fetch(config.url, config.options);
    //         const data = await response.json();

    //         if (response.ok) {
    //             onSuccess(data);
    //         } else {
    //             toast.error(`${data.errorMessage}`);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(errorMessage || "An error occurred");
    //     }
    // };

    // const handleDelete = async (id) => {
    //     const config = {
    //         url: `${DELETE_LOCATION_URL}${id}`,
    //         options: {
    //             method: 'DELETE',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         }
    //     };
    //     await handleFetch(config, () => {
    //         toast.success('Location deleted successfully');
    //         fetchLocations(pagination.currentPage); // Fetch updated Locations
    //     }, "Failed to delete Location");
    // };

    // const handleUpdate = (item) => {
    //     setEdit(true);
    //     setCurrentLocation(item);
    // };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("came to submit");
        const url = edit ? `${UPDATE_LOCATION_URL}/${currentLocation.id}` : ADD_LOCATION_URL;
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
            toast.success(`Location ${edit ? 'updated' : 'added'} successfully`);
            // resetForm();
            // setEdit(false);
            // setCurrentLocation({ name: '' });
            // fetchLocations(pagination.currentPage); // Fetch updated Locations
        }, `Failed to ${edit ? 'update' : 'add'} Location`);
        setSubmitting(false);
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
    };

    return {
        // Location,
        // edit,
        // currentLocation,
        // pagination,
        // handleDelete,
        // handleUpdate,
        handleSubmit,
        // handlePageChange,
    };
};

export default useLocation
