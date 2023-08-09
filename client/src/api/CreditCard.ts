import { post } from "./Network";
import type { ValidateCreditCardResponse } from "../../../src/types/Network";

export const postValidateCreditCard = async (
  creditCardNumber: string
): Promise<ValidateCreditCardResponse> => {
  const response = await post<ValidateCreditCardResponse>(
    "validate_credit_card",
    {
      creditCardNumber,
    }
  );
  if (isValidateCreditCardResponse(response)) {
    return response;
  }
  return { isValid: false, message: "SERVER ERROR", status: "status-critical" };
};

const isValidateCreditCardResponse = (
  response: any
): response is ValidateCreditCardResponse => {
  return response?.isValid !== undefined;
};
