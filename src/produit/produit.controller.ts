import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/Auth/JwtAuth.guards';
import { User } from 'src/decorators/user.decorateurs';
import { ProduitDto } from 'src/dto/create-produit.dto';
import { ProduitEntity } from 'src/entities/produit.entity';
import { UserEntity } from 'src/entities/user.entity';
import { ProduitService } from './produit.service';

@Controller('produit')
export class ProduitController {
    constructor(private readonly produitService: ProduitService) { }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    AfficheUnProduit(@Param('id', ParseIntPipe) id): Promise<ProduitEntity> {
        return this.produitService.findOneProduct(id);
    }



    // Chercher le nombre de produit par age
    /*@Get('stats')
    @UseGuards(AuthGuard('jwt'))
    async statsProduitNumberByAge() {
        return await this.produitService.statProduitNumberByAge();
    }

    @Get('recover/:id')
    @UseGuards(AuthGuard('jwt'))
    async restoreProduit(
        @Param('id', ParseIntPipe) id: number,
        //@User() user
    ) {
        return await this.produitService.restoreProduit(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteproduit(
        @Param('id', ParseIntPipe) id: number,
        @User() user
    ) {
        return this.produitService.softDeleteProduit(id, user);
    }*/

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async AfficheDesProduits(@Req() req){
      const Produser = req.user;
      return await this.produitService.findAllProduct();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async Ajoutproduit(@Body() produit: ProduitDto, @Req() req){
      const Produser = req.user;
        return await this.produitService.createProduit(produit, Produser);
    }
}
/*import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { ProduitDto } from '../dto/create-produit.dto'
import { UpdateProduitDto } from '../dto/update-produit.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/Auth/JwtAuth.guards';
import { UserEntity } from 'src/entities/user.entity';
import { ProduitEntity } from 'src/entities/produit.entity';
import { User } from 'src/decorators/user.decorateurs';
import { AuthEntity } from 'src/entities/Auth.entity';
import {Request } from 'express'

@ApiTags('Produits')

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  async create(@Body() createProduitDto: ProduitDto, @Req() request: UserEntity) {
    //const user = await this.produitService.createProduit(createProduitDto);
    const user = request.produits
    return await this.produitService.createProduit(createProduitDto, request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async TrouveProduits(@User() request: ProduitEntity){
    const produit = await this.produitService.findAllProduct(request)
    return produit;
  }
  @Get(':id')
  TrouveProduit(@Param('id', ParseIntPipe) id, @User() user):Promise<ProduitEntity>  {
    return this.produitService.findOneProduct(id, user);
  }

  @Put(':id')
  Modifier(@Param('id') id: number, @Body() updateProduitDto: UpdateProduitDto): Promise<UpdateResult> {
    return this.produitService.ModifProduit(id, updateProduitDto);
  }

  @Delete(':id')
  Supprimer(@Param('id') id: number): Promise<DeleteResult>{
    return this.produitService.SupprimerProduit(id);
  }
}
 */