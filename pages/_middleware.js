import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(process.env.JWT_SECRET);
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  console.log("initial token", token);
  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth")) {
    console.log("includes api auth", token);
    return NextResponse.next();
  }
  if (token && pathname.includes("/login")) {
    console.log("token and includes login path", token);
    return NextResponse.redirect("/");
  }
  if (!token && pathname !== "/login") {
    console.log("no token", token);
    return NextResponse.redirect("/login");
  }
}
