// import {
//   PipeTransform,
//   Injectable,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// // import { SignupDTO } from 'src/Auth/dto/create.auth.dto';

// @Injectable()
// export class PasswordMatchPipe implements PipeTransform {
//   transform(value: any, metadata: ArgumentMetadata) {
//     if (metadata.type === 'body') {
//       const { password, confirmPassword } = value;
//       if (password !== confirmPassword) {
//         throw new BadRequestException(
//           'password dose not match confirmPassword',
//         );
//       }
//     }
//     return value;
//   }
// }
