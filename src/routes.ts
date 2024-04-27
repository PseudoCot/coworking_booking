export const AppRoutes = {
  Main: {
    FullPath: '/',
  },
  Coworkings: {
    FullPath: '/coworkings',
  },
  Calendar: {
    FullPath: '/calendar',
  },
  Booking: {
    FullPath: '/coworkings/:id',
    RelativePath: ':id',
  },
  Register: {
    FullPath: '/register',
  },
  Auth: {
    FullPath: '/auth',
  },
  UserAcc: {
    FullPath: '/user',
  },
  NewPassword: {
    FullPath: '/new-password',
  },
  Error: {
    FullPath: '*'
  },
} as const;
