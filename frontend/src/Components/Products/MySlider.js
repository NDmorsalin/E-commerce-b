/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
    ButtonBack,
    ButtonNext,
    CarouselContext,
    ImageWithZoom,
    Slide,
    Slider
} from 'pure-react-carousel';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function MySlider({ image, setCSlide, product }) {
    const carouselContext = useContext(CarouselContext);
    const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide);

    useEffect(() => {
        function onChange() {
            setCurrentSlide(carouselContext.state.currentSlide);
        }
        carouselContext.subscribe(onChange);
        return () => carouselContext.unsubscribe(onChange);
    }, [carouselContext]);

    return (
        <div>
            <Slider className="">
                {product?.images?.map((im, i) => (
                    <Slide className="bg-red-500" key={im.url} index={i}>
                        <ImageWithZoom className="" src={im.url} />
                    </Slide>
                ))}
            </Slider>

            <ButtonBack className="absolute z-50 top-1/2 left-0 -translate-y-1/2">
                <IoIosArrowBack className="text-4xl" />
            </ButtonBack>
            <ButtonNext className="absolute z-50 top-1/2 right-0 -translate-y-1/2">
                <IoIosArrowForward className="text-4xl" />
            </ButtonNext>
            <div className="flex gap-1 border border-sky-600 rounded p-1">
                {product?.images?.map((img, i) => (
                    <img
                        key={img.url}
                        src={img.url}
                        alt=""
                        onClick={() => setCSlide(i)}
                        className={`w-10 rounded ${
                            i === currentSlide || i === currentSlide + 1
                                ? 'border-2 border-sky-600'
                                : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default MySlider;
