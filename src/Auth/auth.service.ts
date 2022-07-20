import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginCredentialsDto } from 'src/dto/LoginCredentialsDto';
import { UserSubscribeDto } from 'src/dto/UserSubscribe.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
/*We add five methods in our service,*/
export class AuthService {
    constructor(@InjectRepository(UserEntity)
    private authRepository: Repository<UserEntity>,
        private jwtService: JwtService) { }

    async findAll() {
        return this.authRepository.find()
    }
    async findOneUserlogin(id: number) {
        const finduserlogin = await this.authRepository.findOne(id);
        if (!finduserlogin) {
          throw new NotFoundException(`L'utilisateur ${id} n'est pas inscrit `);
        }
        return finduserlogin;
    }
    async subscribe(userData: UserSubscribeDto): Promise<UserEntity> {
        const auth = this.authRepository.create({ ...userData })
        //const salt = 10;
        //auth.password = await bcrypt.hash(auth.password, salt);
        try {
            await this.authRepository.save(auth)
        } catch (error) {
            throw new HttpException(`username or email must be unique`, HttpStatus.NOT_FOUND)
        } return auth
    }
    async Login(credentials: LoginCredentialsDto) {
        //RECUPERE LE LOGIN ET PASSWORD
        const { email, password } = credentials;
        //S'INSCRIRE VIA LE loginname ou LE loginpassword
        const payload = { email: credentials.email, password: credentials.password };
        //VERIFIER S'IL Y'A UN USER AVEC LE LOGIN OU CE MDP
        const users = await this.authRepository.findOne({ where: { email, password } })
        //console.log(users)
        if (!users) {
            throw new NotFoundException('Wrong');
        } else {
            return {
                access_token: this.jwtService.sign(credentials)
            }
        }
    }

/*async pouboir(credentials: LoginCredentialsDto){
        //RECUPERE LE LOGIN ET PASSWORD
        const {email, password} = credentials;
        //S'INSCRIRE VIA LE loginname ou LE loginpassword
        const payload =  {email: credentials.email, password: credentials.password};
        //VERIFIER S'IL Y'A UN USER AVEC LE LOGIN OU CE MDP
        const users = await this.authRepository.findOne({where: {email, password}})
        console.log(users)
        if (!users)
        throw new HttpException(`Introuvable`, HttpStatus.NOT_FOUND);
        return {
                access_token: this.jwtService.sign(payload)
        }}*/}