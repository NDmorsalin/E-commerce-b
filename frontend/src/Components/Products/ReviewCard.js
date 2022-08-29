/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';

function ReviewCard({ review }) {
    const [userAvatar, setUserAvatar] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await axios(`/api/v1/review/user/${review.user}`);
            setUserAvatar(data.user);
        };
        fetchUser();
    }, [review]);

    const option = {
        edit: false,
        size: window.innerWidth < 600 ? 20 : 28,
        classNames: 'mx-auto',
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        fullIcon: <i className="fa fa-star" />,
        activeColor: '#ffd700',
        value: review.rating
    };

    return (
        <div className="text-center border-4 w-10/12 sm:w-auto my-8 mx-auto p-4 rounded-md">
            <div className="w-16 h-16 mx-auto ">
                <img
                    src={userAvatar?.avatar?.url}
                    className="rounded-full border-2 "
                    alt={userAvatar?.avatar?.url}
                />
            </div>
            <ReactStars {...option} />
            <p className=""> {review?.comment} </p>
        </div>
    );
}

export default ReviewCard;
