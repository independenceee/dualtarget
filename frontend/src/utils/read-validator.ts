import { SpendingValidator } from "lucid-cardano";
import { dualTargetCompilecode } from "~/libs";

const readValidator = function (): SpendingValidator {
    if (!dualTargetCompilecode) throw new Error("Dualtarget compile code is not found");
    return { type: "PlutusV2", script: dualTargetCompilecode };
};

export default readValidator;
