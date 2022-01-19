import { BigNumberish } from "ethers";

declare function createGetGasPrice(speed: string): (): Promise<BigNumberish>;
declare function mixinGetGasPrice: (klass: any): void;
