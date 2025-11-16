import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {

    let navigate = useNavigate();
    const { id } = useParams();  // ✅ YOU FORGOT THIS

    const [user, setUsers] = useState({
        empname: "",
        email: "",
        age: "",
        salary: "",
        address: "",
        phone: "",
        nic: "",
        joinedDate: ""
    });

 
const [emailError, setEmailError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [nicError, setnicError] = useState("");
    const [joinedDateError, setJoinedDateError] = useState("");
    const [salaryError, setsalaryError] = useState("");
    const [empnameError, setempnameError] = useState("");
    const [addressError, setaddressError] = useState("");


    

    const { empname, email, age, salary, address, phone, nic, joinedDate } = user;

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "empname") {
    const namePattern = /^(?=.{3,}$)[A-Za-z]+(?: [A-Za-z]+)*$/;    //


    if (!namePattern.test(value.trim())) {
        setempnameError("Name can contain only letters, spaces, dots, and hyphens.");
    } else {
        setempnameError("");
    }
}

 if (name === "address") {
    const namePattern = /^[A-Za-z0-9][A-Za-z0-9 .,/()-]*$/;           


    if (!namePattern.test(value.trim())) {
        setaddressError("Addres can contain can't start with symbols but with numbers");
    } else {
        setaddressError("");
    }
}


        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|lk|org)$/i;


            if (!emailPattern.test(value)) {
                setEmailError("Please enter a valid email like: yourname@gmail.com");
            } else {
                setEmailError("");
            }
        }

        if (name == "age") { // bcz the company's retirement age is 60
            if (value >= 18 && value <= 60) {
                setAgeError("");
            }
            else {
                setAgeError("Valid age should be betwen 18 to 60")
            }

        }

        if (name == "salary") { // salary should be greater than or equal 5k bcz company's basic salary is 5k
            if (value >=5000) {
                setsalaryError("");
            }
            else {
                setsalaryError("Valid salary should be greater than ro equal 5000")
            }

        }

        if(name === "phone"){ 
            const phonePattern = /^\+94(70|71|72|74|75|76|77|78)\d{7}$/;
            if(!phonePattern.test(value) ){ 
                setphoneError("Invalid phone (Use format +947xxxxxxx with valid SL operator code)");
             }else { setphoneError(""); }
             } 

    if(name === "nic"){ 
            const nicPattern = /^(?:\d{9}[VXvx]|\d{12})$/; 
            if(!nicPattern.test(value) ){ 
                setnicError("Invalid nic no(ufor ex new nic:200280702918, old nic: 6696567v )");
             }else { setnicError(""); }
             }  

             if (name === "joinedDate") {
            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            setJoinedDateError(value > today ? "Joined date cannot be in the future" : "");
        }
 

        setUsers({ ...user, [name]: value });
    };

    useEffect(() => {
        loadUser();
    }, []);



    const onSubmit = async (e) => {
        e.preventDefault();

          // --- check if any field currently has an error ---
    if (emailError || ageError || phoneError || nicError || joinedDateError) {
       alert("Please fix all errors before submitting.");
        return;
    }


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

        await axios.put(`http://localhost:8080/update/${id}`, user);
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/get/${id}`);
        setUsers(result.data); // ✅ Auto-fills the form
    };



    return (
        <div className='container'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit User</h2>

                <form onSubmit={onSubmit} noValidate>
                    <div className='mb-3'>
                        <label className='form-label'>Employee Name</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter your name'
                            name='empname'
                            value={empname}
                            onChange={onInputChange}
                        />
                        {empnameError && <p style={{ color: "red" }}>{empnameError}</p>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            type="email"
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
                        {salaryError && <p style={{ color: "red", fontSize: "14px" }}>{salaryError}</p>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Address</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter your address'
                            name='address'
                            value={address}
                            onChange={onInputChange}
                        />
                        {addressError && <p style={{ color: "red", fontSize: "14px" }}>{addressError}</p>}

                        
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Phone NO</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter your phone number'
                            name='phone'
                            value={phone}
                            onChange={onInputChange}
                        />
                        {phoneError && <p style={{ color: "red", fontSize: "14px" }}>{phoneError}</p>}
                    </div>


                    <div className='mb-3'>
                        <label className='form-label'>NIC NO</label>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter your NIC number'
                            name='nic'
                            value={nic}
                            onChange={onInputChange}
                        />
                        {nicError && <p style={{ color: "red", fontSize: "14px" }}>{nicError}</p>}
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Joined-Date</label>
                        <input
                            type="date"
                            className='form-control'
                            name='joinedDate'
                            value={joinedDate}
                            onChange={onInputChange} 
                        />
                        {joinedDateError && <p style={{ color: "red", fontSize: "14px" }}>{joinedDateError}</p>}
                    </div>


                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>

                </form>
            </div>
        </div>
    );
}
