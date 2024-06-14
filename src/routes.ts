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
  CoworkingEditing: {
    FullPath: '/coworkings/:id/editing',
    RelativePath: 'editing',
  },
  Register: {
    FullPath: '/register',
  },
  Login: {
    FullPath: '/login',
  },
  User: {
    FullPath: '/user',
  },
  ChangePassword: {
    FullPath: '/change-password',
  },
  PasswordRecovery: {
    FullPath: '/password-recovery',
  },
  Error: {
    FullPath: '*'
  },
} as const;
