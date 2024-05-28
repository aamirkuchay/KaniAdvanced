import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_MATERIAL_URL, DELETE_MATERIAL_URL, GET_MATERIAL_URL, UPDATE_MATERIAL_URL } from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';

const useMaterial = () => {
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [material, setMaterial] = useState([]);
    const [edit, setEdit] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState({ description: '', unit: {}, grade: '' });
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchunit(token))
    }, [])





    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: data.content.length === 1 ? 1 : pagination.currentPage,
    });

    useEffect(() => {
        getMaterial(pagination.currentPage || 1);
    }, []);

    const getMaterial = async (page) => {
        try {
            const response = await fetch(`${GET_MATERIAL_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data)

            setMaterial(data?.content);
            setPagination({
                totalItems: data?.totalElements,
                data: data?.content,
                totalPages: data?.totalPages,
                currentPage: data?.number + 1,
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Material");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DELETE_MATERIAL_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(`${data.message}`);
                getMaterial(pagination.data.length < 1 ? pagination.currentPage - 1 : pagination.currentPage); // Fetch updated Material
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
        setCurrentMaterial(item);
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const url = edit ? `${UPDATE_MATERIAL_URL}/${currentMaterial.id}` : ADD_MATERIAL_URL;
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
            //  console.log(data)
            if (response.ok) {
                toast.success(`Material ${edit ? 'updated' : 'added'} successfully`);
                resetForm();
                setEdit(false);
                setCurrentMaterial({ description: '', unit: { id: '', name: '' }, grade: '' });
                getMaterial(pagination.currentPage || 1); // Fetch updated Material
            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
        getMaterial(newPage);
    };

    return {
        material,
        edit,
        currentMaterial,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    };
};

export default useMaterial;
