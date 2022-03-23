/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Field } from 'formik';
import React from 'react';
import styles from './Input.module.scss';

type TFieldTypes = {
  field: {
    name: string;
    value: string;
    onChange: () => void;
    onBlur: () => void;
  };
  meta: {
    touched: boolean;
    error: boolean;
  };
};

type TProps = {
  name: string;
  type: string;
};
function Input({ name, type }: TProps) {
  return (
    <Field name={name}>
      {({ meta, field }: TFieldTypes) => {
        const inputClass =
          meta.error && meta.touched
            ? `${styles.input__field} ${styles.input__error}`
            : `${styles.input__field}`;

        return (
          <div className={styles.input__container}>
            {name}
            <input
              type={type}
              {...field}
              // autoComplete='off'
              className={inputClass}
            />
            {meta.touched && meta.error && (
              <span className={styles.input__error}>{meta.error}</span>
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default Input;
