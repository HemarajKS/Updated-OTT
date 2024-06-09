export interface SubMenuOption {
  name: string;
  link?: string;
}

export interface MenuItem {
  name: string;
  link: string;
  options: SubMenuOption[];
}

export interface ValueResponse {
  titles: [];
  value: string;
}

export interface TitleProps {
  title: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

export interface Image {
  url: string;
  altText: string;
}

export interface Target {
  path: string;
}

export interface Content {
  id: string;
  type: string;
  image: Image;
  title: string;
  description: string;
  target: Target;
}

export interface RailsProps {
  data: Content[];
  title: string;
}

export interface CarouselItemsProps {
  movieData: Content[];
}

export interface HeroDataProps {
  orientation: string;
  title: string;
  description: string;
  image: Image;
}

export interface FAQDataProps {
  id: string;
  accordionTitle: string;
  accordionDescription: string;
}

export interface FAQProps {
  data: FAQDataProps[];
  title: string;
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  function?: () => void;
  // Could be a boolean based on its usage, but set as string to match your example
  children: MenuItem[]; // Recursive type reference for nested children
}

interface Menu {
  name: string;
  items: MenuItem[];
}

interface MenuDataProps {
  menuData: Menu[];
}
export interface InputWithDropDown {
  dropdownValue: string;
  inputValue: string;
}

export interface ButtonComponentType {
  name: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  loading?: boolean;
  ghost?: boolean;
}

export interface LoginOption {
  name: string;
  icon: string;
  text: string;
}

export interface ErrorType {
  [key: string]: {
    message: string;
    type: string;
  };
}

export interface ValidationRules {
  [key: string]: {
    regex: RegExp;
    message: string;
    valid?: boolean;
  };
}

export interface LoginWithEmail {
  email: string;
  password: string;
}

export interface PhoneInput {
  phone: {
    dropdownValue: string;
    inputValue: string;
  };
  password: string;
}

export interface PhoneInputLogin {
  phone: {
    dropdownValue: string;
    inputValue: string;
  };
}

export interface PhoneValidation {
  phone: string;
  password: string;
}

export interface PhoneLoginType {
  phone: string;
}

export interface SignupEmail {
  email: string;
  password: string;
}

export interface SignupPhone {
  phone: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}

export interface NewPassword {
  password: string;
  confirmPassword: string;
}

export interface SnackbarContextType {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "info" | "warning";
  openSnackbar: (
    newMessage: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
  closeSnackbar: () => void;
}

export interface PasswordAssistanceInterface {
  email: string;
}

export interface OtpObject {
  type: string;
  destination: string;
  password: string;
  targetTimeStamp: Date;
}

export interface SkeletonLoaderInterface {
  width?: string;
  height?: string;
  variant?: "rectangular" | "rounded" | "circular";
  className?: string;
}

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export interface ProfileOption {
  title: string;
  url: string;
  function?: () => void;
}

export interface ProfileOptions {
  children: ProfileOption[];
}
