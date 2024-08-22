import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
export default function Login(props) {

    const [credientals,setcredientals]=useState({email:"",password:""});
    let navigate=useNavigate();
    const handleClick= async(e)=>
    {
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:credientals.email,password:credientals.password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success)
        {
            props.showAlert("logged in successfully","success");
            //saving the auth-token and redirect 
            localStorage.setItem('token',json.authtoken);
            navigate('/');

        }
        else
        {
           props.showAlert("invalid credintals","danger");
        }
    }

    const onchange=(e)=>
    {
        setcredientals({...credientals,[e.target.name]:e.target.value})
    }


  return (
    <div className="container">
      <form onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
