/* eslint-disable import/no-unresolved */
/* eslint-disable no-constant-condition */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { CarouselProvider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';

import '@splidejs/react-splide/css';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { clearError, getProductDetails } from '../../actions/productAction';
import img1 from '../../asset/ecommerce-images/1.jpg';
import img2 from '../../asset/ecommerce-images/2.jpg';
import img3 from '../../asset/ecommerce-images/3.jpg';
import img4 from '../../asset/ecommerce-images/4.jpg';
import img6 from '../../asset/ecommerce-images/camera 1.jpg';
import Loading from '../Layout/Loading';
import MySlider from './MySlider';
import ReviewCard from './ReviewCard';

const img = [img1, img2, img3, img4, img6];
const ratingChanged = (newRating) => {
    console.log(newRating);
};

function ProductDetails({ match }) {
    const alert = useAlert();
    const [cSlide, setCSlide] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, error, loading } = useSelector((state) => state.productDetails);

    const option = {
        edit: false,
        size: window.innerWidth < 600 ? 20 : 28,
        classNames: '',
        onChange: ratingChanged,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        fullIcon: <i className="fa fa-star" />,
        activeColor: '#ffd700',
        value: product?.ratings
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, error, id, alert]);

    return loading ? (
        <Loading />
    ) : (
        <div className="container m-auto ">
            <div className="my-8 p-8 flex gap-4 flex-col md:flex-row bg-slate-200 rounded">
                <div className="w-full md:w-1/2 p-6 sm:p-2 ">
                    <CarouselProvider
                        visibleSlides={product?.images?.length > 1 ? 2 : 1}
                        totalSlides={product?.images?.length}
                        step={1}
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        currentSlide={cSlide}
                        infinite
                        isPlaying
                        hasMasterSpinner
                        className="relative items-center justify-center p-4 md:p-2 border rounded">
                        <MySlider image={img} setCSlide={setCSlide} product={product} />
                    </CarouselProvider>
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <div className="border-double border-b-4 border-sky-500 py-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold"> {product?.name}</h1>
                        <p>Product # {product?._id}</p>
                    </div>
                    <div className="flex items-center gap-4 border-double border-b-4 border-sky-500 py-2 justify-center md:justify-start">
                        <ReactStars {...option} />{' '}
                        <span className="text-xl"> {product.numOfReviews} Reviews</span>
                    </div>
                    <div className="border-double border-b-4 border-sky-500 py-4">
                        <h1 className="text-3xl font-bold text-center md:text-left">
                            {' '}
                            ৳ {product?.price}
                        </h1>

                        <div className="flex items-center gap-8 md:gap-4 mt-4 justify-center md:justify-start flex-col  md:flex-row">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="inline-block bg-sky-600 text-white text-2xl py-[.1rem] px-4 rounded">
                                    {' '}
                                    +{' '}
                                </button>
                                <input
                                    type="number"
                                    placeholder="1"
                                    className="bg-gray-300 w-10 px-2 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="inline-block bg-sky-600 text-white text-2xl py-[.1rem] px-4 rounded">
                                    {' '}
                                    -{' '}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="inline-block rounded-full hover:bg-sky-700 duration-500 text-xl py-1 px-5 border-2 border-sky-700 hover:border-slate-800 hover:text-white hover:scale-105">
                                Add to card
                            </button>
                        </div>
                    </div>

                    <div className="border-double border-b-4 border-sky-500 py-4">
                        <p className="text-center md:text-left">
                            Status :
                            {product?.stock ? (
                                <span className="text-green-500 font-bold"> InStock </span>
                            ) : (
                                <span className="text-red-500 font-bold"> OutStock </span>
                            )}
                        </p>
                    </div>
                    <div className=" border-double border-b-4 border-sky-500 py-4 text-center md:text-left">
                        <div className="">
                            <h1 className="text-2xl uppercase">description </h1>
                            <p className="text-gray-600"> {product?.description}</p>
                        </div>
                        <button
                            type="button"
                            className="inline-block rounded-full hover:bg-sky-700 duration-500 text-xl py-1 px-5 mt-4 border-2 border-sky-700 hover:border-slate-800 hover:text-white hover:scale-105">
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <h1 className="text-3xl text-center underline font-bold">Reviews</h1>

                {product.reviews && product.reviews[0] ? (
                    <div className="">
                        <Splide
                            options={{
                                perPage: 3,
                                cover: true,
                                focus: 'center',
                                lazyLoad: 'nearby',
                                autoplay: true,
                                autoScroll: {
                                    speed: 2
                                },
                                gap: '1rem',
                                breakpoints: {
                                    768: {
                                        perPage: 2,
                                        gap: '1rem'
                                    },
                                    640: {
                                        perPage: 1
                                    }
                                }
                            }}
                            aria-label="React Splide Example">
                            {product.reviews &&
                                product.reviews.map((review) => (
                                    <SplideSlide className="mx-auto text-center" key={review._id}>
                                        <ReviewCard review={review} />{' '}
                                    </SplideSlide>
                                ))}
                        </Splide>
                    </div>
                ) : (
                    <p className="text-center font-bold text-xl py-4">No Review yet</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
