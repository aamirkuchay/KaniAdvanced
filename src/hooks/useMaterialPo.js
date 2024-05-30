import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_MATERIALPO_URL, DELETE_MATERIALPO_URL, GET_MATERIALPO_URL, UPDATE_MATERIALPO_URL } from '../Constants/utils';
import { fetchlocation } from '../redux/Slice/LocationSlice';
import { fetchsupplier } from '../redux/Slice/SupplierSlice';
import { fetchmaterial } from '../redux/Slice/MaterialSlice';
import { useNavigate } from 'react-router-dom';

const useMaterialPo = () => {
    const [edit, setEdit] = useState(false);
    const [materialPo, setMaterialPo] = useState([]);
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
    });

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
                navigate('/material/viewmaterialPo');

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
        ViewMaterialPo(pagination.currentPage || 1);
    }, []);

    const ViewMaterialPo = async (page) => {
        try {

            const response = await fetch(`${GET_MATERIALPO_URL}?page=${page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

            });

            const data = await response.json();

            if (response.ok) {
                setMaterialPo(data.content);
                setPagination({
                    totalItems: data.totalElements,
                    data: data.content,
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
    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        ViewMaterialPo(newPage); // API is 0-indexed for pages
    };

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
                toast.success(`Material Po Deleted Successfully`);

                // Check if the current page becomes empty
                const isCurrentPageEmpty = materialPo.length === 1;

                if (isCurrentPageEmpty && pagination.currentPage > 1) {
                    const previousPage = pagination.currentPage - 1;
                    handlePageChange(previousPage);
                } else {
                    ViewMaterialPo(pagination.currentPage);
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
        navigate('/material/addmaterialpo', { state: { item } });
    };

    return { handleSubmit, ViewMaterialPo, edit, setEdit, materialPo, handleUpdate, handleDelete, pagination, handlePageChange };
};

export default useMaterialPo;