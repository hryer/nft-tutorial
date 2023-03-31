require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/AC4BdoDYmjfYFrMizLpxcNYON6IpcT42",
      accounts: ["a00b0d5343fcd89d0c672fdf6c271af83266e02a14a5555259b8c3d98b3060dc"],
    },
  }
};
