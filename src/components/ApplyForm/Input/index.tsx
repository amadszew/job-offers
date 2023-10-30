import { InputTypes } from '@/utils/types';

const Input = ({ type, id, label, placeholder, error, handler } : InputTypes) => {
  const inputStyles = `mb-4 lg:m-0 bg-transparent border-solid border-[1px] px-4 py-3 rounded-lg text-sm mt-1 ${error ? 'border-red-900' : 'border-gray-600'}`;

  return (
    <div className={`
      form-group flex flex-col 
      ${type === 'file' && ' col-span-2'}
    `}>
      <label className={`text-[12px] ${error ? 'text-red-900' : ''}`} htmlFor={id}>
        {label}
        {error && (
          <span className="text-red-900">{error}</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={id} 
        className={`
          ${inputStyles} 
          ${type === 'file' ? ' border-dashed py-6' : ''}
          ${type === 'number' ? ' remove-arrow' : ''}
        `}
        placeholder={placeholder}
        onChange={(e) => handler(e)}
      />
    </div>
  )
}

export default Input;