
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Register(){
    const[user,setUser] = useState<string>('')
    const navigate = useNavigate();
       

   

    const registerUser=()=>{
        if(user.trim()===''){
            alert(`please enter a valid username`)
            return
        }
        localStorage.setItem("user-name",user)
        navigate('/chat')

    }


    return(
        <>

        <input type="text" placeholder="type Name" value={user} onChange={(e)=>setUser(e.target.value)} />
        <button onClick={registerUser}>Register</button>
        </>
    )
}
export default Register