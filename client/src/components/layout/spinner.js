import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width:"300px", marginLeft:"280px", display:"block" }}
            alt="Loading..."
        />
    </Fragment>
);