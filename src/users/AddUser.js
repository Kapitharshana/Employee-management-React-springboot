import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


export default function AddUser() {



    let navigate = useNavigate()
    const [user, setUsers] = useState({
        empname: "",
        email: "",
        age: "",
        salary: ""


    })

    const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError]=useState("");

    const { empname, email, age, salary } = user

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|lk|org)$/i;

           
            if (!emailPattern.test(value)) {
                setEmailError("Please enter a valid email like: yourname@gmail.com");
            } else {
                setEmailError("");
            }
        }

        if(name == "age"){ // bcz the company's retirement age is 60
            if(value>=18 && value <=60){
setAgeError("");
            } 
            else{
                setAgeError("Valid age should be betwen 18 to 60")
            }

        }

        setUsers({ ...user, [name]: value });
    };


     
    const onSubmit = async (e) => {
  e.preventDefault();

  // --- explicit age presence + range validation (pre-submit) ---
  // Treat empty string or whitespace as blank
  if (String(age).trim() === "") {
    setAgeError("Age cannot be blank.");
    // optionally focus the field:
    // document.getElementsByName("age")[0].focus();
    return;
  }

  // convert to number for range checks
  const ageNum = Number(age);
  if (isNaN(ageNum) || ageNum < 18 || ageNum > 60) {
    setAgeError("Valid age should be between 18 and 60");
    return;
  }

  // if there's still an email error, stop (you already set emailError while typing)
  if (emailError !== "") {
    alert("Please fix the email before submitting.");
    return;
  }

  // At this point ageError should be empty; double-check and clear
  setAgeError("");

  // --- submit ---
  await axios.post("http://localhost:8081/user", user);
  navigate("/");
};

    




    return (

        <div className='container'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register User</h2>

                
                <form onSubmit={onSubmit} noValidate>

                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Employee Name
                        </label>

                        <input
                            type={'text'}
                            className='form-control'
                            placeholder='Enter your name'
                            name='empname'
                            value={empname}
                            onChange={onInputChange}
                        />


                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Email
                        </label>
                        <input
                            type={'email'}
                            className='form-control'
                            placeholder='Enter your email'
                            name='email'
                            value={email}
                            onChange={onInputChange}

                        />
                        {emailError && <p style={{ color: "red", fontSize: "14px" }}>{emailError}</p>}

                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Age
                        </label>
                        <input
                            type={'number'}
                            className='form-control'
                            placeholder='Enter your age'
                            name='age'
                            value={age}
                            onChange={onInputChange}
                            
                        />
                        {ageError && <p style={{ color: "red", fontSize: "14px" }}>{ageError}</p>}

                    </div>

                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>
                            Salary
                        </label>
                        <input
                            type={'number'}
                            className='form-control'
                            placeholder='Enter your salary'
                            name='salary'
                            value={salary}
                            onChange={onInputChange}

                        />


                    </div>




                    <button type='submit' className='btn btn-outline-primary '>Submit </button>
                    <Link className='btn btn-outline-danger mx-2' to="/">
                        Cancel
                    </Link>

                </form>
            </div>


        </div>

    )
}

