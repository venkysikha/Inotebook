import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
export default function Signup(props) {
  const [credientals,setcredientals]=useState({name:"",email:"",password:"",cpassword:""});
  let navigate=useNavigate();
  const handleClick= async(e)=>
  {
    e.preventDefault();
    const { name, email, password,cpassword } = credientals;
    if (password !== cpassword) {
      props.showAlert("passwords must be same","danger");
      return;
    }

      const response=await fetch("http://localhost:5000/api/auth/createuser",{
          method:"POST",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify({name,email,password})
      });
      const json=await response.json();
      console.log(json);
      localStorage.setItem('token',json.authtoken);
      props.showAlert("successfully created a account","success");
      navigate('/');
  }

  const onChange=(e)=>
  { 
      setcredientals({...credientals,[e.target.name]:e.target.value})
  }

  return (
    <div className="container">
      <form onSubmit={handleClick}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            required
            minLength={3}
          /></div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            onChange={onChange}
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
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
}
