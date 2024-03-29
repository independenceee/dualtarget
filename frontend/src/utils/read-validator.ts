import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import { encode } from "cbor-x";
import { dualTargetCompilecode } from "~/libs";

const readValidator = function (): SpendingValidator {
    // const dualTargetValidator = dualTargets.validators.find(function (validator) {
    //     return validator.title === "contract.dualtarget";
    // });

    // if (!dualTargetValidator) throw new Error("Dualtarget validator is not found");

    const dualTargetScript: string = toHex(encode(fromHex(dualTargetCompilecode)));

    if (!dualTargetCompilecode) throw new Error("Dualtarget compile code is not found");

    return {
        type: "PlutusV2",
        script: dualTargetCompilecode,
    };
};

export default readValidator;
