// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const account = new ethers.Wallet(process.env.PRIVATE_KEY);
const signer = account.connect(provider);


async function deployTimelock(delaySeconds, proposers, executors) {
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(delaySeconds, proposers, executors);
  const tl = await timelock.deployed();
  console.log(`
    Timelock deployed at ${tl.address}
  `);
}


async function main() {
  await deployTimelock(30, [signer.address], [signer.address]);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
