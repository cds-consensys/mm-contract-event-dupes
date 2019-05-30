const SimpleStorage = artifacts.require("SimpleStorage");
const DimpleStorage = artifacts.require("DimpleStorage");
const FimpleStorage = artifacts.require("FimpleStorage");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(DimpleStorage);
  deployer.deploy(FimpleStorage);
};
