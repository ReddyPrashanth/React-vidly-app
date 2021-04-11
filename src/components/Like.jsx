import React from 'react';

const Like = (props) => {
    let classes = "fa-heart fa";
    props.liked ? classes += 's' : classes += 'r';
    return ( <i onClick={props.onClick} className={classes}></i> );
}
 
export default Like;