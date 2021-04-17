import React from 'react';

const Select = ({name, label, error, options, ...rest}) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="custom-select" name={name} id={name} {...rest}>
                <option value="" />
                {options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
            </select>
            {error && <span className="text-danger small">{error}</span>}
        </div>
     );
}
 
export default Select;