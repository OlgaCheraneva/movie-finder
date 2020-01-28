import React, {Fragment} from 'react';

import {Search} from '../films/Search';
import {Films} from '../films/Films';

export const Home = () => (
    <Fragment>
        <Search />
        <Films />
    </Fragment>
);
