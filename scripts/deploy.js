const hre = require("hardhat");

async function main() {
  // Compile et déploie le contrat
  const Diplomes = await hre.ethers.getContractFactory("Diplomes");
  const diplomes = await Diplomes.deploy();

  await diplomes.waitForDeployment();

  const adresse = await diplomes.getAddress();
  console.log("✅ Contrat déployé à l'adresse :", adresse);
  console.log("👉 Copie cette adresse dans frontend/app.js");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
