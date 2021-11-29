'use strict';

const hardhat = require('hardhat')
const gasPrice = require('..');

describe('gasnow providers', () => {
  it('should fetch gasPrices', async () => {
    const getGasPrice = await gasPrice.createGetGasPrice('rapid');
    await getGasPrice();
  });
})
