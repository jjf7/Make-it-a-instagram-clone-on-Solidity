const Decentagram = artifacts.require("Decentagram")

module.exports = (deployer) => {
    deployer.deploy(Decentagram)
}