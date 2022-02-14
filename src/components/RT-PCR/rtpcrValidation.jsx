import * as yup from 'yup';
// const nameReg = /^[a-z ,.'-]+$/i
export const validationSchema = yup.object().shape({
        // name: yup.string().required("Patient name is required").matches(nameReg, {message:'Please Enter a valid Name',excludeEmptyString:true}),
        location:yup.string().required("Location is required"),
        // symptoms:yup.string().required("Symptoms is required"),
        // hospital:yup.string().required("Hospital is required"),
})