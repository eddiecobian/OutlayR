import * as yup from "yup";

const initialValues = {
  title: "",
  description: "",
  imageUrl: "",
  name: "",
  id: ""
};

const validationSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  name: yup.string().required("This field is required")
  //imageUrl: yup.string()
});

export { validationSchema, initialValues };
