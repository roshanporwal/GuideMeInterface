import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        first_name: yup.string().required("Patient name is required"),
        last_name: yup.string().required("Patient name is required")
})