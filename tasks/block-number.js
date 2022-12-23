const { task } = require("hardhat/config")

task("block-number", "Prints current block number").setAction(
    async (taskArgs, hre) => {
        // hre is like
        // const { ethers, run, network } = require("hardhat")
        // We can call the function from the library via 'hre'
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log("Block Number is: ", blockNumber)
    }
)

module.exports = {}
