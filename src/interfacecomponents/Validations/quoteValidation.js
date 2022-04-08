import * as yup from 'yup';


export const quoteSchema = yup.object().shape({
       // select_doctor: yup.string().required("Please select a doctor"),
       // select_anesthesiologist: yup.string().email().required("Please select anesthediologist"),
        treatment_plan: yup.string().required("Treatment plan is required"),
        estimate_price: yup.string().required("Estimate price is required"),
        //inclusion: yup.string().required("Inclusion is required"),
        //exclusion: yup.string().required("Exclusion is required"),
        //expected_length: yup.string().required("Expected length is required"),
        //estimate_copay: yup.string().required("Estimated copay is required"),
        //type_of_anesthesia: yup.string().required("Please select an option"),
        //type_of_room: yup.string().required("Type of room is required"),
        //free_room_upgrade: yup.string().required("Please select an option"),
        //free_physiotherapy: yup.string().required("Please select an option"),
        //free_other_speciality_consultant: yup.string().required("Please select an option"),
        // free_telephonic_feedback: yup.string().required("Please select an option"),
//        free_annual_checkup: yup.array().required("Please select an option"),
        //pickup_and_drop: yup.string().required("Please select an option"),
        //free_patient_dedicated_relationship: yup.string().required("This field is required"),
        //benefits_for_patient: yup.string().required("Please enter a response"),
        //benefits_for_attendent: yup.string().required("Please enter e response"),
        //food_menu: yup.string().required("Food menu is required"),
        //confirmation: yup.string().required("Confirmation is required"),
        general_disclaimer: yup.string().required("General disclaimer is required"),
        //length_of_stay: yup.string().required("Expected length of stay is required"),
})