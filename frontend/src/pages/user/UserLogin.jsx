import React , {useState} from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [data , setData] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        setData({
            username,
            password
        })
        console.log(data)
        setUsername('')
        setPassword('')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded  shadow-gray-500 shadow-spread">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4">
                    <div>
                        <h1 className="block text-sm font-bold text-gray-700">Email</h1>
                        <input
                            type="email"
                            className="w-full bg-transparent px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                            required
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label className="ml-2 text-sm text-gray-900">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        Don't have an account?
                        <Link to="/usersignUp" className="text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>

    )
}

export default UserLogin
