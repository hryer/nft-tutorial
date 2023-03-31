const { expect } = require("chai");


describe("Insane contract", function() {
  let contract;

  beforeEach(async function() {
    const Insane = await ethers.getContractFactory("Insane");
    contract = await Insane.deploy();
    await contract.deployed();
  });

  it("should have a name and symbol", async function() {
    expect(await contract.name()).to.equal("Insane");
    expect(await contract.symbol()).to.equal("INS");
  });

  it("should mint a new NFT", async function() {
    const uri = "https://example.com/nft";
    const owner = await ethers.getSigner(0);
    await contract.connect(owner).safeMint(owner.getAddress(), uri);

    const totalSupply = await contract.totalSupply();
    expect(totalSupply).to.equal(1);

    const tokenOwner = await contract.ownerOf(0);
    expect(tokenOwner).to.equal(await owner.getAddress());

    const tokenURI = await contract.tokenURI(0);
    expect(tokenURI).to.equal(uri);
  });

  it("should not mint more than the maximum supply", async function() {
    const uri = "https://example.com/nft";
    const owner = await ethers.getSigner(0);
    const maxSupply = 101;

    // mint up to the maximum supply
    for (let i = 0; i < maxSupply; i++) {
      await contract.connect(owner).safeMint(owner.getAddress(), uri);
    }

    // attempt to mint one more
    await expect(
      contract.connect(owner).safeMint(owner.getAddress(), uri)
    ).to.be.revertedWith("Max supply reached");
  });
});