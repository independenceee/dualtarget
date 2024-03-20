import { SpendingValidator, fromHex, toHex } from "lucid-cardano";
import { encode } from "cbor-x";
import dualTargets from "~/libs";

const readValidator = function (): SpendingValidator {
    const dualTargetValidator = dualTargets.validators.find(function (validator) {
        return validator.title === "contract.dualtarget";
    });

    if (!dualTargetValidator) throw new Error("Dualtarget validator is not found");

    const dualTargetScript: string = toHex(encode(fromHex(dualTargetValidator.compilecode)));

    return {
        type: "PlutusV2",
        script: dualTargetScript,
    };
};

export default readValidator;
