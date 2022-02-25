import { faPanorama, faShirt, faWallet } from "@fortawesome/free-solid-svg-icons";
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
import NewspaperIcon from "@mui/icons-material/Newspaper";

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
        title: "Product",
        path: "",
        icon: <ShoppingBasketIcon />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Category",
                path: "/admin/product-category",
                icon: <CategoryIcon fontSize="small" />,
            },
            {
                title: "Product List",
                path: "/admin/product",
                icon: <FontAwesomeIcon icon={faShirt} />,
            },
        ],
    },
    {
        title: "Blog",
        path: "",
        icon: <NewspaperIcon />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Category",
                path: "/admin/blog-category",
                icon: <CategoryIcon fontSize="small" />,
            },
            {
                title: "Blog List",
                path: "/admin/blog",
                icon: <ListAltIcon fontSize="small" />,
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
    {
        title: "Slider",
        path: "",
        icon: <FontAwesomeIcon icon={faPanorama} />,
        iconClosed: <KeyboardArrowLeftIcon fontSize="small" />,
        iconOpened: <KeyboardArrowDownIcon fontSize="small" />,
        SubMenu: [
            {
                title: "Slider List",
                path: "/admin/slider",
                icon: <ListAltIcon fontSize="small" />,
            },
            {
                title: "Create New Slider",
                path: "/admin/slider/form",
                icon: <FiberNewIcon fontSize="small" />,
            },
        ],
    },
];
