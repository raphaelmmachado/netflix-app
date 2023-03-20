// function to change increment media slider index
import { Dispatch, SetStateAction } from "react";

const decrementIndex = (
  setter: Dispatch<SetStateAction<number>>,
  length: number
) => {
  setter((prev) => {
    if (prev - 1 < 0) return length - 1;
    else return prev - 1;
  });
};

const incrementIndex = (
  setter: Dispatch<SetStateAction<number>>,
  length: number
) => {
  setter((prev) => {
    if (prev + 1 >= length) return 0;
    else return prev + 1;
  });
};
export { incrementIndex, decrementIndex };
