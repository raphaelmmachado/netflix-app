// function to check if space or enter key was pressed
const enterKeyPressed = (key: string): boolean => {
  if (key === "Enter" || key === "Space") return true;
  else return false;
};
export default enterKeyPressed;
