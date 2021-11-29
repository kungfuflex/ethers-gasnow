# ethers-gasnow

Use this module to decorate your ethers.js Provider with a getGasPrice function that will fetch from gasnow. By default it will use the "rapid" setting.

Use like so:

```js

const ethers = require('ethers');

const gasnow = require('ethers-gasnow');

const signer = new ethers.providers.JsonRpcProvider('http://localhost:8545').getSigner(0);

gasnow.mixinGetGasPrice(signer.provider, 'rapid');

// or you can modify the runtime so that all providers get this gasPrice

gasnow.mixinGetGasPrice(ethers.providers.BaseProvider.prototype, 'rapid');

// now all of your transactions will use the gasPrice from gasnow

```
