import { Token } from "../Interfaces/TokenInterface";
import { LoggedUser } from "../Interfaces/UserInterface";

const url: any = process.env.REACT_APP_API_RENDER;

export const loginUser = async (loggedUser: LoggedUser): Promise<any> => {
  const response = await fetch(`${url}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loggedUser),
  });

  const token: Token = await response.json();

  localStorage.setItem("token", token.token);
  return token;
};
