import { Address, C, toHex } from "lucid-cardano";

type Props = {
    paymentAddress: C.StakeCredential;
};
const convertPublicKeyToAddress = function ({ paymentAddress }: Props): C.Address {
    const address = C.BaseAddress.new(0, paymentAddress, null!).to_address();
    return address;
};
export default convertPublicKeyToAddress;
