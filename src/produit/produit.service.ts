/*import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/entities/Auth.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProduitDto } from '../dto/create-produit.dto';
import { UpdateProduitDto } from '../dto/update-produit.dto';
import { ProduitEntity } from '../entities/produit.entity';
import { UserRoleEnum } from './enums/user-role.enum';

@Injectable()
export class ProduitService {
  constructor(@InjectRepository(ProduitEntity) 
  private ProduitRepository: Repository<ProduitEntity>){}

  async findAllProduct(user): Promise<ProduitEntity[]>{
    if (user.role === UserRoleEnum.ADMIN)
      return await this.ProduitRepository.find();
    return await this.ProduitRepository.find(user);
  }

  ModifProduit(id: number, updateProduitDto: UpdateProduitDto){
    return this.ProduitRepository.update(id, updateProduitDto);
  }

  SupprimerProduit(id: number): Promise<DeleteResult>{
    return this.ProduitRepository.delete(id);
  }
}*/

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProduitDto } from "src/dto/create-produit.dto";
import { ProduitEntity } from "src/entities/produit.entity";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private ProduitRepository: Repository<ProduitEntity>,
  ) {
  }

  async findOneProduct(id: number) {
    const findproduit = await this.ProduitRepository.findOne(id);
    if (!findproduit) {
      throw new NotFoundException(`Le produit ${id} n'existe pas`);
    }
    return findproduit;
  }
  async createProduit(createProduitDto: ProduitDto, Produser: UserEntity): Promise<ProduitEntity> {
    const newProduit = this.ProduitRepository.create(createProduitDto);
    newProduit.users = Produser
    return this.ProduitRepository.save(newProduit);
  }
  async findAllProduct(): Promise<ProduitEntity[]> {
    return await this.ProduitRepository.find();
  }
} 