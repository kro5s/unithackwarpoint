import React, {ChangeEvent, useState} from 'react';
import SearchBar from "../UI/SearchBar/SearchBar";
import Card from "../Card/Card";

const Catalog = () => {
    const [query, setQuery] = useState('')

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <section className="pt-20 pb-32">
            <SearchBar query={query} setQuery={handleQueryChange} />
            <div className="relative grid grid-cols-[repeat(auto-fit,_minmax(0,_300px))] gap-x-12 gap-y-20 justify-center md:justify-start mt-20 px-10">
                <div className="absolute left-[200px] top-[300px] size-[200px] md:size-[300px] rotate-45 border border-blue-accent" aria-hidden />
                <div className="absolute right-[150px] -top-[30px] lg:-top-[80px] size-[150px] md:size-[250px] rotate-12 border border-red-accent" aria-hidden />
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </section>
    );
};

export default Catalog;