/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { BiMouse } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllProduct } from '../../actions/productAction';
import Loading from '../Layout/Loading';
import MetaData from '../Layout/MetaData';
import ProductsCard from './ProductsCard';

/* const product = {
    name: 'Laptop',
    image,
    price: '$200',
    id: 'ahfahfjah',
    numOfReview: 25,
    rating: 3.5
}; */

function Home() {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products);
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllProduct());
    }, [dispatch, error, alert]);

    return loading ? (
        <Loading />
    ) : (
        <>
            <MetaData title="Home - E-commerce" />
            <div className="h-[90vh] relative bg-sky-700 dark:bg-black p-5 flex items-center justify-center">
                <div className="text-center">
                    <h3 className="text-2xl text-slate-100">Welcome to Shopping World</h3>

                    <h1 className="text-4xl my-6 text-slate-100">
                        Find your Basic Need With Best Quality{' '}
                    </h1>

                    <a
                        href="#container"
                        className="inline-flex items-center text-slate-100 gap-2 text-xl  px-5 py-3 bg bg-slate-800  border-2 rounded-md	 ">
                        Scroll <BiMouse className="text-3xl" />
                    </a>
                </div>
            </div>
            <div className="text-center">
                <h1 className="inline-block rounded-md hover:bg-sky-700 duration-500 m-5 mx-auto text-2xl py-3 px-5 border-2 border-sky-700 hover:border-slate-800 hover:text-white ">
                    Feature Product
                </h1>
            </div>
            <div
                className="container mx-auto p-4 flex flex-wrap justify-center gap-4"
                id="container">
                {products &&
                    products.map((product, i) => <ProductsCard key={i} product={product} />)}
            </div>
        </>
    );
}

export default Home;
