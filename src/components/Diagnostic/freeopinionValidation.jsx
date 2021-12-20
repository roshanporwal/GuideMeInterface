import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        condition: yup.string().required("Condition name is required"),
        //additional_condition_info:yup.string().required("Additional Condition Info is required"),
        recomended_treatment:yup.string().required("Recommended Treatment is required"),
        //additional_treatment_info:yup.string().required("Hospital is required"),
        //doctor_specialization_recommend:yup.string().required(" is required"),
})