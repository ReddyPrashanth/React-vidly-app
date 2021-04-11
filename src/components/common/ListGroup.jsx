import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props) => {
    const { items, onItemSelection, selectedItem, propertyName } = props;
    return (
        <ul className="list-group">
            {items.map(item => (
                <li key={item[propertyName]} 
                    onClick={() => onItemSelection(item)} 
                    className={item === selectedItem? "list-group-item active" : "list-group-item"}>{item[propertyName]}</li>
            ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    propertyName: "name"
}

ListGroup.propTypes = {
    items: PropTypes.array,
    onItemSelection: PropTypes.func.isRequired,
    propertyName: PropTypes.string
}
 
export default ListGroup;