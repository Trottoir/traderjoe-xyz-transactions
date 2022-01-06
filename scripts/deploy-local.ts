import hre from "hardhat";

async function main() {

  const [owner] = await hre.ethers.getSigners()

  const JoeFactoryMockFactory = await hre.ethers.getContractFactory("JoeFactoryMock");
  const joeFactoryMockContract = await JoeFactoryMockFactory.deploy(owner.address);
  await joeFactoryMockContract.deployed();

  const WAvaxFactory = await hre.ethers.getContractFactory("WAVAX9Mock");
  const wAvaxContract = WAvaxFactory.attach("0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7");
  await wAvaxContract.deployed();

  const RouterJoeMockFactory = await hre.ethers.getContractFactory("JoeRouter02Mock");
  const routerJoeMockContract = await RouterJoeMockFactory.deploy(joeFactoryMockContract.address, wAvaxContract.address);
  await routerJoeMockContract.deployed();

  const LPAllocatorTraderJoeFactory = await hre.ethers.getContractFactory("LPAllocatorTraderJoe");
  const allocatorTraderJoe = await LPAllocatorTraderJoeFactory.deploy(
    routerJoeMockContract.address
  );


  const TimeERC20TokenFactory = await hre.ethers.getContractFactory("TimeERC20Token");
  const TimeERC20Contract = TimeERC20TokenFactory.attach("0xb54f16fB19478766A268F172C9480f8da1a7c9C3");


  //console.log(await wAvaxContract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));
  //console.log(await TimeERC20Contract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));
  console.log(await hre.ethers.provider.getBalance(owner.address));
  await allocatorTraderJoe.deployed();
  await allocatorTraderJoe.swapAvaxVsToken({
    "from": owner.address, "value": 100000
  });

  console.log(await wAvaxContract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));
  console.log(await TimeERC20Contract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"));

  console.log("AllocatorTraderJoe deployed to:", allocatorTraderJoe.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
