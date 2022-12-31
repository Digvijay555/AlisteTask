
import './style.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
const Home = () => {

    const [data, setData] = useState({ homeId: "", name: "", userId: "" })
    const [id, setId] = useState({ homeId: "" });
    const [record, setRecord] = useState([])
    const onChange = (e) => {

        setData({ ...data, [e.target.name]: e.target.value });

    }
    const onChangee = (e) => {

        setId({ ...id, [e.target.name]: e.target.value });

    }

    const saveRecord = async (homeId, user) => {

        const response = await fetch('http://localhost:5000/api/user/saveuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ homeId, user })
        })

    }

    const getRecord = async (id) => {
        const data =[];
        const response = await fetch(`http://localhost:5000/api/user/getuser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
        const records = await response.json(); // parses JSON response into native JavaScript objects
      
        data.push(records);
        setRecord(data);
    }


    const saveData = () => {
        console.log(data);

        const user = [{
            "username": data.name,
            "id": data.userId
        }];
        saveRecord(data.homeId, user);
    }

    const getData = () => {
        // console.log(id);
        getRecord(id.homeId);
    }
    return (
        <>
            <div ><h1 className="header">Aliste Home Page</h1></div>

            <div className='container'>
                <div className="card">
                    <h4>HomeId</h4>
                    <TextField id="standard-basic" label="HomeId" variant="standard" name="homeId" onChange={onChange} />

                    <h4>Name</h4>
                    <TextField id="standard-basic" label="UserName" variant="standard" name="name" onChange={onChange} />
                    <h4>UserId</h4>
                    <TextField id="standard-basic" label="UserId" variant="standard" name="userId" onChange={onChange} />
                    <br />
                    <br />
                    <Button variant="contained" onClick={saveData}>SaveData</Button>
                </div>
                <div className='searchContainer'>
                    <h3 className='header'>Get User Details</h3>
                    <div className='searchdiv'>
                        <TextField id="standard-basic" label="HomeId" variant="standard" name="homeId" onChange={onChangee} />
                        <Button variant="contained" onClick={getData}>Get User Details</Button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>HomeId</th>
                                    <th>User Name</th>
                                    <th>User Id</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                
                               {
                                   record.length >0? 
                                   record[0].user.map((ele) => {
                                        
                                        return(<tr>
                                            <td>{record[0].homeId}</td>
                                            <td>{ele.username}</td>
                                            <td>{ele.id}</td>
                                        </tr>)
                                    })
                                    :
                                    null
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;