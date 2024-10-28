import * as Yup from "yup";

export const SIGN_IN_VALIDATION_SCHEME = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Email must contain a valid '@' symbol and domain"
    )
    .required("Please provide email address"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*,.])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 special character (!@#$&*,.), 2 numerals (0-9), and 3 lowercase letters."
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
    .email("Invalid email address")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Email must contain a valid '@' symbol and domain"
    )
    .required("Please provide email address"),
  phoneNo: Yup.string()
    .matches(
      /^(?:0|\+44)(\s?\d{3,4}\s?\d{3,4}|\s?\d{4}\s?\d{4})$/,
      "Phone number must be a valid UK number"
    )
    .required("Please provide a phone number"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
      "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 special character (!@#$&*), 2 numerals (0-9), and 3 lowercase letters."
    )
    .required("Please provide password"),
});

export const FORGOT_PASSWORD_VALIDATION_SCHEME = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      "Email must contain a valid '@' symbol and domain"
    )
    .required("Please provide email address"),
});