

function Line({ ideas }) {


console.log(ideas)

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                        <h2>{ideas[0]} <small>({ideas[1].length})</small></h2>
                        {ideas[1][0].image ? <div className='img-bin'>
                            <img src={ideas[1][0].image} alt={ideas[0]}>
                            </img>
                        </div> : null}
                        <div className="home__content__imfo">
                        {ideas[1][0].post} 
                    </div>
                    </div>

                    <div className="home__content__price">
                        {ideas[1][0].price} Eur
                    </div>
                </div>
            </div>
            <div className="home__buttons">
           
                            {/* {ideas[1][0].orderis === 0 ?
                                <button  style={{
                                    backgroundColor: 'skyblue'
                                }} type="button" className="btn btn-outline-danger">Waiting confirmation</button> : */}
                                <button style={{
                                    backgroundColor: 'orange'
                                }} type="button" className="btn btn-outline-danger">Confirmed</button>
                            {/* } */}
                            </div>
                
           
        </li>
    )
}

export default Line;
