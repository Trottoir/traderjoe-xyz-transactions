//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoeRouter02.sol";

contract LPAllocatorTraderJoe {
    IJoeRouter02 public immutable joeRouter;

    constructor(IJoeRouter02 _joeRouter) {
        joeRouter = _joeRouter;
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired
    ) external {
        joeRouter.addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            0,
            0,
            msg.sender,
            block.timestamp
        );
    }

    function swapAvaxVsToken() external payable {
        address[] memory path = new address[](2);
        path[0] = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7; //
        path[1] = 0xb54f16fB19478766A268F172C9480f8da1a7c9C3;
        joeRouter.swapExactAVAXForTokens{value: msg.value}(
            100000000000000000,
            path,
            msg.sender,
            block.timestamp
        );
    }
}
