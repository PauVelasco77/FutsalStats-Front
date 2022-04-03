import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import GenericButton from "../components/GenericButton/GenericButton";
import HeaderLoginRegister from "../components/HeaderLoginRegister/HeaderLoginRegister";
import { registerBlankFields } from "../utils/blankFields";
import { registerUser } from "../utils/registerUserFetch";
import { newRegisterFeedback, wrongRegisterFeedback } from "../utils/toasty";

const LoginContainer = styled.section`
  margin-top: 50px;
  background: linear-gradient(193.32deg, #14213d 45.83%, #000000 100%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: 100;
  line-height: 18px;
  @media (min-width: 450px) {
    margin-top: 0;
  }

  & form {
    justify-content: space-around;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & label {
    color: #fff;
  }

  & div {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 320px;

    & div {
      margin-top: 30px;
    }
  }

  & button {
    margin-top: 30px;
  }

  & input {
    height: 30px;
    width: 100%;
    :focus-visible {
      outline: none;
      border: 2px solid #fca311;
    }
  }

  & p {
    color: #fff;
    margin-top: 70px;

    & a {
      color: #fca311;
      font-weight: 800;
      text-decoration: none;
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(registerBlankFields);

  const changeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const isInvalid =
    formData.username === "" ||
    formData.password === "" ||
    formData.teamName === "";

  const submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = formData;

    setFormData(registerBlankFields);
    const isRegistered = await registerUser(data);

    if (!isRegistered.error) {
      newRegisterFeedback();
      navigate("/login");
    } else {
      wrongRegisterFeedback();
    }
  };

  return (
    <>
      <LoginContainer>
        <HeaderLoginRegister />
        <form noValidate autoComplete="off" onSubmit={submitForm}>
          <div>
            <div>
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                onChange={changeData}
                value={formData.username}
              />
            </div>
            <div>
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                type="password"
                onChange={changeData}
                value={formData.password}
              />
            </div>
            <div>
              <label htmlFor="teamName">NOMBRE DEL EQUIPO</label>
              <input
                id="teamName"
                type="text"
                onChange={changeData}
                value={formData.teamName}
              />
            </div>
          </div>
          <GenericButton text="REGISTER" disabled={isInvalid} />
        </form>
        <p>
          ya estás registrado? logueate <Link to="/login">aquí</Link>
        </p>
      </LoginContainer>
    </>
  );
};

export default Register;
