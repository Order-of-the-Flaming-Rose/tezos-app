/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { Field, Form, Formik } from 'formik';

import { TInput } from '../../Invite/Invite';
import styles from './InviteForm.module.scss';

type TProps = {
  init: TInput;
  rules: any;
  name: string;
};

function InviteForm({ init, rules, name }: TProps) {
  const formHandler = (val: TInput) => console.log(val);

  return (
    <Formik
      initialValues={init}
      validationSchema={rules}
      onSubmit={formHandler}
    >
      <Form className={styles.form}>
        <Field name={name}>
          {({ meta, field }: { meta: any; field: any }) => {
            return (
              <>
                <input
                  type='text'
                  {...field}
                  placeholder={name}
                  className={styles.form__input}
                />
                <input
                  type='submit'
                  className={styles.form__submit}
                  value='get an invite'
                />
                {meta.touched && meta.error && (
                  <span className={styles.form__error}>{meta.error}</span>
                )}
              </>
            );
          }}
        </Field>
      </Form>
    </Formik>
  );
}

export default InviteForm;
