export const BASE_URL = 'http://localhost:8081';
export const SIGNIN_URL = `${BASE_URL}/api/v1/auth/signin`;

//Unit Url's
export const ADD_UNIT_URL = `${BASE_URL}/unit/addUnit`;
export const GET_UNIT_URL = `${BASE_URL}/unit`;
export const UPDATE_UNIT_URL = `${BASE_URL}/unit/updateUnit`;
export const DELETE_UNIT_URL = `${BASE_URL}/unit/deleteUnit/`;

//Location Url's
export const LOCATION_UNIT_URL = `${BASE_URL}/location/addUnit`;
export const GET_LOCATION_URL = `${BASE_URL}/location/getUnits`;
export const UPDATE_LOCATION_URL = `${BASE_URL}/location/updateUnit`;
export const DELETE_LOCATION_URL = `${BASE_URL}/location/deleteUnit/`;

export const options = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    theme: 'dark',
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
};
