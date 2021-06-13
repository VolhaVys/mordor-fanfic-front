import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const Input = ({
  autoComplete, id, label, name, ...props
}) => (
  <TextField
    autoComplete={autoComplete}
    fullWidth
    id={id}
    label={label}
    name={name}
    required
    variant="outlined"
    {...props}
  />
);

Input.propTypes = {
  autoComplete: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
