import React from 'react'
import { Spinner } from 'react-bootstrap'


import css from "../styles/datauser.module.css"

function Datauser(props) {

  return (
    <>
    <div className={css.data_loop}>
       <p className={css.data_no}>{props.no}</p>
       <p className={css.data_nama_lengkap}>{props.nama_lengkap}</p>
       <p className={css.data_username}>{props.username}</p>
       <p className={css.data_password}>{props.password}</p>
       <p className={css.data_status}>{props.status}</p>
       <div className="">
         {props.loading && props.iddelete === props.no ? <div className="d-flex flex-row py-4 px-4">
              <Spinner animation="border" />
            </div> : <button className={css.btn_delete} onClick={props.handledelete}>Delete</button>}
       </div>
     </div>
    </>
  )
}

export default Datauser