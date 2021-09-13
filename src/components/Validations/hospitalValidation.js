import * as yup from 'yup';
/* const treatment_plans = ["surgical_consultation", "admission", "second_opinion_of_report", "international_expert_opinion", "home_care_services", "teleconsultation", "multiple_options"]; */
export const hospitalSchema = yup.object().shape({
        hospital_address: yup.string().required("Hospital address is required"),
        hospital_mobile: yup.string().email().required("Hospital mobile is required"),
        hospital_email: yup.string().email().required("Hospital email is required"),
        
       
        
      

})