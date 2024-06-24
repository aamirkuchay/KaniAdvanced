import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_STOCKJOURNEL_URL ,GET_STOCK_URL} from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';
import { fetchcolorGroup } from '../redux/Slice/ColorGroupSlice';

import { fetchmaterial } from '../redux/Slice/MaterialSlice';
import { fetchlocation } from '../redux/Slice/LocationSlice';
import { useNavigate } from 'react-router-dom';





const useStockJournel = () => {

  const [stockJournal, setStockJournal] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 10
  });












    const { currentUser } = useSelector((state) => state?.persisted?.user);
    const { token } = currentUser;
    const [stockJournel, setstockJournel] = useState([]);
    const [edit, setEdit] = useState(false);
    
    const dispatch = useDispatch();
    
        const [currentstockJournel, setCurrentStockJournel] = useState({
            type: null,
            material: null,
            unit: null,
            quantity: '',
            cost: '',
          });

    useEffect(() => {
        dispatch(fetchunit(token))
        dispatch(fetchmaterial(token))
        dispatch(fetchcolorGroup(token))
        dispatch(fetchlocation(token))
    }, []);

    const typeValues = [
        { value: 'RAW', label: 'RAW' },
        { value: 'SEMIFINISHED', label: 'SEMI FINISHED' },
        { value: 'FINISHED', label: 'FINISHED' }
    ];






 

    const handleSubmit = async (formattedValues) => {
        console.log(formattedValues,"kikikikiki");
     
        try {
          const url = ADD_STOCKJOURNEL_URL;
          const method = 'POST';
    
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                formattedValues
  
            ),
          });
    
          const data = await response.json();
          console.log(data,"resssssssss");
          if (response.ok) {
            toast.success(`stockJournel added successfully`);
          
          } else {
            toast.error(`${data.errorMessage}`);
          }
        } catch (error) {
          console.log(error);
          toast.error('An error occurred');
        } 
      };





      const ViewStock = async (page = 1) => {
        try {
            const response = await fetch(`${GET_STOCK_URL}?page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Fetched data: ", data); // Debugging statement

            setStockJournal(data?.content);
            setPagination({
                totalItems: data?.totalElements,
                totalPages: data?.totalPages,
                currentPage: data?.number + 1,
                itemsPerPage: data.size
            });
        } catch (error) {
            console.error("Failed to fetch inventory:", error);
            toast.error("Failed to fetch Inventory");
        }
    };

    const handleDelete = async (e, id) => {
        // Implement the delete functionality
        console.log("Delete item with id:", id);
    };

    // const handleUpdate = async (e, item) => {
    //     // Implement the update functionality
    //     console.log("Update item:", item);
    // };
    const handleUpdate = (e, item) => {
        console.log(item, "onupdate");
        e.preventDefault();
        // setEdit(true);
        if (item && item.id) {
            // setitemm(item);
            navigate(`/stockjournel/updateStockJournal/${item.id}`);
        } else {
            // Handle the case when the item or its ID is missing
            console.error("Item or its ID is missing");
        }

    };

    const handlePageChange = (page) => {
        ViewStock(page);
    };
    

  

    return {
        currentstockJournel,
      
        handleSubmit,
        typeValues,




        ViewStock,
        stockJournal,
        handleDelete,
        handleUpdate,
        handlePageChange,
        pagination
       
        
    };
};

export default useStockJournel;