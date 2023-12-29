import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const District = () => {
    const { id } = useParams();

    const [ data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://unic2.pythonanywhere.com/api/district-stats-by-region/?region_id=${id}`)
            .then(response => {

                setData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    console.log(data)

    return (

        <div className="p-5">
            <h2 className="text-center">Viloyat bo'yicha statistika</h2>

            <table className="table table-striped table-bordered">
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
                    <tr  className="text-center">
                        <td><Link to={"/staff/"+district.district_id}>{district.district_name}</Link></td>
                        <td>{district.member_count}</td>
                        <td>{district.tasks_done_today}</td>
                        <td>{district.seminar_plan_difference}</td>
                        <td>{district.tasks_done_yesterday}</td>
                        <td>{district.tasks_done_today}</td>
                        <td>{district.tasks_done_difference}</td>
                        <td>{district.tasks_done_this_week}</td>



                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default District;