import React, { useState } from 'react';

const SearchList = ({data, setResults}) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = (value) => {
        const results = data.filter((user) => {
            return (user && user.scrumMasterName &&
                user.scrumMasterName.toString().toLowerCase().includes(value.toLowerCase()))
             || (user && user.Developers.map((person) => person.value) &&
                user.Developers.map((person) => person.value).toString().toLowerCase().includes(value.toLowerCase()));


        });
        setResults(results);
        console.log(results);

    }

    const  handleChange = (value) => {
        setSearchTerm(value);
        filteredData(value);
    }

    return (
            <div className="form-outline mb-4">
                <input
                    type="search"
                    className="form-control"
                    id="datatable-search-input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => handleChange(e.target.value)}
                />
            </div>

    );
}

export default SearchList;
