
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                style={{
                    padding: "0.5rem",
                    width: "250px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "1rem",
                }}
            />
            <button
                onClick={registerUser}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                }}
            >
                Register
            </button>
        </div>
    )
}
export default Register