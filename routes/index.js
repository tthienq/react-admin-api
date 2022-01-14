

module.exports = (app) => {
  app.use('/admin/manage/admins', require('./manage.admin.routes'))
  app.use('/admin/manage/users', require('./manage.user.routes'))
  app.use('/admin/manage/classes', require('./manage.class.routes'));
  // app.use('/admin/auth', authRouter);
  // app.use('/admin/manage/users', passport.authenticate('jwt', { session: false }), mangeUserRouter);
  // app.use(
  //   '/admin/manage/boards',
  //   passport.authenticate('jwt', { session: false }),
  //   mangeBoardRouter,
  // );
};
