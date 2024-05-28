import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_MATERIALPO_URL, DELETE_MATERIALPO_URL, GET_MATERIALPO_URL, UPDATE_MATERIALPO_URL } from '../Constants/utils';
import { fetchlocation } from '../redux/Slice/LocationSlice';
import { fetchsupplier } from '../redux/Slice/SupplierSlice';
import { fetchmaterial } from '../redux/Slice/MaterialSlice';

const useMaterialPo = () => {
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
                toast.success(`Material added successfully`);
                resetForm();
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

    return { handleSubmit };
};

export default useMaterialPo;