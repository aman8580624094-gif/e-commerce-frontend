"use client"
import { useEffect, useState } from "react"
import useDebounce from "../component/customHooks/debounce"
import { useRouter } from "next/navigation"

export default function Cards() {

    const router = useRouter()
    const [card, setCard] = useState([])
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);


    const user = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        setCard(data)
    }

    useEffect(() => {
        user()
    }, [])


    const filteredUsers = card.filter((user) => {
        return (
            user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            user.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    });

    return (
        <div className="text-[#000000]">
            <div className="flex items-center w-full gap-4 p-5">
                <input
                    type="text"
                    placeholder="Search user..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />

                <button onClick={() => router.push("/new-things/create-card")} className="px-4 py-3 bg-blue-500 text-white rounded-lg whitespace-nowrap">
                    Create New Card
                </button>
            </div>

            <div className="min-h-screen bg-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div
                            onClick={() => router.push(`/users/${user.id}`)}
                            key={user.id}
                            className="bg-white w-full rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="bg-blue-600 p-6 text-center text-white">
                                <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                                    {user.name.charAt(0)}
                                </div>

                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-blue-100">@{user.username}</p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="font-medium">{user.phone}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Website</p>
                                    <p className="font-medium text-blue-600">{user.website}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-sm">Company</p>
                                    <p className="font-semibold">{user.company.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {user.company.catchPhrase}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user.company.bs}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No user found!
                    </p>
                )}
            </div>
        </div>
    )
}