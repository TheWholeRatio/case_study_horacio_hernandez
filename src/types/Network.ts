export type NetworkResponse = {
  status: string;
  message: string;
};

export type ValidateCreditCardResponse = NetworkResponse & {
  isValid: boolean;
};
