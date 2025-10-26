// Class Validation
// import { Type } from 'class-transformer';
// import {
//   IsDate,
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsPhoneNumber,
//   IsString,
//   IsStrongPassword,
//   Length,
// } from 'class-validator';

// Zod Validation
import { GenderEnum, RoleEnum } from 'src/common/enums/user.enum';
import z from 'zod';

// Class Validation
// export class SignupDTO {
//   @IsString({ message: 'firstName must be a string' })
//   @Length(2, 20)
//   @IsNotEmpty()
//   firstName: string;
//   @IsString({ message: 'lastName must be a string' })
//   @Length(2, 20)
//   @IsNotEmpty()
//   lastName: string;
//   @IsString({ message: 'lastName must be a string' })
//   @Length(4, 40)
//   @IsNotEmpty()
//   username: string;
//   @IsEmail({}, { message: 'Invalid email formate' })
//   email: string;
//   @IsStrongPassword()
//   password: string;
//   @IsEnum(UserRole)
//   role: string;
//   @IsEnum(Gender)
//   gender: string;
//   @IsPhoneNumber('EG') // EG => Egypt
//   phone: string;
//   @Type(() => Date)
//   @IsDate()
//   DOB: Date;
// }

// Zod Validation
export const signupSchema = z
  .strictObject({
    username: z.string().min(4).max(40),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
    role: z.enum(Object.values(RoleEnum)).default(RoleEnum.USER).optional(),
    gender: z
      .enum(Object.values(GenderEnum))
      .default(GenderEnum.MALE)
      .optional(),
    phone: z
      .string()
      .refine(
        (val) => {
          const phoneRegex =
            /^(?:(?:01[0125]\d{8})|(?:(?:\+|00)?20(?:1[0125]\d{8})))$/;
          return phoneRegex.test(val);
        },
        {
          message: 'In valid EG phone number',
        },
      )
      .optional(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'password dose not match confirmPassword',
    path: ['confirmPassword'],
  });

export type SignUpDto = z.infer<typeof signupSchema>;
