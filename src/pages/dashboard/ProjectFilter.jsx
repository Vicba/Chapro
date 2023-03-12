import { useState } from 'react'

const filterList = ['All', 'UI/UX', 'Frontend', 'Backend', 'Databases', 'DevOps', 'ML/AI']

export default function ProjectFilter({ currentFilter, changeFilter }) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className="project-filter">
            <nav>
                <p>Filter by: </p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}