/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import { Formik, Form as FormComponent } from 'formik';
import React from 'react';
import styles from './Form.module.scss';
import Input from './Input';

export type Tfield = {
  name: string;
  type: string;
  render?: () => void;
};

type Tconfig = {
  fields: Array<Tfield>;
  rules: any;
  callback: (values?: any) => void;
  children?: React.ReactNode | null;
  row?: boolean;
};

function Form({
  callback,
  rules,
  fields,
  children = null,
  row = true,
}: Tconfig) {
  const values: { [key: string]: string } = fields.reduce((acc, el) => {
    return { ...acc, [el.name]: '' };
  }, {});

  const formClass = row ? styles.form : `${styles.form} ${styles.form_row}`;

  return (
    <Formik onSubmit={callback} validationSchema={rules} initialValues={values}>
      <FormComponent className={formClass}>
        {fields.map((el) => {
          return el.render ? (
            el.render()
          ) : (
            <Input name={el.name} type={el.type} />
          );
        })}
        <input type='submit' className={styles.form__btn} />
        {children}
      </FormComponent>
    </Formik>
  );
}

export default Form;
