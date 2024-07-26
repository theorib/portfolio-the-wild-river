export type PathFunction = (...args: unknown[]) => string;
export type PathCategory = 'sidebarMenu' | 'mainMenu';
export type PathIcon = {
  name: string;
  module: string;
};
export type Path = {
  pathname: string | PathFunction;
  isProtectedRoute: boolean;
  title?: string;
  category?: PathCategory[];
  icon?: PathIcon;
};

const paths = {
  homePage: {
    pathname: '/',
    isProtectedRoute: false,
  },
  signInPage: {
    pathname: '/sign-in',
    isProtectedRoute: false,
  },
  app: {
    pathname: '/app',
    isProtectedRoute: true,
  },
  dashboard: {
    pathname: '/app/dashboard',
    isProtectedRoute: true,
  },
  bookings: {
    pathname: '/app/bookings',
    isProtectedRoute: true,
  },
  cabins: {
    pathname: '/app/cabins',
    isProtectedRoute: true,
  },
  users: {
    pathname: '/app/users',
    isProtectedRoute: true,
  },
  settings: {
    pathname: '/app/settings',
    isProtectedRoute: true,
  },
  login: {
    pathname: '/login',
    isProtectedRoute: false,
  },
  register: {
    pathname: '/register',
    isProtectedRoute: false,
  },
} as const;

// Type assertion to ensure all properties are of type Path
const typedPaths: Record<keyof typeof paths, Path> = paths;
export type Paths = typeof typedPaths;

export default paths;
