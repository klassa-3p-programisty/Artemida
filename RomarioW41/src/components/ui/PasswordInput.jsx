
import React, { forwardRef, useState } from 'react';
import './ui.css';

const PasswordInput = forwardRef(function PasswordInput({
  label,
  name,
  error,
  ...props
}, ref) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="ui-field">
      <label className="ui-label" htmlFor={name}>
        {label}
      </label>

      <div className={`ui-input-wrapper ${error ? 'has-error' : ''}`}>
        <input
          ref={ref}
          id={name}
          name={name}
          type={visible ? 'text' : 'password'}
          className="ui-input"
          {...props}
        />

        <button
          type="button"
          className="ui-eye"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>

      {error && <p className="ui-error">{error}</p>}
    </div>
  );
});

export default PasswordInput;
