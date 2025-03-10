import React from "react";

interface InputGroupProps {
  id?: string,
  customClasses?: string;
  label?: string;
  type: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  name?: string;
  classInput?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  id,
  customClasses,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  defaultValue,
  name,
  classInput
}) => {
  return (
    <div className={customClasses}>
      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="text-red">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value} // Menambahkan value
        onChange={onChange} // Menambahkan onChange
        defaultValue={defaultValue}
        name={name}
        className={
          classInput ?
            classInput : "w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        }
      />
    </div>
  );
};

export default InputGroup;
