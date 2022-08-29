/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { clearError, getAllProduct } from '../../actions/productAction';
import ProductsCard from '../Home/ProductsCard';
import Loading from '../Layout/Loading';
import MetaData from '../Layout/MetaData';

function Products() {
    const dispatch = useDispatch();
    const [SearchParams] = useSearchParams();
    const keyword = SearchParams.get('keyword');
    const [activePage, setActivePage] = useState(1);
    const { loading, error, products, productsCount, resultPerPage } = useSelector(
        (state) => state.products
    );

    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
        dispatch(getAllProduct(keyword, activePage));
    }, [dispatch, error, alert, keyword, activePage]);

    const handlePageChange = (e) => {
        setActivePage(e);
    };

    return loading ? (
        <Loading />
    ) : (
        <>
            <MetaData title="Products - E-commerce" />

            <div className="text-center">
                <h1 className="inline-block duration-500 m-5 mx-auto text-2xl py-3 px-5 border-b-2 border-sky-700">
                    All Products
                </h1>
            </div>
            <div
                className="container mx-auto p-4 flex flex-wrap justify-center gap-4"
                id="container">
                {products &&
                    products.map((product, i) => (
                        <ProductsCard key={product._id} product={product} />
                    ))}
            </div>

            <Pagination
                activePage={activePage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount || 0}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                activeClass="text-sky-500 hover:text-white"
                innerClass="container mx-auto p-4 flex justify-center gap-4"
                itemClass="py-1 px-4 bg-slate-200 rounded hover:bg-sky-500 transition-all hover:text-white"
            />
        </>
    );
}

export default Products;
