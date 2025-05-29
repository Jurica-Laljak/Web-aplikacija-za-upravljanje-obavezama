import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { UserDataDto } from "../../../../../shared/auth/UserData.dto";
import { UserDataCore } from "../../../../../shared/auth/UserDataCore";
import { UserData } from "../../../interfaces/auth/UserData";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { signToken } from "./signToken";
import { randomBytes } from "crypto";
import { insert } from "../../../database/queries/insertGeneric";
import { UserDataInsert } from "../../../interfaces/auth/UserDataInsert";
import { ToDoListInsert } from "../../../interfaces/list/ToDoListInsert";
import { ToDoListCore } from "../../../../../shared/list/ToDoListCore";

/**
 * Registers client with given username and password
 * @param req
 * @param res
 * @returns
 */
export async function registrationHandler(
  req: Request<{}, {}, UserDataCore>,
  res: Response<UserDataDto>,
  next: NextFunction
) {
  var username = req.body.username;

  // check if username already exists in database
  try {
    var result = await query<UserData>(
      selectAllConditionally("UserData", ["username", username])
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  if (result.rows.length > 0) {
    // username already exists in database
    next(ErrorEnvelope.userCredentialsError());
    return;
  }

  var password = req.body.password;

  // generate token id and add to database
  const tokenId = randomBytes(16).toString(); //unique token id
  try {
    var sqlRes = await query<{ userid: number }>(
      insert<UserDataInsert>(
        "userdata",
        { username: username, password: password, refreshtokenid: tokenId },
        "userid"
      )
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // insert three lists in the database for the newly
  // created user
  var rows = [...sqlRes];
  var userId = rows[0].userid;
  var lists: ToDoListCore[] = [];

  for (let num = 1; num <= 3; num++) {
    try {
      var sqlRes2 = await query<ToDoListCore>(
        insert<ToDoListInsert>(
          "todolist",
          { userid: userId, name: `Lista ${num}`, serialNumber: num },
          "listid, name"
        )
      );
      var rows2 = [...sqlRes2];
      lists.push(rows2[0]);
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.databaseError());
      return;
    }
  }

  // generate refresh token
  const refreshToken = signToken("refresh", username, userId, tokenId);

  // generate access token
  const accessToken = signToken(
    "access",
    username,
    userId,
    randomBytes(16).toString()
  );

  //append cookies to resonse
  res.send({
    refreshtoken: refreshToken,
    accesstoken: accessToken,
    lists: lists,
  }); //send tokens to client
  return;
}
