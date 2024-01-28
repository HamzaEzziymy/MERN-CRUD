import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

function Users() {
  // declare the consts

  // api in my LAN
  // const api = "http://192.168.137.1:8080";
  // api in my lapot
  const api = "http://localhost:8080";

  const [label, setLabel] = useState("CREATE NEW USER")
  const [users, setUsers] = useState([]);
  const [currentID, setCurrentID] = useState("");
  const name = useRef("");
  const age = useRef("");
  const email = useRef("");

  // get users from server using axiot
  const getUsersFunc = async () => {
    await axios.get(`${api}/users`)
    .then(res =>  setUsers(res.data))
    .catch(error => console.log(error));
  }

  // func post users on server using axiot
  const submit = async(e) => {
    let user = {name:name.current.value, age:age.current.value, email:email.current.value}
    e.preventDefault()
    e.target.reset()
    if(label === "CREATE NEW USER"){
      await axios.post(`${api}/createUser`, user)
      .then()
      .catch(error => console.log(error));
    }else{
      // setLabel("CREATE NEW USER");
      await axios.put(`${api}/updateUser`,{_id: currentID,user: user})
      .then()
      .catch(error => console.log(error));
      console.log("alawi habib galbi...");
    }
  }

  // set data in form for modify
  const handleModify = async (user) => {
    setLabel("UPDATE USER")
    name.current.value = user.name;
    age.current.value = user.age;
    email.current.value = user.email;
    setCurrentID(user._id)
  }
  // delete user by axios
  const handleDelete = async (id) => {
    if(window.confirm("do you wana realy to delete this user? ")){
      await axios.delete(`${api}/deleteUser`,{ data: { _id: id } })
      .then()
      .catch(error => console.log(error));
    }
  }

  // appleqe useEffect on getusers func
  useEffect(() => {
    getUsersFunc()
  },[users])

  // runder the app
  return (
  <>
    <div className='form'>
      <form  onSubmit={e=>submit(e)}>
      <h1>{label}</h1>
        <input required type='text' ref={name} placeholder='name'/><br/>
        <input required type='number' ref={age} placeholder='Age'/><br/>
        <input required type='email' ref={email} placeholder='Email'/><br/>
        <button type='submit'>{label}</button>
      </form>
    </div>
    <div className="user-info">
      <div>
        {users.map((user,i) => (
          <ul key={i}>
            <li><p>Name: </p>{user.name}</li>
            <li><p>Age: </p>{user.age}</li>
            <li><p>Email: </p>{user.email}</li>
            <div>
              <button className='deletebtn' onClick={()=>handleDelete(user._id)}>Delete</button>
              <button className='modifybtn' onClick={()=>handleModify(user)}>Update</button>
            </div>
          </ul>
        ))
        }
      </div>
    </div>
  </>
  );
}

export default Users;
