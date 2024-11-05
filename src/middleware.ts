import { auth } from "@/auth";

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname!=="/" && req.nextUrl.pathname !== "/sign-in" && req.nextUrl.pathname!="/public_profile") {
        const newUrl = new URL("/sign-in", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }

    if (req.auth && (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/")) {
        const curr = new URL("/dashboard", req.nextUrl.origin);
        return Response.redirect(curr)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}