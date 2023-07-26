import React from 'react';

export default function Input({
  onChange,
  value,
  error,
  placeholder,
  type,
  name,
}) {
  const { path, message } = error;
  return (
    <div className=" w-full max-w-xs">
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        onChange={onChange}
        value={value}
        name={name}
      />
      <label className="label">
        <span className="label-text-alt">{path === name && message}</span>
      </label>
    </div>
  );
}
