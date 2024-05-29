import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_MATERIALPO_URL, DELETE_MATERIALPO_URL, GET_MATERIALPO_URL, UPDATE_MATERIALPO_URL } from '../Constants/utils';
import { fetchlocation } from '../redux/Slice/LocationSlice';
import { fetchsupplier } from '../redux/Slice/SupplierSlice';
import { fetchmaterial } from '../redux/Slice/MaterialSlice';

const useMaterialPo = () => {
    const [pagination, setPagination] = useState({
        totalItems: 0,
        pagUnitList: [],
        totalPages: 0,
        currentPage: 1,
    });

    const [materialPo, setmaterialPo] = useState()
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchlocation(token));
        dispatch(fetchsupplier(token));
        dispatch(fetchmaterial(token));
    }, [dispatch, token]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
   
        try {
            const response = await fetch(ADD_MATERIALPO_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                resetForm();
                toast.success(`Material Po added successfully`);
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
    useEffect(() => {
        ViewMaterialPo(pagination.currentPage);
    }, []);
    const ViewMaterialPo=async()=>{
        try {
            
            const response = await fetch(GET_MATERIALPO_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                
            });

            const data = await response.json();
           
            if (response.ok) {
                setmaterialPo(data)
                setPagination({
                    totalItems: data.totalElements,
                    pagUnitList: data.content,
                    totalPages: data.totalPages,
                    currentPage: data.number + 1,
                });
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    }
    const handleDelete = async (e, id) => {
        
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_MATERIALPO_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`Material Po Deleted Successfully !!`);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = location.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    getLocation(pagination.currentPage);
                }
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        }
    };
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        ViewMaterialPo(newPage); // API is 0-indexed for pages
    };

    return { handleSubmit ,ViewMaterialPo,materialPo,handleDelete,pagination,handlePageChange};
};

export default useMaterialPo;