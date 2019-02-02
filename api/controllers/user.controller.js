import User from '../models/user';
import sanitizeHtml from 'sanitize-html';

function sanitize(text){
  return sanitizeHtml(text);
}

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function addUser(req, res) {
  // console.log(req.body);
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(403).send({ error: "username and password are not provided"});
    return;
  } 

  // Let's sanitize inputs
  const user = {
    userName: sanitize(userName),
    password: sanitize(password)
  }
  const newUser = new User(user);

  newUser.save((err, doc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log(saved);
      const { userName } = doc || {};
      const isAutherised = userName ? true : false;
      res.json({ isAutherised, userName });
    }
  });
}

/**
 * authenticate User
 * @param req
 * @param res
 * @returns void
 */
export function authenticateUser(req, res) {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(403).send({ error: "username and password are not provided" });
    return;
  } 
  User.findOne({ userName, password })
    .exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    const { userName, dateAdded } = doc || {};
    const isAutherised = userName ? true : false;
    res.json({ isAutherised, userName, dateAdded });
  });
}


/**
 * check User Existance
 * @param req
 * @param res
 * @returns void
 */
export function checkUserExistance(req, res) {
  const {userName} = req.body;
  if (!userName) {
    res.status(403).send({ error: "username not provided" });
    return;
  }
  User.findOne({ userName })
    .exec((err, doc) => {
      if (err) {
        res.status(500).send(err);
      }
      const { userName, dateAdded } = doc || {};
      const isAvailable = userName ? false : true;
      res.json({ isAvailable, userName, dateAdded });
    }); 
}
