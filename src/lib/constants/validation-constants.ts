import * as Yup from "yup";

export const SIGN_IN_VALIDATION_SCHEME = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please provide email address"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/,
      "8 characters length \n2 letters in Upper Case \n1 Special Character (!@#$&*) \n2 numerals (0-9) \n3 letters in Lower Case"
    )
    .required("Please provide password"),
});

export const SIGN_UP_VALIDATION_SCHEME = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please provide email address"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please provide password"),
});
