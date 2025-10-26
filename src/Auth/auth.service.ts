import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/DB/models/User.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async signup(signupDTO: SignUpDto) {
    const { username, email, password } = signupDTO;

    // check if user email already exists
    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new ConflictException('User email already exists');

    // create new user
    const [user] =
      (await this.userModel.create([{ username, email, password }])) || [];
    if (!user) throw new BadRequestException('failed to Signup');

    return { message: 'User register success', data: user };
  }
}
