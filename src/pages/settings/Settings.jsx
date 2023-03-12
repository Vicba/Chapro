import { useState } from 'react'

//styles
import './Settings.css'

//hooks
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Settings() {
    const [displayName, setDisplayName] = useState("")
    const [biography, setBiography] = useState("")
    const [error, setError] = useState(null)

    const { user } = useAuthContext()
    const { updateDocument } = useFirestore("users")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        if (biography && !displayName) {
            await updateDocument(user.uid, {
                biography
            })
        } else if (displayName && !biography) {
            await updateDocument(user.uid, {
                displayName
            })
        } else if (displayName && biography) {
            await updateDocument(user.uid, {
                displayName,
                biography
            })
        } else {
            setError("You changed no input fields!")
        }

        resetValues()
    }

    const resetValues = () => {
        setDisplayName("")
        setBiography("")
    }

    return (
        <div>
            <form className='form-settings' onSubmit={handleSubmit}>
                <fieldset>
                    <h4>User details</h4>

                    <label>
                        <span>Username:</span>
                        <input type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
                    </label>
                </fieldset>

                <fieldset>
                    <h4>Bio</h4>

                    <label>
                        <span>About me</span>
                        <textarea id="" cols="30" rows="10" onChange={(e) => setBiography(e.target.value)} value={biography}></textarea>
                    </label>

                </fieldset>

                {error && <p className='error'>{error}</p>}
                <button className="btn updateBtn">Update</button>
            </form>
        </div>
    )
}
