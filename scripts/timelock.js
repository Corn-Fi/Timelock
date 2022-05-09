// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const account = new ethers.Wallet(process.env.PRIVATE_KEY);
const signer = account.connect(provider);
const hashZero = ethers.constants.HashZero;
const zero = ethers.constants.Zero;




async function scheduleTransaction(_timelock, target, value, data, predecessor, salt, delay) {
  await _timelock.schedule(target, value, data, predecessor, salt, delay);
}

async function executeTransaction(_timelock, target, value, data, predecessor, salt) {
  await _timelock.execute(target, value, data, predecessor, salt);
}

async function grantRole(_timelock, role, account) {
  await _timelock.grantRole(role, account);
}

async function grantRole(_timelock, role, account) {
  await _timelock.grantRole(role, account);
}

async function revokeRole(_timelock, role, account) {
  await _timelock.revokeRole(role, account);
}



// ----------------------------------------------------------------------------------

async function main() {
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.attach("0xCf781b2FBB2d92B027837A273482CCaDd880B9A2");

  // await scheduleTransaction(timelock, "0x3ce06fafa62c028bd0197ad12591264e44126d53", hre.ethers.utils.parseUnits("1", 0), hashZero, hashZero, hashZero, hre.ethers.utils.parseUnits("30", 0));
  // await executeTransaction(timelock, "0x3ce06fafa62c028bd0197ad12591264e44126d53", hre.ethers.utils.parseUnits("1", 0), hashZero, hashZero, hashZero);
  // **** Examples ****
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
