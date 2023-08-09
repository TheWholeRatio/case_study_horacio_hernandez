import { Box, Button, Heading, TextInput, Text, Spinner } from "grommet";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { postValidateCreditCard } from "../../api/CreditCard";

import type { ValidateCreditCardResponse } from "../../../../src/types/Network";

const DemoFormPage = () => {
  const [input, setInput] = useState("");

  const [response, setResponse] = useState<ValidateCreditCardResponse | null>();
  const [isLoading, setIsLoading] = useState(false);

  const debounceDelay = 500; // give user time to input before valdiating
  const debouncedInput = useDebounce(input, debounceDelay);

  useEffect(() => {
    const validateCreditCard = async () => {
      setIsLoading(true);

      if (debouncedInput.length > 0) {
        const result = await postValidateCreditCard(debouncedInput);
        setResponse(result);
      }
      setIsLoading(false);
    };
    validateCreditCard();
  }, [debouncedInput]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.replace(/\D/g, ""));
  };

  // confirmed react docs safe (typescript rules)✔ https://react.dev/learn/conditional-rendering#logical-and-operator-
  const messageElement = response?.message && debouncedInput.length > 0 && (
    <Box>
      <Text color={response.status}>{response.message}</Text>
    </Box>
  );

  // confirmed react docs safe ✔
  const loadingSpinner = isLoading && (
    <Box pad="small">
      <Spinner color="accent-1" />
    </Box>
  );

  return (
    <Box align="center" justify="center" fill="vertical" background={"dark-1"}>
      <Box
        gap="small"
        background="dark-2"
        pad="medium"
        round
        elevation="xsmall"
      >
        <Box border={{ side: "bottom", color: "accent-1" }}>
          <Heading margin="none" textAlign="start">
            Credit Card Form
          </Heading>
        </Box>

        <Box direction="row" width={"medium"} align="center">
          <TextInput
            placeholder="Enter your Credit Card #"
            onChange={onInputChange}
            value={input}
          />
          {loadingSpinner}
        </Box>

        {messageElement}
        <Button title="Submit" label="Submit" disabled={!response?.isValid} />
      </Box>
    </Box>
  );
};

export default DemoFormPage;
