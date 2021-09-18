import * as yup from 'yup';
/* const treatment_plans = ["surgical_consultation", "admission", "second_opinion_of_report", "international_expert_opinion", "home_care_services", "teleconsultation", "multiple_options"]; */
export const validationSchema = yup.object().shape({
        patient_name: yup.string().required("Patient name is required"),
        patient_email: yup.string().email().required("Patient email is required"),
        patient_referred_by: yup.string().required("Please enter a name"),
        
        patient_mobile: yup.number().min(10, "Number should not be more than 10").positive("Number does not contain negatives").integer("Only numerals please"),
        patient_age: yup.string().required("Patient age is required"),
        patient_gender: yup.string().required("Patient gender is required"),
        patient_nationality: yup.string().required("Patient nationality is required"),
       //patient_document: yup.mixed().required("Patient document is required"),
       //patient_reports: yup.mixed().required("Patient reports are required"),
        current_diagnosis: yup.string().required("Patient current diagnosis is required"),
        insurance_name: yup.string().required("Insurance name is required"),
        //insurance_card_copy: yup.mixed().required("Patient insurance card copy is required"),
        medical_history: yup.string().required("Patient medical history is required"),
        airport_transfer_needed: yup.string().required("Please select an option"),
        ambulance_support_needed: yup.string().required("Please select an option"),
        medical_visa_arrangements: yup.string().required("Please select an option"),
        //proposed_treatment_plan: yup.bool().required("Proposed treatment plan is required"),
        //other_plan: yup.string().required("required"),
        transport_support_needed: yup.string().required("Please select an option"),
        //languages_spoken: yup.string().required("Please select an option"),
        //other_languages: yup.string().required("required"),
        food_preferences: yup.string().required("Food preferences is required"),
        accomodation: yup.string().required("Accomodation is required"),
        preferred_hospital_visit: yup.string().required("Please select an option"),
        proposal_date: yup.string().required("Please select proposal date"),
        from_date: yup.string().required("Please select a date"),
        to_date: yup.string().required("Please select a date")

})