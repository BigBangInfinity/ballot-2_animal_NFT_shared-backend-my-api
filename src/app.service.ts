import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as MyNFT from './assets/MyNFT.json';
import * as ballotJson from './assets/TokenizedBallot.json';
import { ConfigService } from '@nestjs/config';

// const NFT_ADDRESS = "0x046b5E2E00949db65Ec4158f1e81C2dF737d434B"

@Injectable()
export class AppService {

  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  nftContract: ethers.Contract;
  ballotContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('NFT_ADDRESS'),
      MyNFT.abi,
      this.wallet,
    );
    this.ballotContract = new ethers.Contract(
      this.configService.get<string>('BALLOT_ADDRESS'),
      ballotJson.abi,
      this.wallet,
    );

  }

  getContractAddress(): string {
    return this.configService.get<string>('NFT_ADDRESS');
  }

  async getTokenName(): Promise<string> {
    const name = await this.contract.name();
    return name;
  }

  async getTokenBalance(address: string) {
    const balance = await this.contract.balanceOf(address);
    return balance.toString();
  }

  getServerWalletAddress() {
    return this.wallet.address;
  }
  async checkMinterRole(address: string) {
    const MINTER_ROLE = await this.contract.MINTER_ROLE();
    console.log(MINTER_ROLE);
    const hasRole = await this.contract.hasRole(MINTER_ROLE, address);
    return hasRole;
  }

  async mintNFTS(address: string) {
    console.log(`Trying to mint tokens to ${address}`);
    try {
      const hasMinterRole = await this.checkMinterRole(this.wallet.address);
      if (!hasMinterRole) {
        throw new Error('The Server Wallet do not have the MINTER_ROLE');
      }

      // const nextTokenId = await this.contract.getNextTokenId();
      // const tokenId = nextTokenId.toString();
      const transaction = await this.contract.safeMint(address);
      await transaction.wait();
      console.log('Tokens minted successfully. Transaction hash:', transaction.hash);


      return {
        success: true,
        transactionHash: transaction.hash,

      };
    } catch (error) {
      console.error('Error minting tokens:', error.message);

      return {
        success: false,
        error: error.message,
      };
    }
  }



  getBallotAddress(): string {
    return this.configService.get<string>('BALLOT_ADDRESS');
  }

  async getVotingPower(address: string) {
    const votingPower = await this.ballotContract.votingPower(address);
    return votingPower.toString();
  }

  async proposal0() {
    const proposal0 = await this.ballotContract.proposals(0);
    return {'name': ethers.decodeBytes32String(proposal0.name), 'votes': proposal0.voteCount.toString()}
  }

  async proposal1() {
    const proposal1 = await this.ballotContract.proposals(1);
    return {'name': ethers.decodeBytes32String(proposal1.name), 'votes': proposal1.voteCount.toString()}
  }

  async proposal2() {
    const proposal2 = await this.ballotContract.proposals(2);
    return {'name': ethers.decodeBytes32String(proposal2.name), 'votes': proposal2.voteCount.toString()}
  }

  async getWinnerName() {
    const winnerName = await this.ballotContract.winnerName();
    return ethers.decodeBytes32String(winnerName);
  }

}