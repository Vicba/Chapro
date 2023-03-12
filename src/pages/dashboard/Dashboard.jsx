import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ProjectList from '../../Components/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
import './Dashboard.css'
import { uzCyrl } from 'date-fns/locale'

export default function Dashboard() {
    const { user } = useAuthContext()

    const { documents, error } = useCollection('projects')

    const [currentFilter, setCurrentFilter] = useState('All')

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter(document => {
        switch (currentFilter) {
            case 'All':
                let assignedToMe = false
                if (document.createdBy.id === user.uid) {
                    assignedToMe = true
                }
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'UI/UX':
            case 'Frontend':
            case 'Backend':
            case 'Databases':
            case 'DevOps':
            case "ML/AI":
                let forMe = false
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        forMe = true
                    }
                })
                return forMe && document.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}