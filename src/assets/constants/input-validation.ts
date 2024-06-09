import { ValidationRules } from "@/interfaces/interfaces";
import strings from "@/assets/strings/strings.json";

export const newPasswordValidations = {
  length: {
    regex: /^.{8,}$/,
    message: strings.atleast8Characters,
  },
  lowercase: {
    regex: /[a-z]/,
    message: strings.atleast1Lowercase,
  },
  uppercase: {
    regex: /[A-Z]/,
    message: strings.atleast1Uppercase,
  },
  number: {
    regex: /\d/,
    message: strings.atleast1Number,
  },
  specialChar: {
    regex: /[!@#$%^&*]/,
    message: strings.atleast1SpecialCharacter,
  },
};

export const validationData: ValidationRules = {
  phone: {
    regex: /^\d{10}$/,
    message: strings.phoneNumValidation,
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: strings.emailValidation,
  },

  password: {
    regex: new RegExp(
      `(?=.*[a-z])` +
        `(?=.*[A-Z])` +
        `(?=.*\\d)` +
        `(?=.*[!@#$%^&*])` +
        `.{8,}$`
    ),
    message: strings.passwordValidationMessage,
  },
};
