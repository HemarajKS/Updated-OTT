import {
  newPasswordValidations,
  validationData,
} from "@/assets/constants/input-validation";
import strings from "@/assets/strings/strings.json";
import { ValidationRules } from "@/interfaces/interfaces";

export const validateInput = (
  name: string,
  value: string,
  type?: string
): string => {
  let validation = null;

  if (type) {
    validation = validationData[type];
  }

  let error: string = "";

  if (!value?.trim()) {
    error = `*${strings.pleaseEnter} ${
      name.charAt(0).toUpperCase() + name.slice(1)
    } `;
  } else if (validation && !validation.regex.test(value)) {
    error = validation.message;
  } else {
    error = "";
  }
  return error;
};

export const ValidatePassword = (value: string): ValidationRules => {
  const newPasswordErrors: ValidationRules = newPasswordValidations;

  Object.entries(newPasswordValidations).forEach(
    ([rule, { regex, message }]) => {
      if (!regex.test(value)) {
        newPasswordErrors[rule as keyof ValidationRules]["valid"] = false;
      } else {
        newPasswordErrors[rule as keyof ValidationRules]["valid"] = true;
      }
    }
  );

  return newPasswordErrors;
};
