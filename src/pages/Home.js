import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([])
    

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);


    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8081/get");
            //console.log(result.data); // <-- this will show the array
            setUsers(result.data);    // <-- store it in state
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUsers = async (id) => {
        await axios.delete(`http://localhost:8081/user/${id}`)
        loadUsers()
    }




    return (

        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row" key={index} >{index + 1}</th>
                                <td>{user.empname}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                
                                <td>
                                    <Link className='btn btn-primary mx-2'
                                        to={`/viewuser/${user.id}`}>
                                        View</Link>


                                    <Link className='btn btn-outline primary mx-2'
                                        to={`/edituser/${user.id}`}>

                                        Edit</Link>

                                    <button className='btn btn-danger mx-2'

                                        onClick={() => deleteUsers(user.id)}
                                    > Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}


