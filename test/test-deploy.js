const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", () => {
    let ContractFactory, simpleStorage
    beforeEach(async () => {
        ContractFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await ContractFactory.deploy()
    })

    it("Should start with initial number with 0", async () => {
        const currValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currValue.toString(), expectedValue)
    })

    it("Should update when store() is called", async () => {
        const expectedValue = "19"
        await simpleStorage.store(expectedValue)
        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
    })
})
