import { styled } from "@mui/system";
import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  const StyledButton = styled(Box)(({ theme }) => ({
    border: "1px solid gold",
    borderRadius: 5,
    padding: "10px 20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  }));

  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;