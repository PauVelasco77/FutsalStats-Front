import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlayerForm from "../components/PlayerForm/PlayerForm";
import { Player } from "../Interfaces/PlayerInterface";
import { State } from "../Interfaces/StateInterface";
import {
  loadPlayersThunk,
  updatePlayerThunk,
} from "../redux/thunks/playersThunk";
import { createFeedback, notCreateFeedback } from "../utils/toasty";

const UpdatePlayer = () => {
  const { id } = useParams();
  const players = useSelector((state: State) => state.players);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlayersThunk());
  }, [dispatch]);

  const playerToUpdate = players.find((player: Player) => player.id === id);

  return (
    <PlayerForm
      heading={"añade un nuevo jugador a tu equipo"}
      goodFeedback={createFeedback}
      badFeedback={notCreateFeedback}
      thunkFunction={updatePlayerThunk}
      id={id}
      playerToUpdate={playerToUpdate}
    />
  );
};

export default UpdatePlayer;
