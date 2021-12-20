import * as yup from 'yup';
export const loginvalidationSchema = yup.object().shape({
        //patient_email: yup.string().email().required("Patient email is required"),
        mobile: yup.string().required("Mobile is required"),
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
        name: yup.string().required("Name is required"),
        mobile: yup.string().required("Mobile is required"),
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