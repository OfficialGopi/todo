import z from "zod";

class AuthValidators {
  validateSignupObject = z
    .object({
      name: z.string().min(1, "Name is Required").trim().max(100),
      username: z
        .string()
        .trim()
        .toLowerCase()
        .min(6, "Username must be atleast of length 6")
        .refine(
          (username) => !username.includes(" "),
          "Username must not contain space",
        ),
      email: z.string().trim().email("Invalid Email"),
      password: z
        .string()
        .min(8, "Password Must be atleast of 8 characters")
        .max(50, "Password cannot contain more than 50 characters")
        .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
        .regex(/[0-9]/, "Password must contain atleast one number")
        .regex(/[a-z]/, "Password must contain atleast one lowercase letter"),
      confirmPassword: z
        .string()
        .min(8, "Password Must be atleast of 8 characters")
        .max(50, "Password cannot contain more than 50 characters"),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  validateVerifyEmailObject = z
    .object({
      token: z
        .string()
        .min(1, "Invalid Token")
        .trim()
        .refine((s) => !s.includes(" "), "Token doesnot contain white spaces"),
    })
    .strict()
    .refine(() => true, "Invalid Token");

  validateAuthLoginObject = z
    .object({
      credential: z.string().trim(),
      password: z.string().min(8, "Password does not match"),
    })
    .strict()
    .refine(() => true, "Invalid Credentials");

  validateAuthChangeCurrentPasswordObject = z
    .object({
      currentPassword: z.string(),
      newPassword: z
        .string()
        .min(8, "Password Must be atleast of 8 characters")
        .max(50, "Password cannot contain more than 50 characters")
        .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
        .regex(/[0-9]/, "Password must contain atleast one number")
        .regex(/[a-z]/, "Password must contain atleast one lowercase letter"),
      confirmNewPassword: z
        .string()
        .min(8, "Password Must be atleast of 8 characters")
        .max(50, "Password cannot contain more than 50 characters")
        .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
        .regex(/[0-9]/, "Password must contain atleast one number")
        .regex(/[a-z]/, "Password must contain atleast one lowercase letter"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "New Passwords donot match",
      path: ["confirmNewPassword"],
    });
}

const authValidators = new AuthValidators();

export { authValidators };
