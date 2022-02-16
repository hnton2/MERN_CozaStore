import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const IMAGE_CLOUDINARY = "https://res.cloudinary.com/hnt-46/image/upload/v1641628910/";

export const ADMIN_SIDEBAR = [
    {
        title: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon fontSize="small" />,
    },
    {
        title: "User List",
        path: "/admin/user",
        icon: <GroupAddIcon />,
    },
    {
        title: "Product Category",
        path: "",
        icon: <CategoryIcon />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Product Category List",
                path: "/admin/product-category",
                icon: <ListAltIcon fontSize="small" />,
            },
            {
                title: "Create New Product",
                path: "/admin/product-category/form",
                icon: <FiberNewIcon fontSize="small" />,
            },
        ],
    },
    {
        title: "Product",
        path: "",
        icon: <ShoppingBasketIcon />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Product List",
                path: "/admin/product",
                icon: <ListAltIcon fontSize="small" />,
            },
            {
                title: "Create New Product",
                path: "/admin/product/form",
                icon: <FiberNewIcon fontSize="small" />,
            },
        ],
    },
    {
        title: "Coupon",
        path: "",
        icon: <LocalAtmIcon />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Coupon List",
                path: "/admin/coupon",
                icon: <ListAltIcon fontSize="small" />,
            },
            {
                title: "Create New Coupon",
                path: "/admin/coupon/form",
                icon: <FiberNewIcon fontSize="small" />,
            },
        ],
    },
    {
        title: "Order List",
        path: "/admin/order",
        icon: <FontAwesomeIcon icon={faWallet} />,
    },
];

export const CATEGORY_OPTIONS = [
    { value: "shoes", label: "Shoes" },
    { value: "clothing", label: "Clothing" },
    { value: "accessory-equipment", label: "Accessory & Equipment" },
    { value: "jewelry", label: "Jewelry" },
];

export const COLOR_OPTIONS = [
    { value: "black", label: "Black" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "grey", label: "Grey" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "pink", label: "Pink" },
    { value: "white", label: "White" },
    { value: "silver", label: "Silver" },
];

export const TAG_OPTIONS = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "sports", label: "Sports" },
    { value: "jordan", label: "Jordan" },
    { value: "running", label: "Running" },
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "training-gym", label: "Training & Gym" },
    { value: "tennis", label: "Tennis" },
    { value: "shorts", label: "Shorts" },
    { value: "jackets", label: "Jackets" },
    { value: "hoodies", label: "Hoodies" },
    { value: "t-shirts", label: "T-shirts" },
    { value: "long-sleeve", label: "Long-Sleeve" },
];

export const TAG_SHOES_OPTIONS = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "sports", label: "Sports" },
    { value: "jordan", label: "Jordan" },
    { value: "running", label: "Running" },
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "training-gym", label: "Training & Gym" },
    { value: "tennis", label: "Tennis" },
];

export const TAG_CLOTHING_OPTIONS = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "shorts", label: "Shorts" },
    { value: "jackets", label: "Jackets" },
    { value: "hoodies", label: "Hoodies" },
    { value: "t-shirts", label: "T-shirts" },
    { value: "long-sleeve", label: "Long-Sleeve" },
];

export const SIZE_OPTIONS = [
    { value: "extra-small", label: "XS" },
    { value: "small", label: "S" },
    { value: "medium", label: "M" },
    { value: "large", label: "L" },
    { value: "extra-large", label: "XL" },
];

export const STATUS_RADIO = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

export const DEFAULT_VALUE_PRODUCT = {
    name: "",
    status: "active",
    images: [],
    category: [],
    color: [],
    tag: [],
    size: [],
    quantity: 0,
    price: 0,
    discount: 0,
    description: "",
};

export const DEFAULT_VALUE_CATEGORY_PRODUCT = {
    name: "",
    status: "active",
    description: "",
};

export const DEFAULT_VALUE_COUPON = {
    name: "",
    code: "",
    status: "active",
    discount: 0,
    quantity: 0,
    expiredTime: "",
    description: "",
};

export const DEFAULT_VALUE_CHECKOUT = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    message: "",
};

export const DEFAULT_VALUE_TRACKING = {
    orderId: "",
};
