import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import $ from "jquery";

const Come = () => {

    const [ data, setData] = useState([]);

    useEffect(() => {
        // API-dan ma'lumotlarni olish  '/?filter_param=today'
        // setTimeout(() => setLoading(false), 3300)
        const str = localStorage.getItem("token")
        const parts = str.split('|');
        const substringAfterPipe = parts[1];
        axios.get(`http://unic2staffbot.us.uz/api/work/time/`,{
            headers:{
                Authorization :`Bearer ${substringAfterPipe.replace(/"/g, '')}`
            }})

            .then(response => {
                // Olingan ma'lumotlarni state-ga saqlash
                setData(response.data);
                $(document).ready(function () {
                    setTimeout(function(){
                        $('#example').DataTable({
                            "pageLength": 100,

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

    console.log(dataArray);


    return (

        <div className="p-5">
            <h2>Xodimlar ishga kelish hisoboti</h2>

            <table className="table table-striped table-bordered" id="example">
                <thead>
                <tr  className="text-center">
                    <th>F.I.O</th>
                    <th>Viloyat</th>
                    <th>Tuman</th>
                    <th>Vaqti</th>


                    {/* Boshqa ustunlar kerak bo'lsa ularga ham shu tarzda qo'shing */}
                </tr>
                </thead>
                <tbody>
                {dataArray.map( item => (

                    <tr  className="text-center">
                        <td>{item.user}</td>
                        <td>{item.region}</td>
                        <td>{item.district}</td>
                        <td>{item.time}</td>


                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default Come;