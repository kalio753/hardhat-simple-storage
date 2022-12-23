const { ethers, run, network } = require("hardhat")

async function main() {
    // Deploy the contract
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying, plz wait ...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Contract have been deployed to ${simpleStorage.address}`)

    // Verify contract if on the goerli testnet
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verifyContract(simpleStorage.address, [])
    }

    // Interacting w the contract
    const currValue = await simpleStorage.retrieve()
    console.log("Current Value is : ", currValue)
    const transactionResponse = await simpleStorage.store(19) // Update value
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log("Updated Value is : ", updatedValue)
}

async function verifyContract(contractAddress, args) {
    console.log("Verifying contract ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
