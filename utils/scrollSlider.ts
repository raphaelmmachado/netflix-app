import { Dispatch, SetStateAction } from "react";

const decrementSliderIndex = (
  setter: Dispatch<SetStateAction<number>>,
  progressBar: number
) => {
  setter((prev) => {
    if (prev - 1 < 0) return progressBar - 1;
    else return prev - 1;
  });
};

const incrementSliderIndex = (
  setter: Dispatch<SetStateAction<number>>,
  progressBar: number
) => {
  setter((prev) => {
    if (prev + 1 >= progressBar) return 0;
    else return prev + 1;
  });
};
export { incrementSliderIndex, decrementSliderIndex };
