import * as yup from 'yup';

const mobileReg = /^(\+\d{1,3}[- ]?)?\d{10}$/
const nameReg = /^[a-z ,.'-]+$/i
const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

export const loginvalidationSchema = yup.object().shape({
        //patient_email: yup.string().email().required("Patient email is required"),
        mobile: yup.string().required("Mobile is required").matches(mobileReg, {message:'Please Enter a valid Mobile Number',excludeEmptyString:true}),
        //patient_age: yup.string().required("Patient age is required"),
        // patient_gender: yup.string().required("Patient gender is required"),
        // current_diagnosis: yup.string().required("Patient current diagnosis is required"),
        // insurance_card_copy: yup.mixed().required("Patient insurance card copy is required"),
        // airport_transfer_needed: yup.string().required("Please select an option"),
        // ambulance_support_needed: yup.string().required("Please select an option"),
        // medical_visa_arrangements: yup.string().required("Please select an option"),
        // proposed_treatment_plan: yup.array().required("Proposed treatment plan is required"),
        // transport_support_needed: yup.string().required("Please select an option"),
})
export const signupvalidationSchema = yup.object().shape({
        first_name: yup.string().required("First Name is required").matches(nameReg, {message:'Please Enter a valid First Name',excludeEmptyString:true}),
        family_name: yup.string().required("Family Name is required").matches(nameReg, {message:'Please Enter a valid Family Name',excludeEmptyString:true}),
        mobile: yup.string().required("Mobile is required").matches(mobileReg, {message:'Please Enter a valid Mobile Number',excludeEmptyString:true}),
        email: yup.string().required("Email is required").matches(emailReg, {message:'Please Enter a valid Email-ID',excludeEmptyString:true}),
        // dob: yup.string().required("Date of Birth is required"),
        gender: yup.string().required("Gender is required"),
        // insurance_name: yup.string().required("Insurance Name is required."),
        referredby: yup.string().required("Referref By is required"),
        nationality: yup.string().required("Nationality is required"),
        // insurance_card_copy: yup.mixed().required("Patient insurance card copy is required"),
        // airport_transfer_needed: yup.string().required("Please select an option"),
        // ambulance_support_needed: yup.string().required("Please select an option"),
        // medical_visa_arrangements: yup.string().required("Please select an option"),
        // proposed_treatment_plan: yup.array().required("Proposed treatment plan is required"),
        // transport_support_needed: yup.string().required("Please select an option"),
})