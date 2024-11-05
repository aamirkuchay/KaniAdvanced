export const BASE_URL = 'http://localhost:8081';
export const SIGNIN_URL = `${BASE_URL}/api/v1/auth/signin`;

//Unit Url's
export const ADD_UNIT_URL = `${BASE_URL}/unit/addUnit`;
export const GET_UNIT_URL = `${BASE_URL}/unit/search`;
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
export const VIEW_ALL_SUPPLIER_URL = `${BASE_URL}/supplier/getAll`;
export const GET_SUPPLIER_ID_URL = `${BASE_URL}/supplier/getSupplier`;
export const UPDATE_SUPPLIER_URL = `${BASE_URL}/supplier/updateSupplier`;
export const DELETE_SUPPLIER_URL = `${BASE_URL}/supplier/deleteSupplier/`;


//Material Url's
export const ADD_MATERIAL_URL = `${BASE_URL}/material/add`;
export const GET_MATERIAL_URL = `${BASE_URL}/material/getAll`;
export const VIEW_ALL_MATERIAL_URL = `${BASE_URL}/material/viewAll`;
export const UPDATE_MATERIAL_URL = `${BASE_URL}/material/update`;
export const DELETE_MATERIAL_URL = `${BASE_URL}/material/delete/`;

// material po

export const ADD_MATERIALPO_URL = `${BASE_URL}/purchaseOrder`;
export const GET_MATERIALPO_BY_ID_URL = `${BASE_URL}/purchaseOrder`;
export const GET_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/search`;
export const UPDATE_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/updatePurchase`;
export const DELETE_MATERIALPO_URL = `${BASE_URL}/purchaseOrder/`;

//signup

export const SIGNUPURL = `${BASE_URL}/api/v1/auth/signup`;

//color url's
export const ADD_COLOR_URL = `${BASE_URL}/colors`
export const DELETE_COLOR_URL = `${BASE_URL}/colors`
export const UPDATE_COLOR_URL = `${BASE_URL}/colors`
export const GET_COLOR_URL = `${BASE_URL}/colors`

//create Inventory Material
export const ADD_INVENTORY_URL = `${BASE_URL}/inventory`
export const GET_INVENTORY_URL = `${BASE_URL}/inventory/search`
export const UPDATE_INVENTORY_URL = `${BASE_URL}/inventory`
export const GET_INVENTORYBYID_URL = `${BASE_URL}/inventory`
export const DELETE_INVENTORY_URL = `${BASE_URL}/inventory`



//stock journel url
export const ADD_STOCKJOURNEL_URL = `${BASE_URL}/stockjournal`

export const GET_STOCK_URL = `${BASE_URL}/stockjournal/search`
export const GET_STOCKBYID_URL = `${BASE_URL}/stockjournal`
export const UPDATE_STOCK_URL = `${BASE_URL}/stockjournal`
export const DELETE_STOCK_URL = `${BASE_URL}/stockjournal/delete`



//product group 
export const ADD_PRODUCT_GROUP_URL = `${BASE_URL}/productgroup`;
export const GET_PRODUCT_GROUP_URL = `${BASE_URL}/productgroup`;
export const UPDATE_PRODUCT_GROUP_URL = `${BASE_URL}/productgroup`;
export const VIEW_ALL_PRODUCT_GROUP_URL = `${BASE_URL}/productgroup/viewAll`;
export const DELETE_PRODUCT_GROUP_URL = `${BASE_URL}/productgroup/`;

//Currency
export const ADD_CURRENCY_URL = `${BASE_URL}/currency`;
export const GET_CURRENCY_URL = `${BASE_URL}/currency`;
export const UPDATE_CURRENCY_URL = `${BASE_URL}/currency`;
export const VIEW_ALL_CURRENCY = `${BASE_URL}/currency/viewAll`;
export const DELETE_CURRENCY_URL = `${BASE_URL}/currency/`;

//Size
export const ADD_SIZE_URL = `${BASE_URL}/sizes`;
export const GET_SIZE_URL = `${BASE_URL}/sizes`;
export const UPDATE_SIZE_URL = `${BASE_URL}/sizes`;
export const VIEW_ALL_SIZE = `${BASE_URL}/sizes/viewAll`;
export const DELETE_SIZE_URL = `${BASE_URL}/sizes/`;

//Design
export const ADD_DESIGN_URL = `${BASE_URL}/design`;
export const GET_DESIGN_URL = `${BASE_URL}/design`;
export const UPDATE_DESIGN_URL = `${BASE_URL}/design`;
export const VIEW_ALL_DESIGN = `${BASE_URL}/design/viewAll`;
export const DELETE_DESIGN_URL = `${BASE_URL}/design/`;

//dahsboard

export const Count = `${BASE_URL}/api/dashboard`

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


export const customStyles = (theme) => ({
    control: (provided, state) => ({
        ...provided,
        minHeight: '50px',
        fontSize: '16px',
        backgroundColor: theme === 'dark' ? '#1D2A39' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        border: `1.5px solid ${theme === 'dark' ? '#3D4D60' : '#E5E5E5'}`, // Border color based on theme
        borderRadius: '4px', // Assuming the same rounded border
        boxShadow: 'none', // Remove any default box shadow
        '&:hover': {
            borderColor: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Hover border color
        },
        '&:focus': {
            borderColor: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Focus border color
        },
        '&:active': {
            borderColor: state.isFocused ? '#3B82F6' : theme === 'dark' ? '#3D4D60' : '#E5E5E5', // Active border color
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '10px 10px',
        // zIndex: 9999,

    }),
    input: (provided) => ({
        ...provided,
        fontSize: '16px',
        color: theme === 'dark' ? '#fff' : '#000',
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '16px',
        color: theme === 'dark' ? '#fff' : '#000',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: theme === 'dark' ? '#1D2A39' : '#fff',
        zIndex: 99999,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? (theme === 'dark' ? '#000' : '#f0f0f0') : 'transparent',
        color: state.isFocused ? (theme === 'dark' ? '#fff' : '#000') : (theme === 'dark' ? '#fff' : '#000'),
    }),
});



