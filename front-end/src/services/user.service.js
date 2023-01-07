import axios from 'axios';

export class UserService {
  // baseUrl = () => {
  //   return 'http://localhost:3001/api/v1/user';
  // };

  login = (email, pwd) => {
    const baseUrl = 'http://localhost:3001/api/v1/user';
    return axios.post(`${baseUrl}/login`, {
      email: email,
      password: pwd,
    });
  };

  getProfile = (token) => {
    const baseUrl = 'http://localhost:3001/api/v1/user';
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer ' + token,
    };

    return axios
      .get(`${baseUrl}/profile`, {
        headers,
      })
      .then(function (response) {
        return response.data.body;
      })
      .catch((err) => console.log(err));
  };

  editProfile = (info) => {
    console.log(info);
    const baseUrl = 'http://localhost:3001/api/v1/user';
    const headers = {
      accept: 'application/json',
      Authorization: 'Bearer ' + info.token,
    };

    return axios
      .put(
        `${baseUrl}/profile`,
        { firstName: info.firstName, lastName: info.lastName },
        { headers }
      )
      .then(function (response) {
        return response.data.body;
      })
      .catch((err) => console.log(err));
  };
}
