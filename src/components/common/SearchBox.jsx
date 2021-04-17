import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return ( 
        <input
            className="form-control mb-2" 
            type="text"
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
            placeholder="Search..."
            />
     );
}
 
export default SearchBox;