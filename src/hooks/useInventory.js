import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_MATERIALPO_URL, DELETE_MATERIALPO_URL, GET_INVENTORY, GET_MATERIALPO_BY_ID_URL, GET_MATERIALPO_URL, UPDATE_MATERIALPO_URL } from '../Constants/utils';
import { fetchlocation } from '../redux/Slice/LocationSlice';
import { fetchsupplier } from '../redux/Slice/SupplierSlice';
import { fetchmaterial } from '../redux/Slice/MaterialSlice';
import { useNavigate } from 'react-router-dom';

const useInventory = () => {
    const [edit, setEdit] = useState(false);
    const [materialPo, setMaterialPo] = useState([]);
    const [itemm, setitemm] = useState({})
    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
const [inventory, setinventory] = useState()

    const [pagination, setPagination] = useState({
        totalItems: 0,
        data: [],
        totalPages: 0,
        currentPage: 1,
    });


 



    const ViewInventory = async (page) => {
        try {

            const response = await fetch(`${GET_INVENTORY}?page=${page || 1}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

            });

            const data = await response.json();
           

            if (response.ok) {
                setinventory(data);
                setPagination({
                    totalItems: data.totalElements,
                    data: data,
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
        ViewInventory(newPage); // API is 0-indexed for pages
    };



  

    return {  ViewInventory,inventory,   pagination, handlePageChange, };
};

export default useInventory;