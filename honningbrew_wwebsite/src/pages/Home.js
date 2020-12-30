import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom'

// TODO fare i pulsanti
// TODO implemenatare altre funzioni?

export function Home() {

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/v1/')
            .then(res => res.json())
            .then((result) => {
                setItems(result);
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

            <div class="m-3">
                <div class="text-title">
                    <button type="button" class="btn btn-light">Aggiungi batteria</button>
                    <button type="button" class="btn btn-light"> Degustazioni</button>
                    <button type="button" class="btn btn-light"> Elimina batteria</button>
                </div>
                <div class="text-title">
                    <Col>

                        <Row>  <h3>Lista batterie </h3></Row>
                        <Row>
                            <div role="tablist">
                                <ul class="list-unstyled">
                                    {items.map(item => (
                                        <li key={item.id}>
                                            <Link class="list-group-item list-group-item-action" to={"/" + item.name}>
                                            <h5>
                                                Batteria {item.name}
                                            </h5>
                                        </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Row>
                    </Col>
                </div>
            </div>

        );
    }
}

export default Home;