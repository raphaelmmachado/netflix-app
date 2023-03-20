// function to check if space or enter key was pressed
const enterKeyPressed = (key: string): boolean => {
  if (key === "Enter" || key === "Space") return true;
  else return false;
};
const arrowRightKeyPressed = (key: string): boolean => {
  if (key === "ArrowRight") return true;
  else return false;
};
const arrowRightLeftPressed = (key: string): boolean => {
  if (key === "ArrowLeft") return true;
  else return false;
};
export { arrowRightKeyPressed, arrowRightLeftPressed, enterKeyPressed };
