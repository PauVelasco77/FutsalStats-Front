import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import { Player } from "../../Interfaces/PlayerInterface";
import { State } from "../../Interfaces/StateInterface";
import {
  loadPlayersThunk,
  updatePlayerThunk,
} from "../../redux/thunks/playersThunk";
import { notUpdateFeedback, updateFeedback } from "../../utils/toasty";

const UpdatePlayer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const players = useSelector((state: State) => state.players);

  useEffect(() => {
    dispatch(loadPlayersThunk());
  }, [dispatch]);

  const playerToUpdate = players.find((player: Player) => player.id === id);

  return (
    <>
      {playerToUpdate ? (
        <PlayerForm
          heading={"edita un jugador de tu equipo"}
          goodFeedback={updateFeedback}
          badFeedback={notUpdateFeedback}
          thunkFunction={updatePlayerThunk}
          id={id}
          playerToUpdate={playerToUpdate}
        />
      ) : (
        <> </>
      )}
    </>
  );
};

export default UpdatePlayer;
