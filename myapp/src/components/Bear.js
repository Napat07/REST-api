import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const Bear = () => {

    const [bears, setBears] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setsurName] = useState('')
    const [Major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    useEffect(() => {
        getBears()
    }, [])

    const getBears = async () => {
        const result = await axios.get(`http://localhost/api/bears`)
        console.log(result.data)
        setBears(result.data)
    }

    const addBear = async () => {
        const result = await axios.post(`http://localhost/api/bears`, {
            id,
            name,
            surname,
            Major,
            GPA
        })
        console.log(result.data)
        getBears()
    }

    const getBear = async (id) => {
        const result = await axios.get(`http://localhost/api/bears/${id}`)
        console.log(result.data)
        setId(result.data.id)
        setName(result.data.name)
        setsurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
    }

    const updateBear = async (id) => {
        const result = await axios.put(`http://localhost/api/bears/${id}`, {
            id,
            name,
            surname,
            Major,
            GPA
        })

        console.log(result.data)
        setId(result.data.id)
        setName(result.data.name)
        setsurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
        getBears()
    }

    const deleteBear = async (id) => {
        const result = await axios.delete(`http://localhost/api/bears/${id}`)
        getBears()
    }

    const printBears = () => {
        if (bears && bears.length)
            return bears.map((bear, index) => {
                return (
                    <li key={index}>
                        {bear.id} : {bear.name} {bear.surname} : {bear.Major} : {bear.GPA} &nbsp;
                        <button class="btn btn-primary" onClick={() => getBear(bear.id)}>Get</button> &nbsp;
                        <button class="btn btn-danger" onClick={() => deleteBear(bear.id)}> Delete </button> &nbsp;
                        <button class="btn btn-warning" onClick={() => updateBear(bear.id)}> Update </button> &nbsp;
                        <tr></tr>
                    </li>
                )
            })
        else {
            return (<h2> Nothing bear </h2>)
        }
    }
    return (
        <div>
            <h2 class="p-3 mb-2 bg-success text-white">Get Students</h2>
                {printBears()}
                <br/>
                <h6 class="p-3 mb-2 bg-danger text-white"></h6>
            ID Student : {id} <br />
            Name : {name}&nbsp; {surname}<br />
            Major : {Major}<br />
            GPA :  {GPA}<br />
            <br/>
            <h2 class="p-3 mb-2 bg-info text-white">Add Students</h2>
            ID : <input type="text"  name="id" onChange={(e) => setId(e.target.value)}/> <br />
            Name : <input type="text"  name="name" onChange={(e) => setName(e.target.value)}/> <br />
            Surname : <input type="text"  name="surname" onChange={(e) => setsurName(e.target.value)} /><br />
            Major : <input type="text"  name="Major" onChange={(e) => setMajor(e.target.value)} /><br />
            GPA : <input type="number"  name="GPA" onChange={(e) => setGPA(e.target.value)} /> <br/>
            <button class="btn btn-success" onClick={addBear}>Add </button>
            <br/><br/>

        </div>
    )
}

export default Bear;