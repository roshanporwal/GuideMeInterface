import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        location:yup.string().required("location is required"),
        symptoms:yup.string().required("requirements is required"),
})