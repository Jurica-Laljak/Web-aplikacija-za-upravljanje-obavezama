import { randomBytes } from "crypto";
import { client } from "./database/connectToDb";
import { insert } from "./database/queries/insertGeneric";
import { selectAll } from "./database/queries/selectAll";
import query from "./database/query";
import { UserData } from "./interfaces/auth/UserData";

export async function test() {
  // const byteA = new Uint8Array([72, 101, 108, 108, 111]);
  // const byteB = new Uint8Array([72, 101, 108, 108, 121]);
  // const byteC = new Uint8Array([73, 101, 108, 108, 111]);
  // const byteD = new Uint8Array([72, 102, 108, 108, 121]);
  // var arr: UserData[] = [];
  // arr.push(
  //   {
  //     userid: 1,
  //     password: "easy",
  //     username: "lokic",
  //     refreshtoken: byteA,
  //     refreshtokenid: byteB,
  //   },
  //   {
  //     userid: 2,
  //     password: "difficult",
  //     username: "jukic",
  //     refreshtoken: byteC,
  //     refreshtokenid: byteD,
  //   }
  // );
  // insert<UserData>("UserData", arr);
  // while (!client()) {
  //   console.log(1);
  // }
  // var res = await query<UserData>("SELECT * FROM Userdata WHERE userid = '2'");
  // for (let el of res) {
  //   for (let value of Object.values(el)) {
  //     console.log(value);
  //   }
  // }
}
