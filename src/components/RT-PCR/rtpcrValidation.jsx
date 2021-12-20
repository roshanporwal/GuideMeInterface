import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        name: yup.string().required("Patient name is required"),
        location:yup.string().required("Location is required"),
        symptoms:yup.string().required("Symptoms is required"),
        hospital:yup.string().required("Hospital is required"),
})