import {
  MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
  Virtual,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { GenderEnum, ProviderEnum, RoleEnum } from 'src/common/enums/user.enum';
import { generateHash } from 'src/common/utils/security/hash.utils';

export type UserDocument = HydratedDocument<User>;
@Schema(
  // options
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)
export class User {
  // field
  @Prop({
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
  })
  firstName: string;
  @Prop({
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    trim: true,
  })
  lastName: string;
  @Virtual({
    get: function (this: User) {
      return this.firstName + ' ' + this.lastName;
    },
    set: function (this: UserDocument, value: string) {
      const [firstName, lastName] = value.split(' ') || [];
      this.set({
        firstName,
        lastName,
      });
    },
  })
  username: string;
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  })
  email: string;
  @Prop({
    type: Date,
  })
  confirmEmail: Date;
  @Prop({
    type: String,
  })
  confirmEmailOTP: string;
  @Prop({
    type: String,
    required: function (this: User) {
      return this.provider === ProviderEnum.SYSTEM ? true : false;
    },
  })
  password: string;
  @Prop({
    type: String,
    enum: {
      values: Object.values(ProviderEnum),
      message: 'provider must be either "System" or "Google"',
    },
    default: ProviderEnum.SYSTEM,
  })
  provider: ProviderEnum;
  @Prop({
    type: String,
    enum: {
      values: Object.values(RoleEnum),
      message: 'Role must be either "User" or "Admin"',
    },
    default: RoleEnum.USER,
  })
  role: RoleEnum;
  @Prop({
    type: String,
    enum: {
      values: Object.values(GenderEnum),
      message: 'provider must be either "Mail" or "Female"',
    },
    default: GenderEnum.MALE,
  })
  gender: GenderEnum;
  @Prop({
    type: String,
  })
  phoneL: string;
}
export const userSchema = SchemaFactory.createForClass(User);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await generateHash({ plainText: this.password });
  }
  next();
});

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);

// The (forFeatureAsync) way to use hooks
// export const UserModel = MongooseModule.forFeatureAsync([
//   {
//     name: User.name,
//     useFactory: () => {
//       userSchema.pre('save', async function (next) {
//         if (this.isModified('password')) {
//           this.password = await generateHash({ plainText: this.password });
//         }
//         next();
//       });
//       return userSchema;
//     },
//     // inject: [ConfigService],
//   },
// ]);
