import { Container } from 'typedi';
// import AuthAPIService from '../services/authApi';

export default class APIController {

    public async GetTokenApi(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            // const authServiceInstance = Container.get(AuthAPIService);
            // const { user, token } = await authServiceInstance.GetTokenApi(username, password);
            res.status(200).json({"success":true , token : "token"});
          } catch(e) {
            res.status(200).json({"success":false,"error" : "403 Authenticated"});
          }
    }
  }