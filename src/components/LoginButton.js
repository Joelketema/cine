import {GoogleLogin} from 'react-google-login' 
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
import { useState } from 'react';
const clientId = "974115998029-jql122nkk10v1vm2bvcir9l0ifa5bh5j.apps.googleusercontent.com";

const LoginButton = ({text}) => {

    const [user, setUser] = useState({})
    
    const navigate = useNavigate();
    const onSuccess = (res) => {
        if (text === "Login With Google") {
            console.log(res.tokenId)
            axios.post("https://server-cproject.vercel.app/auth/login", {
                "Email": res.profileObj.email,
                "password": res.tokenId
            }).then(res => {
        
                if (res.headers['autherize']) {
                    
                    localStorage.setItem("TOKEN", res.headers['autherize'])
                    toast.success("Successfully Logged in!")
                    navigate("/")
                }
                
                else if (res.data === "Invaid UserName or Password") {
                
                    toast.error("Invaid Email or Password!")
                }
                else {
                    toast.error(res.data)
                    
                }
                
                
            }).catch(e => toast.error(e.message))
        }
        else {
            console.log(res.tokenId)
            axios.post("https://server-cproject.vercel.app/auth/register",
                {
                    "Name": res.profileObj.name,
                    "Email": res.profileObj.email,
                    "password": res.tokenId
                })
                .then(response => {
                    
                    if (response.status === 200) {
                        axios.post("https://server-cproject.vercel.app/auth/login", {
                            "Email": res.profileObj.email,
                            "password": res.tokenId
                        }).then(res => {
                    
                            if (res.headers['autherize']) {
                                
                                localStorage.setItem("TOKEN", res.headers['autherize'])
                                toast.success("Successfully Logged in!")
                                navigate("/")
                            }
                            
                            else if (res.data === "Invaid UserName or Password") {
                            
                                toast.error("Invaid Email or Password!")
                            }
                            else {
                                toast.error(res.data)
                                
                            }
                            
                            
                        }).catch(e => toast.error(e.message))
                    }
                    else
                        toast.error(response.data)
               
                }).catch(e => toast.error(e.message))
        }
    }

    const onFailure = (res) => {
        console.log("Failed",res)
    }
    return (
        <div className="signUpButton">
            <GoogleLogin
                clientId={clientId}
                buttonText={text}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                
            />
        </div>
    )
}

export default LoginButton;