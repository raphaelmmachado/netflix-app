import { Dispatch, SetStateAction } from "react";

const decrementSliderIndex = (
  setter: Dispatch<SetStateAction<number>>,
  length: number
) => {
  setter((prev) => {
    if (prev - 1 < 0) return length - 1;
    else return prev - 1;
  });
};

const incrementSliderIndex = (
  setter: Dispatch<SetStateAction<number>>,
  length: number
) => {
  setter((prev) => {
    if (prev + 1 >= length) return 0;
    else return prev + 1;
  });
};
export { incrementSliderIndex, decrementSliderIndex };
