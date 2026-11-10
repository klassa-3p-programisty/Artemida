
import React from 'react';
import './ui.css';

export default function Button({
  children,
  type = 'button',
  block = false,
  loading = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`ui-button ${block ? 'ui-button--block' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}
