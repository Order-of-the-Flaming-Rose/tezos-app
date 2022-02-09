import styles from './FormCard.module.scss';

function FormCard() {
  return (
    <form className={styles.form}>
      <fieldset className={styles.form__container}>
        <h2 className={styles.form__title}>form</h2>
        <label htmlFor='discod' className={styles.form__label}>
          discord
          <input type='text' name='discord' className={styles.form__input} />
        </label>
        <label htmlFor='telegram' className={styles.form__label}>
          telegram
          <input type='text' name='telegram' className={styles.form__input} />
        </label>
      </fieldset>
      <div className={styles.form__footer}>
        <input type='submit' className={styles.form__btn} />
        <input type='submit' className={styles.form__btn} />
      </div>
    </form>
  );
}

export default FormCard;
