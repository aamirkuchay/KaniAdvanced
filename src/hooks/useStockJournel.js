import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ADD_STOCKJOURNEL_URL } from '../Constants/utils';
import { fetchunit } from '../redux/Slice/UnitSlice';
import { fetchcolorGroup } from '../redux/Slice/ColorGroupSlice';

import { fetchmaterial } from '../redux/Slice/MaterialSlice';
import { fetchlocation } from '../redux/Slice/LocationSlice';





const useStockJournel = () => {
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
    

  

    return {
        currentstockJournel,
      
        handleSubmit,
        typeValues
       
        
    };
};

export default useStockJournel;