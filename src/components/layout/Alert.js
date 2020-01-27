import React from 'react';
import PropTypes from 'prop-types';

export const Alert = ({alert}) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.message}
            </div>
        )
    );
};

Alert.propTypes = {
    alert: PropTypes.object.isRequired
};
