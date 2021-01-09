import React, { useEffect, useState } from "react";

const UserProfile = () => {

    const [email, setEmail] = useState("");

    if(window.innerWidth > 500){

        return (
            <>
                <div>User Profile Desktop</div>
            
            </>
        )

    }else{
          
        return (
            <div>User Profile Mobile</div>
        )

    }
}

export default UserProfile;