import { C, toHex } from "lucid-cardano";

const convertAddressToPublicKey = function (address: string): string {
    const publicKey: C.Ed25519KeyHash | undefined = C.BaseAddress.from_address(C.Address.from_bech32(address))
        ?.payment_cred()
        .to_keyhash() as C.Ed25519KeyHash;
    return toHex(publicKey?.to_bytes()!);
};

export default convertAddressToPublicKey;
