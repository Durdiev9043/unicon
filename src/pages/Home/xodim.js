import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const District = () => {
    const { id } = useParams();
const i=0;
    const [ data, setData] = useState([]);

    useEffect(() => {
        // API-dan ma'lumotlarni olish  '/?filter_param=today'
        // setTimeout(() => setLoading(false), 3300)
        const str = localStorage.getItem("token")
        const parts = str.split('|');
        const substringAfterPipe = parts[1];
        axios.get(`http://127.0.0.1:8000/api/work/time/`,{
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
    console.log(data)

    return (

        <div className="p-5">
            <h2>Xodimlar kesimida bugun qilingan ishlar boyicha hisobot</h2>
            {/* Bu joyda foydalanuvchi ma'lumotlari ko'rsatilishi mumkin  https://xorazm.uz/news/${dinamik} */}
            <table className="table table-striped table-bordered">
                <thead>
                <tr  className="text-center">
                    <th>№</th>
                    <th>Vaqt</th>
                    <th>F.I.O</th>
                    {/*<th>vaqti</th>*/}
                    <th>Tashkilot</th>
                    <th>STIR</th>
                    <th>Vazifa</th>
                    <th>Surati</th>
                    <th>Joylashuv</th>

                    {/* Boshqa ustunlar kerak bo'lsa ularga ham shu tarzda qo'shing */}
                </tr>
                </thead>
                <tbody>
                {data.map( item => (

                    <tr  className="text-center">
                        <td>1</td>
                        <td>12.22.2023  22:49</td>
                        <td> {item.member['full_name']}  </td>
                        {/*<td>{this.now}</td>*/}
                        <td>{item.organization}</td>
                        <td>201201201</td>
                        <td>{item.task_name}</td>
                        <td><img src={`${item.photo}`} width="100px" alt=""/></td>

                        <td>
                            {item.location['latitude']}
                            {item.location['longitude']}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default District;