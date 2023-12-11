import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MintNFTSDto } from './dtos/mintNFTS.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Get('token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }



  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return {result: await this.appService.getTokenBalance(address)};
  }  

  @Get('server-wallet-address')
  getServerWalletAddress() {
    return {
      result: this.appService.getServerWalletAddress()
    };
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post('mint-nfts')
  async mintNFTS(@Body() body: MintNFTSDto) {
    const result = await this.appService.mintNFTS(body.address);
    return { result };
  }

  
  @Get('ballot-address')
  getBallotAddress() {
    return {result: this.appService.getBallotAddress()};
  }

  @Get('voting-power/:address')
  async getVotingPower(@Param('address') address: string) {
    return {result: await this.appService.getVotingPower(address)};
  }

  @Get('proposal0')
  async proposal0() {
    return {result: await this.appService.proposal0()};
  }  

  @Get('proposal1')
  async proposal1() {
    return {result: await this.appService.proposal1()};
  }  

  @Get('proposal2')
  async proposal2() {
    return {result: await this.appService.proposal2()};
  }  

  @Get('winner-name')
  async getWinnerName() {
    return {result: await this.appService.getWinnerName()};
  }


  // @Post('mint-nfts')
  // async mintNFTS(@Body() body: MintNFTSDto) {
  //   const result = await this.appService.mintNFTS(body.signature, body.address);
  //   return { result };
  // }
}
