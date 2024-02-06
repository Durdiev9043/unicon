import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import 'jquery/dist/jquery.min.js';

const District = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        // API-dan ma'lumotlarni olish
        const str = localStorage.getItem("token")
        const parts = str.split('|');
        const substringAfterPipe = parts[1];
        console.log(substringAfterPipe.substring(0, str.length - 1))
        axios.get(`http://unic2staffbot.us.uz/api/user/count/${id}`, {
            headers:{
                Authorization :`Bearer ${substringAfterPipe.replace(/"/g, '')}`
            }})
            .then(response => {
                // Olingan ma'lumotlarni state-ga saqlash

                setData(response.data);
                $(document).ready(function () {
                    setTimeout(function(){
                        $('#example').DataTable({
                            "pageLength": 50,
                            language: {
                                search: "Qidirish:",
                                lengthMenu:    " _MENU_ ",
                                info:           " _START_/_END_  Jami:  _TOTAL_ ",
                                paginate: {
                                    first:      "Premier",
                                    previous:   "Oldingi",
                                    next:       "Keyingi",
                                    last:       "<-"
                                },
                            }
                        });
                    } ,1000);
                });
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
    let Array = dataArray.sort((a, b) => b.id-a.id)
    console.log(Array);

    if (data){
        return (
            <div className="p-5">
                <h2 className="text-center"> </h2>
                {/* Bu joyda foydalanuvchi ma'lumotlari ko'rsatilishi mumkin  https://xorazm.uz/news/${dinamik} */}
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr  className="text-center">
                        <th rowSpan="2">F.I.O</th>
                        <th rowSpan="2">STIR</th>
                        <th rowSpan="2">Tashkilot</th>
                        <th rowSpan="2">Topshiriq turi</th>
                        <th rowSpan="2">Akt</th>
                        <th rowSpan="2">surat</th>
                        <th rowSpan="2">surat</th>
                        <th rowSpan="2">surat</th>
                        <th rowSpan="2">surat</th>
                        <th rowSpan="2">surat</th>
                        <th rowSpan="2">Xarita</th>
                        <th rowSpan="2">Vaqti</th>
                    </tr>

                    </thead>
                    <tbody>
                    {Array.map(item => (
                        <tr   className="text-center">
                            <td><Link className="font-weight-bold text-decoration-none text-dark" to={"user/count/"+item.id}>{item.name}</Link></td>
                            <td>{item.stir}</td>
                            <td>{item.organization}</td>
                            <td>{item.task_id}</td>
                            {/*<td><img src="http://127.0.0.1:8000/storage/galereya/8c3374bf-d009-4f10-bd5e-585a0eb97da0-1704907255.jpg" alt=""/></td>*/}
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.akt}`} width="100%" alt=""/></td>
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.img1}`} width="100%" alt=""/></td>
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.img2}`} width="100%" alt=""/></td>
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.img3}`} width="100%" alt=""/></td>
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.img4}`} width="100%" alt=""/></td>
                            <td width="150px"><img src={`http://unic2staffbot.us.uz/storage/galereya/${item.img5}`} width="100%" alt=""/></td>
<td>
    <a href={`https://www.google.com/maps?q=${item.lat},${item.lang}`} target="_blank">
        Xaritada ko'rish
    </a>
</td>

                            <td>{item.day}</td>

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