import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import { FormatDate } from './SetDetails'
import { DelOps } from './../components/DelOps'

function OpDescription(operation) {

    const op = operation.operation
    const [error, setError] = useState(null);
    const [barrel, setBarrel] = useState([]);
    const [barrelDestination, setBarrelDestination] = useState([]);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/detail/' + op.barrel)
            .then(res => res.json())
            .then((result) => {
                setBarrel(result);
            },
                (error) => {
                    setError(error);
                }
            )
        console.log(op.barrel_destination)
        if (op.barrel_destination) {
            fetch('http://127.0.0.1:8000/api/v1/detail/' + op.barrel_destination)
                .then(res => res.json())
                .then((result) => {
                    setBarrelDestination(result);
                },
                    (error) => {
                        setError(error);
                    }
                )
            console.log(barrelDestination)
        }
    }, [op.barrel, op.barrel_destination])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <div>
                <h5 className="text-normal"> Barile nella posizione {barrel.pos}</h5>

                <h5 className="text-title"> Data </h5>
                <h5 className="text-normal">
                    <FormatDate datetime={op.datetime} />
                </h5>

                {op.name === "Rabbocco" ?
                    <div>
                        <h5 className="text-title"> Quantità </h5>
                        <h5 className="text-normal">
                            {Math.abs(op.quantity)} litri
        </h5>
                        <h5 className="text-title"> Barile di destinazione</h5>
                        <h5 className="text-normal">Barile in posizione     {barrelDestination.pos}</h5>
                    </div> : null}
                {op.name === "Misurazione" ?
                    <div>
                        <h5 className="text-title"> Quantità </h5>
                        <h5 className="text-normal">
                            {Math.abs(op.quantity)} litri
        </h5>
                        <h5 className="text-title"> Tipologia di misurazione</h5>
                        <h5 className="text-normal">{op.type_measure}</h5>
                    </div> : null}
                {op.name === "Degustazione" ?
                    <div>
                        <h5 className="text-title"> Descrizione</h5>
                        <h5 className="text-normal">{op.description}</h5>
                    </div> : null}
                {op.name === "Aggiunta mosto" ?
                    <div>
                        <h5 className="text-title"> Quantità </h5>
                        <h5 className="text-normal">
                            {Math.abs(op.quantity)} litri
        </h5>
                        <h5 className="text-title"> Tipologia di mosto</h5>
                        <h5 className="text-normal">{op.type_mosto}</h5>
                    </div> : null}
                {op.name === "Prelievo" ?
                    <div>
                        <h5 className="text-title"> Quantità </h5>
                        <h5 className="text-normal">
                            {Math.abs(op.quantity)} litri
        </h5>
                    </div> : null}
            </div>
        )
    }
}

export function OperationDetails({ match }) {

    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id + '/ops/' + match.params.pos)
            .then(res => res.json())
            .then((result) => {
                setItem(result);
            },
                (error) => {
                    setError(error);
                }
            )
    }, [match.params.id, match.params.id])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        if (item.length !== 1) {
            return (
                <div className="text-title">
                    ERRORE: errore nel database più elementi con lo stesso ID
                </div>
            )
        } else {
            return (

                <div className="App">
                    <ul className="m-3">
                        {item.map((op) => <li key={op.id} className="list-unstyled">

                            <Row className="text-title"> <h3>Operazione di {op.name} </h3>
                                <DelOps match={match.params} className="text-title" />
                                <Col>
                                    <h2 className="text-white">Batteria {match.params.id} </h2>
                                </Col>
                            </Row>
                            <div className="text-normal">
                                <OpDescription operation={op} />
                            </div>
                        </li>
                        )}
                    </ul>
                </div>
            );
        }
    }
}

export default OperationDetails;