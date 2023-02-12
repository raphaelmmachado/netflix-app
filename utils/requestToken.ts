import axios from "axios";
import { GuestSessionIDRequest, TokenRequest } from "../typing";
import { getSecret } from "./getSecret";
import { setCookie } from "nookies";

const requestToken = async () => {
  try {
    const url =
      "https://api.themoviedb.org/3/authentication/token/new?api_key=";
    const { secret } = await getSecret().then((res) => res);
    const { data }: TokenRequest = await axios.get(`${url}${secret}`);
  } catch (err) {
    console.error("failed to request token");
  }
};

const getGuestSesssionID = async () => {
  try {
    const { secret } = await getSecret().then((res) => res);

    const url =
      "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=";
    const { data }: GuestSessionIDRequest = await axios.get(`${url}${secret}`);
    return data;
  } catch (err) {
    console.error("failed to request token");
  }
};

const storeSessionId = (ctx: any, sessionId: string) => {
  setCookie(ctx, "sessionId", sessionId, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    //set to false in client-side
    httpOnly: false,
    sameSite: "strict",
  });
};
export { getGuestSesssionID, storeSessionId };
