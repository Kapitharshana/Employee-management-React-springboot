import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

    const [users, setUsers] = useState({
empname: "",
        email: "",
        age: "",
        salary: ""
    });

    const { id } = useParams();

    useEffect(() => {
        loadUsers()
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8081/get/${id}`)
        setUsers(result.data)
    }
    return (

        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>User Details</h2>

                    <div className='card'>
                        <div className='card-header'>
                            Details of user id : {users.id}
                            <ul className='list-group list-group-flush'>

                                <li className='list-group-item'>
                                    <b>Employee Name : </b>
                                    {users.empname}
                                </li>

                                <li className='list-group-item'>
                                    <b>Email : </b>
                                    {users.email}
                                </li>

                                <li className='list-group-item'>
                                    <b>Age : </b>
                                    {users.age}
                                </li>

                                <li className='list-group-item'>
                                    <b>Salary : </b>
                                    {users.salary}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2 ' to={"/"}> Back to Home</Link>
                </div>
            </div>
        </div>
    )

}
