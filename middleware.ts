import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { Request, Response, NextFunction } from "express";
import UserModel from "./database/models/user.model";
import { connectToDb } from "./database/db"; // Import the missing mockDb module
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up(.*)",
    "/auth/callback",
    "/api/trpc/[trpc]",
    "/api/webhook(.*)",
    "/nylas(.*)",
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});
//async function isAuthenticated(
//  req: Request,
//  res: Response,
//  next: NextFunction
//) {
//  if (!req.headers.authorization) {
//    return res.status(401).send("Unauthorized");
//  }
//  const { userId } = auth();
//  // Query our mock db to retrieve the stored user access token
//  const user = await NylasInfo.findOne({ id: userId });
//
//  if (!user) {
//    return res.status(401).send("Unauthorized");
//  }
//
//  // Add the user to the response locals
//  res.locals.user = user;
//
//  next();
//}

//export { isAuthenticated }; // Export isAuthenticated as a named export
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
