import React, { useEffect, useState } from 'react'

import css from "../styles/user.module.css"
// import icon react bawaan
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {postUser, getUser, deleteUser} from "../utils/axios"
import { Spinner } from 'react-bootstrap';
import Datauser from '../components/Datauser';




function User() {

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [loadcreate, setLoadcreate] = useState(false)
  const [loaddel, setLoaddel] = useState(false)
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState('all')
  const [datauser, setDatauser] = useState([])
  const [iddel, setIddel] = useState(null)
  

  // get value
  const handleName = (e) => {setName(e.target.value)}
  const handleUsername = (e) => {setUsername(e.target.value)}
  const handlePassword = (e) => {setPassword(e.target.value)}
  const handleStatus = (e) => {setStatus(e.target.value)}
  const valueSearch = (e) => {
    if(e.key === 'Enter') {
      setSearch(e.target.value)
    }
  }

  const showPassword = () => {
    if (type === "password") {
       setIcon(eye);
       setType("text");
    } else {
       setIcon(eyeOff);
       setType("password");
    }
  };

  const handleCancel = () => {
    setName("");
    setUsername("");
    setPassword("");
    setStatus("");
  }


  const Createuser = async () => {
    try {
      setLoadcreate(true)
      if(!name || !username || !password || !status) 
      return (
        toast.error("Data input must be fullfilled"),
        setLoadcreate(false)
      )
      const response = await postUser({
        namalengkap:name,
        username:username,
        password:password,
        status:status
      })
      // console.log(response.data)
      setSearch("all")
      const result = await getUser(`${search}`)
      setDatauser(result.data.data)
      toast.success(response.data.msg)
      setName("");
      setUsername("");
      setPassword("");
      setStatus("");
      setLoadcreate(false)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.msg)
      setLoadcreate(false)
    }
  }

  const deleteAcc = async (id_user) => {
    try {
      setLoaddel(true)
      setIddel(id_user)
      await deleteUser(id_user)
      const result = await getUser(`${search}`)
      setDatauser(result.data.data)
      toast.success("Delete Success")
      setLoaddel(false)
    } catch (err) {
      console.log(err)
      toast.error("Delete Failed")
      setLoaddel(false)
    }
  }

  useEffect(() => {
    getUser(`${search}`)
    .then((res) => {
      console.log(res.data.data)
      setDatauser(res.data.data)
    })
    .catch((err) => {
      setDatauser([]);
      toast.error("Data not found")
    })
  
  }, [search])
  

  return (
    <>
      <ToastContainer />
      {/* Create User */}
      <div className="d-flex flex-column align-items-center container">
        <div className={css.title_create}>
          <p>Form Create Users</p>
        </div>
        <div className={css.form_data}>
          <div className={css.content_form}>
            <div className={css.form_input}>
              <p>Nama Lengkap</p>
              <p>Username</p>
              <p>Password</p>
              <p>Status</p>
            </div>
            <div className={css.form_input}>
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className={css.form_input_data}>
              <input type="text" value={name} placeholder='please input fullname' onChange={handleName} />
              <input type="text" value={username} placeholder='please input username' onChange={handleUsername} />
              <div className={css.show_password}>
                <input type={type} value={password} placeholder='please input password' onChange={handlePassword} />
                <Icon icon={icon} className="ms-2 my-2" onClick={showPassword} />
              </div>
              <input type="text" value={status} placeholder='please input status' onChange={handleStatus} />
            </div>
          </div>
          {loadcreate 
          ?  <div className="d-flex flex-row py-4 px-4">
              <Spinner animation="border" />
            </div>
          : <>
              <button className={css.create_user_btn} onClick={Createuser}>Create User</button>
              <button className={css.cancel_user_btn} onClick={handleCancel}>Cancel</button>
            </>}
        </div>
      </div>

      {/* Data user */}
      <div className="container my-5 py-5">
        <div>
          <div className="d-flex flex-row align-items-center">
            <div className={css.container_search}>
              <i className={`fa-sharp fa-solid fa-magnifying-glass ${css.icon_style}`}></i>
              <input type='search' onKeyDown={valueSearch} className={css.input_search} placeholder="Search Name" />
            </div>
            <p className={css.noted}>Noted! search all for see all user and you can search user by id</p>
          </div>
          <div className={css.border}></div>
            <div className={css.bar_title}>
              <p className={css.no}>Id</p>
              <p className={css.nama_lengkap}>Nama Lengkap</p>
              <p className={css.username}>Username</p>
              <p className={css.password}>Password</p>
              <p className={css.status}>Status</p>
              <p className={css.action}>Action</p>
            </div>
          <div className={css.border}></div>
        </div>

        {/* component loop */}
          {!datauser[0] ? "Data not found" : datauser.map((e,index) => (
            <Datauser
            key={index}
            no={e.userid}
            nama_lengkap={e.namalengkap}
            username={e.username}
            password={e.password}
            status={e.status}
            handledelete={() => deleteAcc(e.userid)}
            loading={loaddel}
            iddelete={iddel}
            />
          ))}
      </div>
    </>
  )
}

export default User