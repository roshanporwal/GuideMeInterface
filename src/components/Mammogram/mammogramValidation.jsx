import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        location:yup.string().required("location is required"),
        // requirements:yup.string().required("requirements is required"),
})