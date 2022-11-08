import Realist from "../../Contexts/Realist";
import List from "./List";
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import DataContext from "../../Contexts/DataContext";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [ideas, setIdeas] = useState(null);
    const [reals, setReals] = useState(null);
    const [createData, setCreateData] = useState(null)
    const { makeMsg } = useContext(DataContext);
    
    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }

    // READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/home/ideas', authConfig())
            .then(res => {
                setIdeas(reList(res.data));
            })
    }, [lastUpdate]);

     useEffect(() => {
         if (null === reals) {
             return;
         }
         axios.delete('http://localhost:3003/server/ideas/' + reals.id, authConfig())
             .then(res => {
                 setLastUpdate(Date.now());
                 makeMsg(res.data.text, res.data.type);
             })
     }, [reals, makeMsg]);
     console.log(reals)

     useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/home/prop', createData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
                makeMsg(res.data.text, res.data.type);
            });
    }, [createData, makeMsg]);
   
    return (
        <Realist.Provider value={{
            setReals,
            ideas,
            setCreateData
                    }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <List />
                    </div>
                </div>
            </div>
        </Realist.Provider>
    );
}

export default Main;