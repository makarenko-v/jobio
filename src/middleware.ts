import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default clerkMiddleware();

// const isProtectedRoute = createRouteMatcher(['/jobs(.*)', '/stats']);
//
// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) {
//     auth().protect();
//   }
// });