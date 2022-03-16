import {
  faFutbol,
  faLocationCrosshairs,
  faPlay,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createPlayerThunk } from "../../redux/thunks/playersThunk";
import blankFields from "../../utils/blankFields";

const FormContainer = styled.div`
  background: linear-gradient(193.32deg, #14213d 45.83%, #000000 100%);
  width: 100%;
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  font-weight: 100;
  line-height: 18px;
  padding: 20px;
  & input {
    height: 30px;
    width: 100vw;
    max-width: 320px;
    padding: 0 10px;
    outline: none;
    text-transform: uppercase;
    :focus-visible {
      border: 2px solid #fca311;
    }
  }
`;

const PlayerNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  & input {
    width: 100vw;
    max-width: 320px;
  }
`;

const DorsalFotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 2px solid #fca311;

  & div {
    display: flex;
    flex-direction: column;
  }
`;

const InputDorsalContainer = styled.div`
  display: flex;
  flex-direction: column;
  & label {
  }
  & input {
    width: 70px;
    max-width: 320px;
    text-align: center;
  }
`;

const InputNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  & label {
    margin-left: ${(props) => props.about ?? "30px"};
  }
  & select {
    margin-left: 10px;
  }
  & input {
    width: 70px;
    max-width: 320px;
    text-align: center;
    margin-left: 10px;
  }
`;

const YellowRedCard = styled.span`
  width: 15px;
  height: 22px;
  position: relative;
  top: 5px;
  background-color: ${(props) => props.color};
`;

const InputFileContainer = styled.div`
  position: relative;
  display: inline-block;
  ::before {
    background-color: #fca311;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    content: "SUBIR ARCHIVO";
    font-size: 12px;
    font-weight: 500;
    color: #000;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  & input {
    opacity: 0;
    width: 100px;
    height: 32px;
    display: inline-block;
  }
`;

const LineInputsContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding-top: 25px;
`;

const RedYellowCardContainer = styled.div`
  display: flex;
`;

interface PlayerFormProps {
  heading: string;
}

const PlayerForm = ({ heading }: PlayerFormProps): JSX.Element => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(blankFields);
  const isInvalid =
    formData.name === "" ||
    formData.number === null ||
    formData.photo === "" ||
    formData.goals === null ||
    formData.assists === null ||
    formData.yellowCards === null ||
    formData.redCards === null ||
    formData.totalMatches === null ||
    formData.position === "";

  const changeData = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: (event.target.files as FileList)[0],
    });
  };

  const submitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createPlayerThunk(formData));
  };

  return (
    <>
      <FormContainer>
        <h2>{heading}</h2>
        <form noValidate autoComplete="off" onSubmit={submitForm}>
          <PlayerNameContainer>
            <label htmlFor="name">NOMBRE DEL JUGADOR</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={changeData}
            />
          </PlayerNameContainer>
          <DorsalFotoContainer>
            <InputDorsalContainer>
              <label htmlFor="number">DORSAL</label>
              <input
                type="number"
                id="number"
                value={formData.number}
                onChange={changeData}
              />
            </InputDorsalContainer>
            <div>
              <label htmlFor="photo">FOTO</label>
              <InputFileContainer>
                <input
                  type="file"
                  id="photo"
                  onChange={changeFile}
                  accept="image/*"
                />
              </InputFileContainer>
            </div>
          </DorsalFotoContainer>
          <LineInputsContainer>
            <InputNumberContainer>
              <label htmlFor="goals">GOLES</label>
              <div>
                <FontAwesomeIcon icon={faFutbol} color="#fca311" />
                <input
                  type="number"
                  id="goals"
                  value={formData.goals}
                  onChange={changeData}
                />
              </div>
            </InputNumberContainer>
            <InputNumberContainer about="27px">
              <label htmlFor="assists">ASSISTS</label>
              <div>
                <FontAwesomeIcon icon={faShareNodes} color="#fca311" />
                <input
                  type="number"
                  id="assists"
                  value={formData.assists}
                  onChange={changeData}
                />
              </div>
            </InputNumberContainer>
          </LineInputsContainer>
          <LineInputsContainer>
            <InputNumberContainer about="27px">
              <label htmlFor="yellowCards">AMARIL</label>
              <RedYellowCardContainer>
                <YellowRedCard color="#faff00"></YellowRedCard>
                <input
                  type="number"
                  id="yellowCards"
                  value={formData.yellowCards}
                  onChange={changeData}
                />
              </RedYellowCardContainer>
            </InputNumberContainer>
            <InputNumberContainer about="25px">
              <label htmlFor="redCards">ROJAS</label>
              <RedYellowCardContainer>
                <YellowRedCard color="#ff0000"></YellowRedCard>
                <input
                  type="number"
                  id="redCards"
                  value={formData.redCards}
                  onChange={changeData}
                />
              </RedYellowCardContainer>
            </InputNumberContainer>
          </LineInputsContainer>
          <LineInputsContainer>
            <InputNumberContainer about="25px">
              <label htmlFor="totalMatches">P. JUGADOS</label>
              <div>
                <FontAwesomeIcon icon={faPlay} color="#fca311" />
                <input
                  type="number"
                  id="totalMatches"
                  value={formData.totalMatches}
                  onChange={changeData}
                />
              </div>
            </InputNumberContainer>
            <InputNumberContainer>
              <label htmlFor="position">POSICIÓN</label>
              <div>
                <FontAwesomeIcon icon={faLocationCrosshairs} color="#fca311" />
                <select
                  id="position"
                  value={formData.position}
                  onChange={changeData}
                >
                  <option value="">POSICION</option>
                  <option value="portero">PORTERO</option>
                  <option value="cierre">CIERRE</option>
                  <option value="alero">ALERO</option>
                  <option value="pívote">PÍVOTE</option>
                </select>
              </div>
            </InputNumberContainer>
          </LineInputsContainer>
          <button type="submit" disabled={isInvalid}>
            CREAR
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default PlayerForm;
