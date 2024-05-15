import style from '../style.module.css'
import React from 'react'

function ResultCard({ item }) {
    return (
        <div className={style.resultCard}>
            <img src={item.url} />
            <div className={style.title}>
                {item.title}
            </div>
        </div>
    )
}

export default ResultCard