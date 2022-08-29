/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { NavLink } from 'react-router-dom';

function ProductsCard({ product }) {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
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
        value: product.ratings
    };

    return (
        <NavLink
            to={`/product/${product._id}`}
            className="group w-72 p-4 bg-slate-200 rounded hover:-translate-y-3 duration-500">
            <div className="">
                {product.images.map((img) => (
                    <img
                        key={img._id}
                        className="rounded group-hover:scale-105 duration-500 drop-shadow-md w-full h-56"
                        src={img.url}
                        alt="tes"
                    />
                ))}
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 font-bold">
                <ReactStars {...option} />{' '}
                <span className="text-xl"> {product.numOfReviews} Reviews</span>
            </div>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <h3 className="text-lg font-bold text-sky-500">$ {product.price}</h3>
            </div>
        </NavLink>
    );
}

export default ProductsCard;
