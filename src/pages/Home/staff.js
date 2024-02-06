import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const District = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        // API-dan ma'lumotlarni olish
        const str = localStorage.getItem("token")
        const parts = str.split('|');
        const substringAfterPipe = parts[1];
        console.log(substringAfterPipe.substring(0, str.length - 1))
        axios.get(`http://unic2staffbot.us.uz/api/boss/user/${id}`, {
            headers:{
                Authorization :`Bearer ${substringAfterPipe.replace(/"/g, '')}`
            }})
            .then(response => {
                // Olingan ma'lumotlarni state-ga saqlash
                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    let dataArray = [];

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            dataArray.push(data[key]);
        }
    }

    console.log(dataArray);
    if (data){
    return (
        <div className="p-5">
            <h2 className="text-center"> </h2>
            <table className="table table-striped table-bordered">
                <thead>
                <tr  className="text-center">
                    <th rowSpan="2">F.I.O</th>
                    <th rowSpan="2">Jami</th>
                    <th rowSpan="2">Bir kunlik</th>
                    <th rowSpan="2">Kechagi</th>
                    <th rowSpan="2">Farqi</th>
                    <th rowSpan="2">Bir hafta</th>

                </tr>

                </thead>
                <tbody>
                {dataArray.map(item => (
                    <tr   className="text-center">
                        <td><Link className="font-weight-bold text-decoration-none text-dark" to={"/user/count/"+item.id}>{item.name}</Link></td>
                        <td>{item.jami}</td>
                        <td>{item.today}</td>
                        <td>{item.yesterday}</td>
                        <td>{item.farqi}</td>
                        <td>{item.thisweek}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
}else
{return (
    <div>iltimos kuting</div>

)};}

export default District;