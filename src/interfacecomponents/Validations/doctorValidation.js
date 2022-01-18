import * as yup from 'yup';
/* const treatment_plans = ["surgical_consultation", "admission", "second_opinion_of_report", "international_expert_opinion", "home_care_services", "teleconsultation", "multiple_options"]; */
export const doctorSchema = yup.object().shape({
        doctor_name: yup.string().required("Doctor name is required"),
        speciality: yup.string().required("Doctor speciality is required"),
})