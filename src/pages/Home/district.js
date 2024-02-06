import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const District = () => {
    const { id } = useParams();

    const [ data, setData] = useState([]);

    useEffect(() => {

        const str = localStorage.getItem("token")
        const parts = str.split('|');
        const substringAfterPipe = parts[1];
        console.log(substringAfterPipe.substring(0, str.length - 1))
        axios.get(`http://unic2staffbot.us.uz/api/boss/district/${id}`, {
            headers:{
                Authorization :`Bearer ${substringAfterPipe.replace(/"/g, '')}`
            }})
            .then(response => {

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

    console.log(dataArray);

    return (

        <div className="p-5">
            <h2 className="text-center">Viloyat bo'yicha statistika</h2>

            <table className="table table-striped table-bordered" id="example">
                <thead>
                <tr  className="text-center">
                    <th rowSpan="2">Tumanlar nomi</th>
                    <th rowSpan="2">Xodimlar soni</th>
                    <th colSpan="2">Bir kunlik</th>
                    <th rowSpan="2">Kechagi</th>
                    <th rowSpan="2">Bugungi</th>
                    <th rowSpan="2">Farqi</th>
                    <th rowSpan="2">Bir hafta</th>

                </tr>
                <tr  className="text-center">

                    <th>Bajarilgan Soni</th>
                    <th>Bajarilgan %</th>

                </tr>
                </thead>
                <tbody>
                {dataArray.map(district => (
                    // parseInt(district.seminar_plan_difference)<30  ? (
                    <tr  className="text-center ">
                        <td><Link to={"/staff/"+district.id}>{district.name}</Link></td>
                        <td>{district.user}</td>
                        <td>{district.today}</td>
                        <td>{district.kpi} %</td>
                        <td>{district.yesterday}</td>
                        <td>{district.today}</td>
                        {district.farqi>0 ? (<td >{district.farqi}</td>):(<td className="text-danger">{district.farqi}</td>)}
                        <td>{district.today}</td>

                    </tr>


                ))}
                </tbody>
            </table>
        </div>

    );
};

export default District;