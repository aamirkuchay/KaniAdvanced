export const BASE_URL = 'http://localhost:8081';
export const SIGNIN_URL = `${BASE_URL}/api/v1/auth/signin`;

//Unit Url's
export const ADD_UNIT_URL = `${BASE_URL}/unit/addUnit`;
export const GET_UNIT_URL = `${BASE_URL}/unit`;
export const UPDATE_UNIT_URL = `${BASE_URL}/unit/updateUnit`;
export const VIEW_ALL_UNITS = `${BASE_URL}/unit/viewAll`;
export const DELETE_UNIT_URL = `${BASE_URL}/unit/deleteUnit/`;

//Location Url's
export const ADD_LOCATION_URL = `${BASE_URL}/location/add`;
export const GET_LOCATION_URL = `${BASE_URL}/location/all`;
export const UPDATE_LOCATION_URL = `${BASE_URL}/location/update`;
export const VIEW_ALL_LOCATIONS = `${BASE_URL}/location/viewAll`;
export const DELETE_LOCATION_URL = `${BASE_URL}/location/delete/`;

// Supplier Urls's
export const ADD_SUPPLIER_URL = `${BASE_URL}/supplier/addSupplier`;
export const GET_SUPPLIER_URL = `${BASE_URL}/supplier/viewAll`;
export const UPDATE_SUPPLIER_URL = `${BASE_URL}/supplier/updateSupplier`;
export const DELETE_SUPPLIER_URL = `${BASE_URL}/supplier/deleteSupplier/`;


//Material Url's
export const ADD_MATERIAL_URL = `${BASE_URL}/material/add`;
export const GET_MATERIAL_URL = `${BASE_URL}/material/getAll`;
export const UPDATE_MATERIAL_URL = `${BASE_URL}/material/update`;
export const DELETE_MATERIAL_URL = `${BASE_URL}/material/delete/`;






export const options = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    theme: 'dark',
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
};

//React-select customStyles function

export const customStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: '50px',
        fontSize: '16px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '10px 14px',
    }),
    input: (provided) => ({
        ...provided,
        fontSize: '16px',
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '16px',
    }),
};


