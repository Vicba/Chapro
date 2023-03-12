import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

// styles
import './Create.css'

//hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
//firebase
import { timestamp } from '../../firebase/config'

const categories = [
    { value: 'UI/UX', label: 'UI/UX' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Databases', label: 'Databases' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'ML/AI', label: 'ML/AI' }
]

export default function Create() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])

    const [formError, setFormError] = useState(null)


    const [users, setUsers] = useState([])
    const { documents } = useCollection("users")

    const { user } = useAuthContext()

    const { addDocument, response } = useFirestore("projects")

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError("please select a project category")
            return
        }
        if (assignedUsers.length < 1) {
            setFormError("Please assign project to at least one user")
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return { displayName: u.value.displayName, photoURL: u.value.photoURL, id: u.value.id }
        })

        assignedUsersList.push(createdBy)

        const project = {
            name, details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project)
        if (!response.error) {
            navigate("/")
        }
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new Project</h2>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project Details:</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <div className="row">
                    <label>
                        <span>Deadline:</span>
                        <input
                            required
                            type="date"
                            onChange={(e) => setDueDate(e.target.value)}
                            value={dueDate}
                        />
                    </label>
                    <label>
                        <span>Project category:</span>
                        <Select
                            onChange={(option) => setCategory(option)}
                            options={categories}
                        />
                    </label>
                </div>
                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users.filter(u => u.value.photoURL != user.photoURL)}
                        isMulti
                    />
                </label>

                <button className="btn">Add Project</button>

                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}
