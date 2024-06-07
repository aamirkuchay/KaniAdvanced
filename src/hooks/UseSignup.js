import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SIGNUPURL } from "../Constants/utils";
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
    const navigate = useNavigate();

    const [FormData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        username: "",
        password: ""
    });











    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values, "from use");
        try {
            const url = SIGNUPURL;
            const method = "POST";

            const response = await fetch(url, {
                headers: {
                    "content-type": "application/json"
                },
                method: method,


                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("User Added Successfully");
                navigate("/auth/signin")



            } else {
                toast.error(`${data.errorMessage}`);
            }
        } catch (error) {
            console.error(error, response);
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };



    return {

        handleSubmit, FormData

    };
};

export default useSignup;
