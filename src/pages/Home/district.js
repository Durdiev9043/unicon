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
        axios.get(`https://unic2.pythonanywhere.com/api/district-stats-by-region/?region_id=${id}`)
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
    console.log(data)

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
                {data.map(district => (
                    parseInt(district.seminar_plan_difference)<30  ? (
                    <tr  className="text-center table-danger">
                        <td><Link to={"/staff/"+district.district_id}>{district.district_name}</Link></td>
                        <td>{district.member_count}</td>
                        <td>{district.tasks_done_today}</td>
                        <td>{district.seminar_plan_difference}</td>
                        <td>{district.tasks_done_yesterday}</td>
                        <td>{district.tasks_done_today}</td>
                        {district.tasks_done_difference>0 ? (<td >{district.tasks_done_difference}</td>):(<td className="text-danger">{district.tasks_done_difference}</td>)}
                        <td>{district.tasks_done_this_week}</td>



                    </tr>) :
                        ( <tr  className="text-center ">
                            <td><Link to={"/staff/"+district.district_id}>{district.district_name}</Link></td>
                            <td>{district.member_count}</td>
                            <td>{district.tasks_done_today}</td>
                            <td>{district.seminar_plan_difference}</td>
                            <td>{district.tasks_done_yesterday}</td>
                            <td>{district.tasks_done_today}</td>
                            {district.tasks_done_difference>0 ? (<td >{district.tasks_done_difference}</td>):(<td className="text-danger">{district.tasks_done_difference}</td>)}
                            <td>{district.tasks_done_this_week}</td>



                        </tr>)
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default District;