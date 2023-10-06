import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  ForbiddenException,
  BadGatewayException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt/dist';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const birth_date = new Date(createUserDto.birthday);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
      birthday: birth_date,
    });
    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const uniqueKey: string = v4();
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const updatedUser = await this.userRepo
      .update(
        {
          hashed_refresh_token,
          activation_link: uniqueKey,
        },
        {
          where: { id: newUser.id },
          returning: true,
        },
      )
      .then((updatedUser) => updatedUser[1][0]);
    try {
      await this.mailService.sendUserConfirmationMail(updatedUser);
    } catch (error) {
      console.log(error);
    }
    return {
      message: 'User created successfully',
      user: updatedUser,
    };
  }
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatedUser = await this.userRepo
      .update(
        { is_active: true },
        {
          where: {
            activation_link: link,
            is_active: false,
          },
          returning: true,
        },
      )
      .then((updatedUser) => updatedUser[1][0]);

    if (!updatedUser) {
      throw new BadRequestException('User already activated');
    }
    const response = {
      message: 'User activated successfully',
      user: updatedUser,
    };
    return response;
  }
  async getAllUsers() {
    const users = await this.userRepo.findAll();
    if (users.length >= 1) {
      return users;
    }
    return {
      message: 'Users not found',
    };
  }
  async getOneUser(userId: string) {
    const user = await this.userRepo.findByPk(userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const updatedUser = await this.userRepo
      .update(updateUserDto, {
        where: {
          id,
        },
        returning: true,
      })
      .then((updatedUser) => updatedUser[1][0]);

    if (!updatedUser) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  }
  async removeUser(id: number) {
    const res = await this.userRepo.destroy({
      where: {
        id,
      },
    });
    if (!res) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'user removed',
    };
  }
  async login(loginDto: LoginDto, res: Response) {
    const findUser = await this.userRepo.findOne({
      where: {
        email: loginDto.email,
      },
    });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!findUser.is_active) {
      throw new ForbiddenException('User not activated');
    }
    const isMatch = await bcrypt.compare(loginDto.password, findUser.password);
    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    const tokens = await this.getTokens(findUser);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return {
      message: 'User login successfully',
      refresh_token: tokens.refresh_token,
    };
  }
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo
      .update(
        {
          hashed_refresh_token: null,
        },
        {
          where: {
            id: userData.id,
          },
          returning: true,
        },
      )
      .then((updatedUser) => updatedUser[1][0]);
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updatedUser,
    };
    return response;
  }

  async refreshToken(user_id: string, Refresh_Token:string, res:Response){
    const decodedToken = this.jwtService.decode(refreshToken);
    if(user_id!==decodedToken['id']){
      throw new BadGatewayException('user not found');
    }

    const user = await this.userRepo.findOne({where:{id:user_id}});

    if(!user || !user.hashed_refresh_token){
      throw new BadGatewayException('user not found');
    }

    const tokenMatch = await bcrypt.compare(this.refreshToken,user.hashed_refresh_token)
    if(!tokenMatch){
      throw new ForbiddenException('Forbidden')
    }

    const tokens = await this.getTokens(user);
    const ha
  }
}
