import React, { useState } from 'react'
import { Link } from 'react-router-dom'

//styles
import './Signup.css'

import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    const { signup, error, isPending } = useSignup()

    const handleFileChange = (e) => {
        setThumbnail(null)

        let selected = e.target.files[0]
        if (!selected) {
            setThumbnailError("please select a file")
            return
        }
        if (!selected.type.includes("image")) {
            setThumbnailError("selected file must be an image")
            return
        }
        if (selected.size > 100000) {
            setThumbnailError("image file size must be less than 100kb")
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        signup(email, password, displayName, thumbnail)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign up</h2>

            <label>
                <span>Email*:</span>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>

            <label>
                <span>Password*:</span>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>

            <label>
                <span>Username*:</span>
                <input type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName} required />
            </label>

            <label>
                <span>profile picture*:</span>
                <p>File size has to be smaller then 100kb</p>
                <input type="file" onChange={handleFileChange} required />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>loading</button>}
            {error && <div className='error'>{error}</div>}<br /><br />
            <Link to='/login'>Already have an account? Login here!</Link>
        </form>
    )
}
