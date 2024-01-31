import * as yup from "yup";

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required"),
        address1: yup.string().required("Address line 1 is required"),
        address2: yup.string().required("Address line 2 is required"),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        region: yup.string().required("Country is required"),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required("Name on card is required"),
    }),
];
