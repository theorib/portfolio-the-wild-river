type PathFunction = (arg: string) => string;

type Path = {
  path: string | PathFunction;
  isProtectedRoute: boolean;
};

const paths = {
  homePage: {
    path: '/',
    isProtectedRoute: false,
  },
  signInPage: {
    path: '/sign-in',
    isProtectedRoute: false,
  },
  app: {
    path: '/app',
    isProtectedRoute: true,
  },
  dashboard: {
    path: '/app/dashboard',
    isProtectedRoute: true,
  },
  bookings: {
    path: '/app/bookings',
    isProtectedRoute: true,
  },
  cabins: {
    path: '/app/cabins',
    isProtectedRoute: true,
  },
  users: {
    path: '/app/users',
    isProtectedRoute: true,
  },
  settings: {
    path: '/app/settings',
    isProtectedRoute: true,
  },
  login: {
    path: '/login',
    isProtectedRoute: false,
  },
  register: {
    path: '/register',
    isProtectedRoute: false,
  },
} as const;

// Type assertion to ensure all properties are of type Path
const typedPaths: Record<keyof typeof paths, Path> = paths;

export default paths;
