/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useAuthContext } from '../../contexts/AuthContext/AuthContext';
import { GETFORM } from '../../contexts/AuthContext/authTypes';
import Input from '../Input';
import styles from './FormCard.module.scss';

type TFormValues = {
  telegram: string;
  discord: string;
};

function FormCard() {
  const initialValues: TFormValues = { telegram: '', discord: '' };

  const { dispatch } = useAuthContext();

  const validateRules = yup.object({
    telegram: yup.string().required(),
    discord: yup.string().required(),
  });

  const formSubmit = (values: TFormValues) => {
    dispatch({
      type: GETFORM,
      payload: values,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateRules}
      onSubmit={formSubmit}
    >
      <Form className={styles.form}>
        <fieldset className={styles.form__container}>
          <h2 className={styles.form__title}>form</h2>
          {Object.entries(initialValues).map((field) => (
            <Input name={field[0]} />
          ))}
        </fieldset>
        <div className={styles.form__footer}>
          <input type='submit' className={styles.form__btn} />
        </div>
      </Form>
    </Formik>
  );
}

export default FormCard;
