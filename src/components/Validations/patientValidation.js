import * as yup from 'yup';


export const validationSchema = yup.object().shape({
        patient_name: yup.string().required("Patient name is required"),
        patient_email: yup.string().email().required("Patient email is required"),
        patient_referred_by: yup.string().required("Please enter a name"),
        patient_mobile: yup.number()./* matches( "Must be only digits") */min(10, "Mobile number should not be more than 10 digits").max(10, "Mobile number should not be less than 10 digits").required().positive().integer(),
        patient_age: yup.string().required("Patient age is required"),
        patient_gender: yup.string().required("Patient gender is required"),
        patient_nationality: yup.string().required("Patient nationality is required"),
        patient_document: yup.string().required("Patient document is required"),
        patient_reports: yup.string().required("Patient reports are required"),
        current_diagnosis: yup.string().required("Patient current diagnosis is required"),
        insurance_card_copy: yup.string().required("Patient insurance card copy is required"),
        medical_history: yup.string().required("Patient medical history is required"),
        proposed_treatment_plan: yup.array().required("Patient treatment plan is required"),
        transport_support_needed: yup.string().required("Please select an option"),
        languages_spoken: yup.string().required("Please select an option"),
        food_preferences: yup.string().required("Food preferences is required"),
        accomodation: yup.string().required("Accomodation is required"),
        preferred_hospital_visit: yup.string().required("Please select an option"),
        proposal_date: yup.string().required("Please select proposal date"),
        from_date: yup.string().required("Please select a date"),
        to_date: yup.string().required("Please select a date")

})