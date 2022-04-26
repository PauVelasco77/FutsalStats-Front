import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlayerForm from "../../components/PlayerForm/PlayerForm";
import { createPlayerThunk } from "../../redux/thunks/playersThunk";
import { createFeedback, notCreateFeedback } from "../../utils/toasty";

const CreatePlayer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <PlayerForm
      heading={"añade un nuevo jugador a tu equipo"}
      goodFeedback={createFeedback}
      badFeedback={notCreateFeedback}
      thunkFunction={createPlayerThunk}
    />
  );
};

export default CreatePlayer;
