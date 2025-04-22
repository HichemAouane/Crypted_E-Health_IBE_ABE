import React from 'react'
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP'
import Goback from '../Commun/Goback'

const Sittingspat = () => {
    const profile_id = localStorage.getItem("profile_id");
    const user_email = localStorage.getItem("user_email");
  return (
    <div>
      <NavbarProfilP typeacc={"Patient"} profile_id={profile_id} user_email={user_email} />
      <Goback />
    </div>
  )
}

export default Sittingspat