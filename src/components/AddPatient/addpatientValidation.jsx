import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        name: yup.string().required("Patient name is required"),
        nationality:yup.string().required("Nationality is required"),
})