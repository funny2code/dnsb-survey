import React from 'react';

const Copyright = ({color}) => {
    return (
        <div style={{ textAlign: 'center', color: color || "black"}}>
            &copy; {new Date().getFullYear()} BuyFacts. All rights reserved.
        </div>
    );
};

export default Copyright;