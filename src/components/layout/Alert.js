import React, {useContext} from 'react';

import AlertContext from '../../context/alert/alertContext';

export const Alert = () => {
    const {alert} = useContext(AlertContext);

    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.message}
            </div>
        )
    );
};
