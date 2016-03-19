import React from 'react';

import {Link} from 'react-router'

export default () => {
    return (
        <ul style={{position:'absolute', top:0, left:0}}>
            <li><Link to="/">home</Link></li>
            <li><Link to="/timer">timer</Link></li>
            <li><Link to="/register">register</Link></li>
            <li><Link to="/contacts">contacts</Link></li>
            <li><Link to="/contactpicker">choose contact</Link></li>
        </ul>
    )
}
