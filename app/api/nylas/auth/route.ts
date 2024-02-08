// import { nylas, AuthConfig } from "@/lib/actions/nylas.actions";
// import { currentUser } from "@clerk/nextjs";
// import { NextRequest, NextResponse } from "next/server";
//
// export async function GET(req: NextRequest) {
//   try {
//     const currentUserResult = await currentUser();
//     if (currentUserResult) {
//       const authUrl = nylas.auth.urlForOAuth2({
//         clientId: AuthConfig.clientId,
//         redirectUri: AuthConfig.redirectUri,
//         loginHint: currentUserResult.emailAddresses[0].emailAddress,
//         scope: ["email"],
//       });
//       console.log(authUrl);
//       return NextResponse.redirect(authUrl);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
