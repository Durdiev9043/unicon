import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import styled from "styled-components";
import Unicon from "../../Unicon_soft.png";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const requestData = {
                email: email,
                password: password
            };

            const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                const response = await fetch('http://unic2staffbot.us.uz/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token, // Include CSRF token in the request headers
                },
                body: JSON.stringify(requestData),
            });

            const dataValue = await response.json();
            if (response.ok) {
                localStorage.setItem("token", JSON.stringify(dataValue.token));
                window.location.href = "/";
            } else {
                console.error('Failed to log in:', dataValue);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };



    return (
        <Wrapper>
            <PaperStyled>
                <RowStyled>
                    <img src={Unicon} alt="logo" />
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
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        style={{ marginBottom: "20px" }}
                        fullWidth
                        id="password"
                        type="password"
                        label="Parol"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton onClick={handleLogin} variant="outlined">
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
    transform: skew(-10deg, 0deg);
    margin-left: -40px;
  }
`;

const RowLeftStyled = styled.div`
  padding: 30px;
`;

const StyledButton = styled(Button)`
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
