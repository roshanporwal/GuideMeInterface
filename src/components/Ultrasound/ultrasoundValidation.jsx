import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        location:yup.string().required("location is required"),
        symptoms:yup.string().required("symptoms is required"),
        address_patient:yup.string().required("Emirates is required"),
})