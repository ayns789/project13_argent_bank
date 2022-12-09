import axios from 'axios';

export class UserService {
  // constructor(String) {
  //   this.baseUrl = 'http://localhost:3001/api/v1/user';
  // }

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
}

//
//
//
//
//
//
//
//
//
//   // get
//   getPictures = () => {
//     axios
//       .get("http://localhost:5000/pictures")
//       .then((res) => dispatch(setPicturesData(res.data)));
//   };
// // post
//   const data = {
//     artist: inputArt.current.value,
//     year: inputYear.current.value,
//     photo: `https://picsum.photos/400/${Math.round(
//       Math.random() * 200 + 300
//     )}`,
//   };

//   axios.post("http://localhost:5000/pictures", data).then(() => {
//     dispatch(addPicture(data));
//     dispatch(getPictures());
//     formRef.current.reset();
//   });

//   // put

//   const data = {
//     artist: artistInput.current.value,
//     year: pic.year,
//     photo: pic.photo,
//   };

//   axios.put("http://localhost:5000/pictures/" + pic.id, data).then(() => {
//     dispatch(editPicture([data.artist, pic.id]));
//   });

//   // delete
//   const handleDelete = () => {
//     axios
//       .delete("http://localhost:5000/pictures/" + id)
//       .then(() => dispatch(deletePicture(id)));
//   };
