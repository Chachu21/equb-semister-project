import bcrypt from "bcryptjs";
import { config } from "dotenv";
import client from "../utils/client.js";
import { setCookie } from "../utils/cookies.js";
import { generateJWT } from "../utils/JWT.js";
config();
export const signup = async (req, res) => {
  try {
    const { full_name, email, phone_no, password, agreeTerms } =
      req.body.input.object;

    console.log(req.body);
    if (!phone_no || !password || !full_name || !email || !agreeTerms) {
      return res.status(400).json({
        message: "Please provide all the details",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await client.request(`mutation {
      insert_users_one(object: {
        full_name: "${full_name}",
        email: "${email}",
        phone_no: "${phone_no}",
        password: "${hashedPassword}"
        agreeTerms: "${agreeTerms}"
      }) {
        id
        full_name
        email
        phone_no
      }
    }`);

    const user = data.insert_users_one;

    if (!user) {
      return res.status(400).json({ message: "Something went wrong" });
    }

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
      id: user.id,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: `${error}`,
    });
  }
};
