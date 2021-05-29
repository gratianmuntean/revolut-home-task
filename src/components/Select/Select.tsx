import React from "react";

import styles from "./styles.module.css";

type SelectProps = {
  options: any;
  register: any;
  name: string;
  className?: string;
  onChangeHandler?: any;
  which?: string;
  defaultValue?: any;
};

const Select = (props: SelectProps) => {
  const {
    options,
    register,
    name,
    className,
    onChangeHandler,
    which,
    defaultValue,
  } = props;
  return (
    <select
      {...register(name)}
      className={`${styles.select} ${className}`}
      onChange={(event) => {
        const value = event.target.value;
        onChangeHandler(value, which);
      }}
      defaultValue={defaultValue}
    >
      {options?.map((acc: any, index: number) => {
        return (
          <option key={index} value={acc?.currency}>
            {acc?.currency}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
