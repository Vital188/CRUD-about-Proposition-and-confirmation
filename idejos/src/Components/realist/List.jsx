import { useState, useEffect, useContext } from 'react';
import Realist from '../../Contexts/Realist';
import Line from './Line';


function List() {

    const { ideas } = useContext(Realist);
    const [stats, setStats] = useState({ ideasCount: null });


    useEffect(() => {
        if (null === ideas) {
            return;
        }
        setStats(s => ({ ...s, ideasCount: ideas.length }));
    }, [ideas]);

    return (
        <div className="card m-4">
            <h5 className="card-header">Ideas List ({stats.ideasCount})</h5>
            <div className="card-body">
                <ul className="list-group">
                    {
                        ideas?.map(i => <Line key={i[1][0].id} ideas={i} />)
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;