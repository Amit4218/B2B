import React from "react";
import checkUserSession from "../hooks/checkIsUserAuthHook";

function Profile() {
  checkUserSession();

  return <div>Profile</div>;
}

export default Profile;
