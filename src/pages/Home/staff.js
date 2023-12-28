import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";

const District = () => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        // API-dan ma'lumotlarni olish
        axios.get(`https://unic2.pythonanywhere.com/api/district-member-todo-count/${id}`)
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
            <h2 className="text-center">{data.district_name} bugun qilingan ishlar boyicha hisobot</h2>
            {/* Bu joyda foydalanuvchi ma'lumotlari ko'rsatilishi mumkin  https://xorazm.uz/news/${dinamik} */}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Viloyat nomi</th>
                    <th>Seminar-trening</th>
                    <th>Texnik yordam</th>
                    <th>Token-shartnoma</th>
                    <th>Shartnoma</th>
                    <th>Qarzdorlik undiruvi</th>
                </tr>
                </thead>
                <tbody>
                {data.members.map(district => (
                    <tr >

                        <td>{district.full_name}</td>
                        <td>{district.counts['Seminar-trening']}</td>
                        <td>{district.counts['Texnik yordam']}</td>
                        <td>{district.counts['Token-shartnoma']}</td>
                        <td>{district.counts['Shartnoma: edo.ijro.uz']}</td>
                        <td>{district.counts['Qarzdorlik undiruvi: shartnoma b.']}</td>


                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default District;