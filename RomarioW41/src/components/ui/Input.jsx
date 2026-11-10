
import React, { forwardRef } from 'react';
import './ui.css';

const Input = forwardRef(function Input({
  label,
  name,
  type = 'text',
  icon,
  error,
  ...props
}, ref) {
  return (
    <div className="ui-field">
      <label className="ui-label" htmlFor={name}>
        {label}
      </label>

      <div className={`ui-input-wrapper ${error ? 'has-error' : ''}`}>
        {icon && <span className="ui-input-icon">{icon}</span>}

        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          className="ui-input"
          {...props}
        />
      </div>

      {error && <p className="ui-error">{error}</p>}
    </div>
  );
});

export default Input;
