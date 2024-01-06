import { useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import cardImg from "../../logo.svg";
import Unicon from "../../Unicon_soft.png";
import "./styled.css";

function SignIn() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  console.log(phone);
  console.log(password);

  const HandleLogin = async () => {

    try {
      const response = await fetch('http://unic2.pythonanywhere.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          password: password,
        }),
      });

      const dataValue = await response.json();
        dataValue.token ? (localStorage.setItem("token", JSON.stringify(dataValue.token))):(window.location.href = "/signin");
      localStorage.setItem("tovar", JSON.stringify(dataValue));
        dataValue.token ? (window.location.href = "/"):(window.location.href = "/signin")
        console.log(dataValue)
    } catch (error) {
      console.error('Xatolik:', error.message);
    }
  };

  return (
    <Wrapper className="Wrapper  animate__animated animate__fadeIn">
      <PaperStyled className="animate__animated animate__bounceInRight">
        <RowStyled >
          <img src={Unicon} />
        </RowStyled>
        <RowLeftStyled>
            <Typography
              style={{
                marginTop: "40px",
                marginBottom: "30px",
                textShadow: "0px 0px 2px blue",
                textAlign: "center",
              }}
              variant="h4"
            >
              Tizimga kirish
            </Typography>
            <TextField
              style={{ marginBottom: "20px" }}
              fullWidth
              id="outlined-basic"
              type="text"
              label="Telefon raqami"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              style={{ marginBottom: "20px" }}
              fullWidth
              id="outlined-basic"
              type="password"
              label="Parol:"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton onClick={HandleLogin}  variant="outlined" type="submit">
              Kirish
            </StyledButton>
        </RowLeftStyled>
      </PaperStyled>
    </Wrapper>
  );
}

export default SignIn;

const Wrapper = styled.div`
  max-width: 100%;
  height: 100vh;
  background-color: #C0C0C0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PaperStyled = styled(Paper)`
  width: 800px;
  height: 450px;
  display: flex;
  overflow: hidden;
`;
const RowStyled = styled.div`
  width: 800px;
  height: 100%;
  padding-left: 50px;
  img {

    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: skew(-10deg, 0deg  );
    margin-left: -40px;
  }
`;
const RowLeftStyled = styled.div`
  padding: 30px;
`;

export const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    border: 2px solid #3545a3;
    display: block;
    width: 100%;
    padding: 8px 25px;
    border-radius: 10px;
    font-family: "Inter", sans-serif;
    font-family: "Open Sans", sans-serif;
    font-family: "Padauk", sans-serif;
    font-weight: 800;
    &:hover {
      color: white;
      background: #2a3a96;
    }
  }
`;
