import style from '../style.module.css'
import React from 'react'
import ResultCard from './ResultCard'

function ResultContainer({ results }) {
    return (
        <div className={style.resultContainer}>
            {
                results.length > 0 ?
                    results.map((item, index) => {
                        return (
                            <ResultCard key={index} item={item} />
                        )
                    })
                    :
                    <div>No data ...</div>
            }
        </div>
    )
}

export default ResultContainer