"use strict";

const axios = require("axios");
const { BigNumber } = require("@ethersproject/bignumber");

const mapValues = (o, fn) => {
  return Object.keys(o).reduce((r, v) => {
    r[v] = fn(o[v], v, o);
    return r;
  }, {});
};

exports.fetchGasPrices = async () => {
  const {
    data: { data: gasPrices },
  } = await axios.get("https://etherchain.org/api/gasnow");
  return mapValues(gasPrices, (v) =>
    !(v % 1) ? BigNumber.from(String(v)) : BigNumber.from("0")
  );
};

exports.cache = {};

exports.createGetGasPrice = (level = "rapid") =>
  async function () {
    try {
      const result = await exports.fetchGasPrices();
      exports.cache[level] = result[level];
      return result[level];
    } catch (e) {
      return (
        exports.cache[level] ||
        (() => {
          throw e;
        })()
      );
    }
  };

exports.mixinGetGasPrice = (o, level) => {
  o.getGasPrice = exports.createGetGasPrice(level);
  return o;
};
