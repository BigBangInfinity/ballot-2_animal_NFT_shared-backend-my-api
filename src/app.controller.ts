import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';
import { DelegateVoteDto } from './dtos/delegateVote.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('something-else')
  getSomethingElse(): string {
    return this.appService.getSomethingElse();
  }

  @Get('contract-address')
  getContractAddress() {
    return {result: this.appService.getContractAddress()};
  }

  @Get('token-name')
  async getTokenName() {
    return {result: await this.appService.getTokenName()};
  }

  @Get('total-supply')
  async getTotalSupply() {
    return {result: await this.appService.getTotalSupply()};
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return {result: await this.appService.getTokenBalance(address)};
  }

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return {result: await this.appService.getTransactionReceipt(hash)};
  }

  @Get('server-wallet-address')
  async getServerWalletAddress() {
    return {result: this.appService.getServerWalletAddress()};
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return {result: await this.appService.checkMinterRole(address)};
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return {result: await this.appService.mintTokens(body.address, body.signature)};
  }

  @Post('delegate-vote')
  async delegateVote(@Body() body: DelegateVoteDto) {
    return {result: await this.appService.delegateVote(body.address, body.signature)};
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

}

