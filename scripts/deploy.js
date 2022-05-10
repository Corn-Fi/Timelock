// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { addresses } = require("./addresses");

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

async function polygonScanVerify(contractAddress, args, contractPath) {
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
    contract: contractPath
  });
}


async function main() {
  // await deployTimelock(
  //   86400,                     // 24 hour delay
  //   [addresses.devTreasury],   // Gnosis safe is proposer
  //   [addresses.devTreasury]    // Gnosis safe is executor
  // );

  // NOTE: It is recommended to revoke TIMELOCK_ADMIN_ROLE from the deployer
  // since the role is automatically granted upon deployment.
  
  await polygonScanVerify(
    addresses.timelock, 
    [
      86400, 
      [signer.address, addresses.devTreasury], 
      [signer.address, addresses.devTreasury]
    ], 
    "contracts/Timelock.sol:Timelock"
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
