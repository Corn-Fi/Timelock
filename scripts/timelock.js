// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const { addresses } = require("./addresses");
const TimeLock = require("../artifacts/contracts/Timelock.sol/Timelock.json");

const hashZero = ethers.constants.HashZero;
const zero = ethers.constants.Zero;


// ----------------------------------------------------------------------------------
// -------------------------------- Helper Functions --------------------------------
// ----------------------------------------------------------------------------------

async function fetchSigner() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const signer = wallet.connect(provider);
  console.log(`connected to ${signer.address}`);
  return signer;
}

// ----------------------------------------------------------------------------------

async function fetchContract(address, abi, signer) {
  const contract = new ethers.Contract(address, abi, signer);
  console.log(`loaded contract ${contract.address}`);
  return contract;
}

// ----------------------------------------------------------------------------------
// ------------------------------- Timelock Functions -------------------------------
// ----------------------------------------------------------------------------------

async function scheduleTransaction(target, value, data, predecessor, salt, delay) {
  const signer = await fetchSigner();
  const timelock = await fetchContract(addresses.timelock, TimeLock.abi, signer);
  await timelock.schedule(target, value, data, predecessor, salt, delay);
}

async function executeTransaction(target, value, data, predecessor, salt) {
  const signer = await fetchSigner();
  const timelock = await fetchContract(addresses.timelock, TimeLock.abi, signer);
  await timelock.execute(target, value, data, predecessor, salt);
}

async function grantRole(role, account) {
  const signer = await fetchSigner();
  const timelock = await fetchContract(addresses.timelock, TimeLock.abi, signer);
  await timelock.grantRole(role, account);
}

async function revokeRole(role, account) {
  const signer = await fetchSigner();
  const timelock = await fetchContract(addresses.timelock, TimeLock.abi, signer);
  await timelock.revokeRole(role, account);
}

// ----------------------------------------------------------------------------------

async function main() {
  // const signer = await fetchSigner();
  // const timelock = await fetchContract(addresses.timelock, TimeLock.abi, signer);
  // const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();
  // const proposerRole = await timelock.PROPOSER_ROLE();
  // const executorRole = await timelock.EXECUTOR_ROLE();
  // const cancellerRole = await timelock.CANCELLER_ROLE();

  // await revokeRole(proposerRole, signer.address);
  // await revokeRole(executorRole, signer.address);
  // await revokeRole(cancellerRole, signer.address);
  // await revokeRole(adminRole, signer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
