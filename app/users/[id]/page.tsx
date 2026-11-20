"use client";

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const data = () => {
    const [card, setCard] = useState(null)
    const { id } = useParams()

    const user = async () => {
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        setCard(res.data);
    };

    useEffect(() => {
        user()
    }, [])

    return (
        <div className="text-[#000000]">


            <div className="min-h-screen bg-gray-100 p-8">
                {card && (
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                        <h1 className="text-2xl font-bold mb-6">
                            User Details
                        </h1>
                        <p><b>ID:</b> {card?.id}</p>
                        <p><b>Name:</b> {card?.name}</p>
                        <p><b>Username:</b> {card?.username}</p>
                        <p><b>Email:</b> {card?.email}</p>
                        <p><b>Phone:</b> {card?.phone}</p>
                        <p><b>Website:</b> {card?.website}</p>

                        <hr className="my-5" />

                        <h2 className="text-xl font-bold mb-3">Address</h2>

                        <p>{card?.address?.street}</p>
                        <p>{card?.address?.suite}</p>
                        <p>{card?.address?.city}</p>
                        <p>{card?.address?.zipcode}</p>

                        <hr className="my-5" />

                        <h2 className="text-xl font-bold mb-3">Company</h2>

                        <p><b>Name:</b> {card?.company?.name}</p>
                        <p><b>Catch Phrase:</b> {card?.company?.catchPhrase}</p>
                        <p><b>Business:</b> {card?.company?.bs}</p>

                    </div>
                )}
            </div>
        </div>
    )
}
export default data