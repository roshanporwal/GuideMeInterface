import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        name: yup.string().required("Patient name is required"),
        location:yup.string().required("Location is required"),
        symptoms:yup.string().required("Symptoms is required"),
        preferred_hospital_doctor:yup.string().required("Hospital is required"),
})