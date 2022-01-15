const passport = require('passport');

module.exports = (app) => {
  app.use('/admin/auth', require('./auth.routes'));

  app.use('/admin/manage/admins',
    passport.authenticate('jwt', { session: false }),
    require('./manage.admin.routes'))
  
  app.use('/admin/manage/users',
    passport.authenticate('jwt', { session: false }),
    require('./manage.user.routes'))
  
  app.use('/admin/manage/classes',
    passport.authenticate('jwt', { session: false }),
    require('./manage.class.routes'));
};
