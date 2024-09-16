import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as CouponContract from '../artifacts/contracts/Coupon.sol/Coupon.json';

@Injectable()
export class BlockchainService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      'http://localhost:8545',
    );
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    this.contract = new ethers.Contract(
      contractAddress,
      CouponContract.abi,
      this.provider,
    );
  }

  async createOrganization(name: string, adminPrivateKey: string) {
    const wallet = new ethers.Wallet(adminPrivateKey, this.provider);
    const tx = await this.contract.connect(wallet).createOrganization(name);
    await tx.wait();
  }

  async createCoupon(discount: number, adminPrivateKey: string) {
    const wallet = new ethers.Wallet(adminPrivateKey, this.provider);
    const tx = await this.contract.connect(wallet).createCoupon(discount);
    await tx.wait();
  }

  async linkCouponToUser(
    couponId: number,
    userAddress: string,
    adminPrivateKey: string,
  ) {
    const wallet = new ethers.Wallet(adminPrivateKey, this.provider);
    const tx = await this.contract
      .connect(wallet)
      .linkCouponToUser(couponId, userAddress);
    await tx.wait();
  }

  async useCoupon(couponId: number, userPrivateKey: string) {
    const wallet = new ethers.Wallet(userPrivateKey, this.provider);
    const tx = await this.contract.connect(wallet).useCoupon(couponId);
    await tx.wait();
  }
}
