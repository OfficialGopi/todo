import { ObjectId } from "mongoose";
import { env } from "../../../env";
import { cookieOptions } from "../../constants/cookies.constants";
import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { UserModel } from "../../models/user";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";
import { createTransport } from "../../utils/mailtrap";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthControllers {
  public signup = AsyncHandler(async (req, res) => {
    // GET REQ BODY FROM VALIDATED BODY
    const { name, email, username, password, confirmPassword } = req.body;

    if (String(password) !== String(confirmPassword)) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Passwords donot match");
    }

    const user = new UserModel({
      name,
      email,
      username,
      password,
    });

    const { hashedToken, unHashedToken, tokenExpiry } =
      user.generateEmailVerificationToken();

    user.emailVerificationExpiry = tokenExpiry;
    user.emailVerificationToken = hashedToken;

    await user.save();

    const transporter = createTransport();

    const mailOption = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email ", // Subject line
      html: `

      <h1>Please copy the following token : </h1>
      <br/>
      <h3>${unHashedToken}</h3>
      <button onclick="copyFunc()">Copy</button>
      <script>
       function copyFunc(){
       navigator.clipboard.writeText(${unHashedToken});
  		alert("Copied the token")}
      </script>
      `,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          {},
          "User Created Successfully",
        ),
      );
  });

  public verifyEmail = AsyncHandler(async (req, res) => {
    const { token } = req.params;

    const hashedToken = new UserModel().generateHashOfToken(token);

    console.log(hashedToken);

    const user = await UserModel.findOne({
      emailVerificationToken: hashedToken,
    });

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    if (Date.parse(String(user.emailVerificationExpiry)) < Date.now()) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpiry = undefined;

      await user.save();
      throw new ApiError(STATUS_CODE.FORBIDDEN, "Token Expired");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          {},
          "User Email Verified Successfully",
        ),
      );
  });

  public login = AsyncHandler(async (req, res) => {
    const { credentials, password } = req.body;

    const user = await UserModel.findOne({
      $or: [
        {
          email: credentials,
        },
        {
          username: credentials,
        },
      ],
    }).select(
      "-refreshToken -emailVerificationToken -emailVerificationExpiry ",
    );
    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid Credentials");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("access-token", accessToken, cookieOptions);
    res.cookie("refresh-token", refreshToken, cookieOptions);

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          tokens: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
          user: {
            ...user.toJSON(),
            password: undefined,
            refreshToken: undefined,
          },
        },
        "User Logged In Successfully",
      ),
    );
  });

  public refreshAccessToken = AsyncHandler(async (req, res) => {
    const accessToken =
      (req.cookies["access-token"] as string)?.trim() ??
      (req.headers.Authorization as string | undefined)?.trim().split(" ")[1];
    const refreshToken =
      (req.cookies["refresh-token"] as string)?.trim() ??
      (req.body.refreshToken as string)?.split(" ")[1]?.trim();

    if (!accessToken || !refreshToken) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const decodedToken: JwtPayload = jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
    ) as JwtPayload;

    if (
      !decodedToken ||
      !decodedToken._id ||
      (decodedToken.exp && decodedToken.exp < Date.now() / 1000)
    ) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = await UserModel.findById(decodedToken._id);

    if (!user || user._id.toString() !== decodedToken._id.toString()) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("access-token", newAccessToken, cookieOptions);
    res.cookie("refresh-token", newRefreshToken, cookieOptions);
    return res.status(STATUS_CODE.RESOURSE_CREATED).json(
      new ApiResponse(
        STATUS_CODE.RESOURSE_CREATED,
        {
          tokens: {
            accessToken,
            refreshToken,
          },
        },
        "Tokens Refreshed",
      ),
    );
  });

  public logout = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;

    await UserModel.findByIdAndUpdate(_id, {
      $unset: {
        refreshToken: 1,
      },
    });

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Logout successful"));
  });

  public resendEmailVerification = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const user = await UserModel.findOne(_id as unknown as ObjectId);

    if (!user) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email already verified");
    }

    const { hashedToken, unHashedToken, tokenExpiry } =
      user.generateEmailVerificationToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save();

    const transporter = createTransport();

    const mailOption = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email ", // Subject line
      html: `
      <h1>Please copy the following token : </h1>
      <br/>
      <h3>${unHashedToken}</h3>
      <button onclick="copyFunc()">Copy</button>
      <script>
       function copyFunc(){
       navigator.clipboard.writeText(${unHashedToken});
  		alert("Copied the token")}
      </script>
      `,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(200)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Email sent successfully"));
  });

  public changeCurrentPassword = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Missing password input");
    }

    if (!confirmNewPassword || confirmNewPassword !== newPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid password input");
    }

    const user = await UserModel.findOne(_id as unknown as ObjectId);

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Invalid Credentials");
    }

    user.password = newPassword;
    await user.save();

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Password changed successfully"),
      );
  });

  public forgotPasswordRequest = AsyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Email is required");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const { hashedToken, unHashedToken, tokenExpiry } =
      user.generateEmailVerificationToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;

    await user.save();

    const transporter = createTransport();

    const mailOption = {
      from: env.MAILTRAP_SENDER_EMAIL,
      to: user.email,
      subject: "Reset your password",
      html: `
        <h1>Password Reset Request</h1>
        <p>Please copy the following token to reset your password:</p>
        <br/>
        <h3>${unHashedToken}</h3>
        <p>This token will expire in 20 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOption);

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          {},
          "Password reset email sent successfully",
        ),
      );
  });

  public resetForgottenPassword = AsyncHandler(async (req, res) => {
    const { token, newPassword, confirmNewPassword } = req.body;

    if (!token || !newPassword || !confirmNewPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Missing required fields");
    }

    if (newPassword !== confirmNewPassword) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Passwords do not match");
    }

    const hashedToken = new UserModel().generateHashOfToken(token);

    const user = await UserModel.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid or expired token");
    }

    user.password = newPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          {},
          "Password reset successfully",
        ),
      );
  });
}

export { AuthControllers };
