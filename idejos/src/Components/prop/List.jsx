import { useState, useEffect, useContext } from 'react';
import Prop from '../../Contexts/Prop/Prop';
import Line from './Line';


function List() {

    const { ideas } = useContext(Prop);
    const [stats, setStats] = useState({ ideasCount: null });


    useEffect(() => {
        if (null === ideas) {
            return;
        }
        setStats(s => ({ ...s, ideasCount: ideas.length }));
    }, [ideas]);

    return (
        <div className="card m-4">
            <h4 className="card-header">Project list <b> (administrator confirmed)</b> ({stats.ideasCount})</h4>
            <h5 className="card-header">If you like project, you can make donations!</h5>
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