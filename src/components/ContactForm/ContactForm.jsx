import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Must be at least 3 characters').max(50, 'Must be 50 characters or less').required('Required'),
        number: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid phone number').required('Required'),
    });

    return (
        <Formik
            initialValues={{ name: '', number: ' ' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
        >
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <label className={styles.label}>
                        Name
                        <Field type="text" name="name" className={styles.input} />
                        <ErrorMessage name='name' component='div' className={styles.error} />
                    </label>
                    <label className={styles.label}>
                        Number
                        <Field type="text" name="number" className={styles.input} />
                        <ErrorMessage name="number" component="div" className={styles.error} />
                    </label>
                    <button type="submit" disabled={isSubmitting} className={styles.button}>
                        Add Contact
                    </button>
                </Form>
            )}
        </Formik>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;