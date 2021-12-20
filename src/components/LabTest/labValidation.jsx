import * as yup from 'yup';
export const validationSchema = yup.object().shape({
        flat_number: yup.string().required("flat number name is required"),
        building_name:yup.string().required("building name Info is required"),
        street_name:yup.string().required("street name is required"),
        location:yup.string().required("location is required"),
        emirates:yup.string().required("emirates is required"),
        landmark:yup.string().required("landmark is required"),
        symptoms:yup.string().required("symptoms is required"),
        requirements:yup.string().required("requirements is required"),
        preffered_gender:yup.string().required("preffered gender is required"),
        preffered_language:yup.string().required("preffered language is required"),
        payment_type:yup.string().required("payment type is required"),
        mobile:yup.string().required("mobile is required"),
})