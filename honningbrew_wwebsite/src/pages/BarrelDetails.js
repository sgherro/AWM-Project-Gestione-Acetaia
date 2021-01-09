import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { DelBarrel } from '../components/DelBarrel'
import { ModBarrel } from './../components/ModBarrel'
import { FormatDate} from './SetDetails'

function GetOpsList(barrelId) {

    const [error, setError] = useState(null);
    const [operations, setOperations] = useState([]);


    useEffect(() => {
        console.log(barrelId.barrelId)
        fetch('http://127.0.0.1:8000/api/v1/opslist/' + barrelId.barrelId)
            .then(res => res.json())
            .then((result) => {
                setOperations(result);
            },
                (error) => {
                    setError(error);
                }
            )
        console.log(operations)
    },[barrelId.barrelId])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <div>
                <Row>  <h3 className="text-title">Operazioni nel barile</h3>
                </Row>
                <Row className="text-title">
                    <div className="list-group" id="list-tab" role="tablist">
                        <ul className ="list-unstyled">
                            {operations.length !== 0 ? operations.map(op => (
                                <li key={op.id} className="list-group-item">  
                                    <h5 className="text-title">{op.name}</h5>
                                    <h5 className="text-normal">Data:    <FormatDate datetime={op.datetime} /></h5>
                                    <h5 className="text-normal">Quantità: {Math.abs(op.quantity)} litri</h5>
                                </li>
                            )) : <h5 className="text-normal">
                                    Nessuna operazione presente
                                </h5>
                            }
                        </ul>
                    </div>
                </Row>
            </div>
        )
    }
}


export function BarrelDetails({ match }) {

    const [error, setError] = useState(null);
    const [item, setItem] = useState([]);
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/' + match.params.id + '/' + match.params.pos)
            .then(res => res.json())
            .then((result) => {
                setItem(result);
            },
                (error) => {
                    setError(error);

                }
            )
    }, [match.params.id, match.params.pos])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        if (item.length !== 1) {
            return (
                <div className="text-white">Error: errore nel database più elementi con lo stesso ID</div>
            )
        } else {
            return (
                <div className="App">
                    <Col>
                        <ul className="m-3">

                            {item.map(barrel => <li className="list-unstyled" key={barrel.id}>
                                <Row>
                                    <h3 className="text-title">Dettagli barile</h3>
                                    <ModBarrel match={match.params} className="text-title" />
                                    <DelBarrel match={match.params} className="text-title" />
                                    <Col>
                                        <h2 className="text-white">Batteria {match.params.id} </h2>
                                    </Col>
                                </Row>
                                <div>
                                    <h5 class="text-normal"> Posizione {barrel.pos}</h5>
                                    <h5 class="text-title"> Capacità </h5>
                                    <h5 className="text-normal">
                                        {barrel.capacity} litri</h5>
                                    <h5 class="text-title"> Tipologia di legno </h5>
                                    <h5 className="text-normal">
                                        {barrel.type_wood}</h5>
                                        <h5 class="text-title"> Acidità </h5>
                                    <h5 className="text-normal">
                                        {barrel.acidity}</h5>
                                </div>

                                < GetOpsList className="m-3" barrelId={barrel.id} />
                            </li>
                            )}
                        </ul>
                    </Col>
                </div>
            );
        }
    }
}

export default BarrelDetails;