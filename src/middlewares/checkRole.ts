export default (requiredRole) => {
  return (req, res, next) => {
    if(requiredRole.includes(req.session.user.role) == false) {
      return res.status(401).render('./admin/admin-401');
    } else {
      return next();
    }
  }
}