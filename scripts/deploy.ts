// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import hre from "hardhat";

async function main() {
  const baseTokenURI = "ipfs://QmZbWNKJPAjxXuNFSEaksCJVd1M6DaKQViJBYPK2BdpDEP/";

  // Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  const contractFactory = await ethers.getContractFactory("NFTCollectible");
  const contract = await contractFactory.deploy(baseTokenURI);

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  // Reserve NFTS
  let txn = await contract.reserveNFTs();
  await txn.wait();
  console.log("10 NFTs have been reserved");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});