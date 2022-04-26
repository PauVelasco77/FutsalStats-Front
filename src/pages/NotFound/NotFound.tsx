import styled from "styled-components";

const ErrorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  background: #fff;
  height: 100vh;
  color: #fff;
  background: linear-gradient(193.32deg, #14213d 45.83%, #000000 100%);
`;

const NotFound = () => {
  return (
    <ErrorContainer>
      <h1>ERROR 404</h1>
      <h2>PAGE NOT FOUND</h2>
    </ErrorContainer>
  );
};

export default NotFound;
