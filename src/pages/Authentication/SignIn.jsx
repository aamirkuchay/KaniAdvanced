import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInSuccess, signinStart } from '../../redux/Slice/UserSlice';
import { SIGNIN_URL } from '../../Constants/utils';
import { toast } from 'react-toastify';
import './style.css'; // Make sure to import your CSS file

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const [error, setError] = useState('');
  const [formData, setformData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Please Fill All the Fields');
      return;
    }
    try {
      dispatch(signinStart());
      const res = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        setError('Invalid Credentials');
      }
    } catch (error) {
      dispatch(signInFailure());
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-background"></div>
      <div className="signin-form rounded-lg border border-stroke lg:w-2/4 mx-auto my-10 shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
         
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5 signin-contt">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Kani
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  {error && (
                    <div className="flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-3" role="alert">
                      <svg className="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z" />
                      </svg>
                      <p className="font-bold">{error}</p>
                    </div>
                  )}

                  <label className="mb-2.5 block font-medium text-black dark:text-white">Username</label>
                  <input
                    value={formData.username}
                    onChange={(e) => setformData({ ...formData, username: e.target.value })}
                    type="text"
                    placeholder="Enter your Username"
                    className="w-full  rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                  <input
                    value={formData.password}
                    onChange={(e) => setformData({ ...formData, password: e.target.value })}
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Sign in
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default SignIn;
