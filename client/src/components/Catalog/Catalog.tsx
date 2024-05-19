import React, {ChangeEvent, useState} from 'react';
import SearchBar from "../UI/SearchBar/SearchBar";
import Card from "../Card/Card";
import {useAppSelector} from "../../hooks/hooks";
import {selectAllProducts} from "../../store/slices/productsSlice";

const Catalog = () => {
    const products = useAppSelector(selectAllProducts)

    const [query, setQuery] = useState('')
    const [categories, setCategories] = useState([ "sticker", "cup", "technic", "tshirt" ])

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const filteredProducts = products.filter(product =>
        (product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.content.toLowerCase().includes(query.toLowerCase())) && categories.includes(product.category))

    return (
        <section className="pt-20 pb-32">
            <SearchBar query={query} setQuery={handleQueryChange} categories={categories} setCategories={setCategories} />
            <div className="relative grid grid-cols-[repeat(auto-fit,_minmax(0,_300px))] gap-x-12 gap-y-20 justify-center md:justify-start mt-20 px-10">
                <div className="absolute left-[200px] top-[300px] size-[200px] md:size-[300px] rotate-45 border border-blue-accent" aria-hidden />
                <div className="absolute right-[150px] -top-[30px] lg:-top-[80px] size-[150px] md:size-[250px] rotate-12 border border-red-accent" aria-hidden />
                {
                    filteredProducts.length > 0 ?
                        filteredProducts.map(product => (
                            <Card key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} category={product.category} content={product.content} />
                        ))
                        :
                        <div><span className="font-bold text-xl">Товаров не найдено</span></div>
                }
            </div>
        </section>
    );
};

export default Catalog;