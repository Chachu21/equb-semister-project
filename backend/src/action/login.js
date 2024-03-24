import bcrypt from "bcryptjs";
import { setCookie } from "../utils/cookies.js";
import client from "../utils/client.js";
import { generateJWT } from "../utils/JWT.js";

export const login = async (req, res) => {
  try {
    console.log("Login called with body:", req.body);
    // Get input from Hasura Action query variables payload
    const { email, password } = req.body.input.credential;
    const data = await client.request(
      `query getUserByEmail($email: String!){
        users(where: {email: {_eq: $email}}) {
          id
          full_name
          email
          password
        }
      }
    `,
      {
        // pass the email as a variable to the query
        email,
      }
    );

    const user = data.users[0];
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateJWT({
      defaultRole: "user",
      allowedRoles: ["user"],
      otherClaims: {
        "X-Hasura-User-Id": user.id,
      },
    });

    setCookie(res, "hasura-user-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return res.json({
      token,
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      message: "successful login",
    });
  } catch (e) {
    console.log("Got error at login", e);
    return res.status(400).json({ message: `${e}` });
  }
};

const findUserByEmail = `
query MyQuery($email: String!) {
  users(where: { email: { _eq: $email } }) {
    id
  }
}
`;
