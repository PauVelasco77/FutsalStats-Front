import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import { Player } from "../Interfaces/PlayerInterface";
import { State } from "../Interfaces/StateInterface";
import {
  deletePlayerThunk,
  loadPlayersThunk,
} from "../redux/thunks/playersThunk";
import { deleteFeedback } from "../utils/toasty";

const DetailContainer = styled.div`
  margin-top: 50px;
  background: linear-gradient(193.32deg, #14213d 45.83%, #000000 100%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  @media (min-width: 450px) {
    margin-top: 0;
  }
`;

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const players = useSelector((state: State) => state.players);

  useEffect(() => {
    dispatch(loadPlayersThunk());
  }, [dispatch]);

  const player = players.find((player: Player) => player.id === id);

  return (
    <>
      {player ? (
        <DetailContainer>
          <PlayerCard
            player={player}
            actionOnClick={() => {
              dispatch(deletePlayerThunk(player.id));
              deleteFeedback(player.name);
              navigate("/main-page");
            }}
          />
        </DetailContainer>
      ) : (
        <> </>
      )}
    </>
  );
};

export default DetailPage;
