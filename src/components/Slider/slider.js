import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";

// import required modules
import { Pagination, Navigation } from "swiper";

// This component is used for home and detail page
const Slider = props => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="one-slide-swiper"
            >
                {props.slides.map(slide =>
                    <SwiperSlide>
                        <img src={slide.image} alt="slider" />
                        <div className="slider-text">
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
}

export default Slider;