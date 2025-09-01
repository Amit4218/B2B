import { decode } from "jsonwebtoken";

const googleTokenDecoder = (token) => {
  const value = decode(token);
  return { id: value.sub, email: value.email };
};

export default googleTokenDecoder;
