/* eslint-disable camelcase */
// import { NextRequest, NextResponse } from "next/server";
// import { nylas, config } from "@/lib/actions/nylas.actions";
// import { auth } from "@clerk/nextjs";
// import { getUserInfo } from "@/lib/actions/users.actions";
// import User from "@/database/models/user.model";
// import NylasInfo from "@/database/models/nylasinfo.model";
//
// export async function GET(req: NextRequest & { query: { code: string } }) {
//   const code = req.query.code;
//
//   if (!code) {
//     return new NextResponse("No authorization code returned from Nylas", {
//       status: 400,
//     });
//   }
//   try {
//     const response = await nylas.auth.exchangeCodeForToken({
//       clientSecret: config.clientSecret!,
//       clientId: config.clientId ?? "",
//       code,
//       redirectUri: config.redirectUri!, // Add the redirectUri property with the appropriate value
//     });
//
//     const { grantId } = response;
//     const { userId } = auth();
//     const user = await getUserInfo(userId!);
//     if (!user) {
//       return new NextResponse("User not found", { status: 404 });
//     } else {
//       const nylasInfo = await NylasInfo.create({
//         grantId,
//        userId: user._id,
//      });
//      const updatedUser = User.updateOne(
//        { _id: user._id },
//        { nylasInfo: nylasInfo._id }
//      );
//      console.log(updatedUser, nylasInfo, grantId);
//    }
//
//    const nextResponse = new NextResponse(JSON.stringify({ grantId }), {
//      headers: {
//        "Content-Type": "application/json",
//      },
//      status: 200,
//    });
//
//    return nextResponse;
//  } catch (error) {
//    console.error("Error exchanging code for token:", error);
//    const nextResponse = new NextResponse(
//      "Failed to exchange authorization code for token",
//      {
//        status: 500,
//      }
//    );
//
//    return nextResponse;
//  }
// }
//
