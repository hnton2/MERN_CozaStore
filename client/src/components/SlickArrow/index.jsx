import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={"slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        <ArrowBackIosIcon />
    </button>
);

export const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={"slick-next slick-arrow" + (currentSlide === slideCount - 1 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        <ArrowForwardIosIcon />
    </button>
);
