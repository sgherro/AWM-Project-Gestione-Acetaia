import React, { useState, useEffect } from 'react'
import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom'
import { AddBarrel } from './../components/AddBarrel'
import { AddOps } from '../components/AddOps';


export function FormatDate(datetime) {
    const newDate = new Date(datetime.datetime).toLocaleDateString()
    const newHour = new Date(datetime.datetime).getHours()
    return (
        <div> {newDate}, ore {newHour}</div>
    )
}

export function SetDetails({ match }) {

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [operations, setOperations] = useState([]);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
            },
                (error) => {
                    setError(error);
                }
            )

        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id + '/ops')
            .then(res => res.json())
            .then((result) => {
                setOperations(result);
            },
                (error) => {
                    setError(error);
                }
            )

    }, [])


    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        return (

            <div className="m-4">
                <Row>
                    <Col xs={2}>
                        <Row className="text-title">  <h3>Lista barili </h3>
                            <AddBarrel match={match.params} className="text-title" />
                        </Row>

                        <Row className="text-normal"> 
                            <div className="list-group" id="list-tab" role="tablist">
                                <ul className="list-unstyled">
                                    {items.map(item => (

                                        <li key={item.id}>
                                            <Link className="list-group-item list-group-item-action"
                                                to={'/' + match.params.id + '/' + item.pos}>
                                                <h5>
                                                    Barile {item.pos}
                                                </h5>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </Row>
                    </Col>
                    <Col>
                        <Row className="text-title">  <h3>Operazioni nella batteria </h3>
                            <AddOps match={match.params} barrelList={items} className="text-title" />
                        </Row>
                        <Row className="text-normal">
                            <div className="list-group" id="list-tab" role="tablist">
                                <ul className="list-unstyled">
                                    {operations.map(op => (
                                        <li key={op.id}>
                                            <Link className="list-group-item list-group-item-action"
                                                to={'/' + match.params.id + '/ops/' + op.id}>

                                                <h5>{op.name}</h5>
                                            Data    <FormatDate datetime={op.datetime} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Row>

                    </Col>

                    <Col>
                        <h2 className="text-white">Batteria {match.params.id} </h2>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default SetDetails;
