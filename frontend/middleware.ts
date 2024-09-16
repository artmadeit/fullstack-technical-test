export { auth as middleware } from "@/auth"

export const config = {
    matcher: [
        // Protect only paths that start with /portal
        '/portal/:path*',
    ],
};