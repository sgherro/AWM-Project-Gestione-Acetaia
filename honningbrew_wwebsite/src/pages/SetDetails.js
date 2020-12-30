import React, { useState, useEffect } from 'react'
import { Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import { AddBarrel } from './../components/AddBarrel'
import { AddOps } from '../components/AddOps'
import { Dropdown, DropdownButton } from 'react-bootstrap'

export function FormatDate(datetime) {
    const newDate = new Date(datetime.datetime).toLocaleDateString()
    const newHour = new Date(datetime.datetime).getHours()
    return (
       <> {newDate}, ore {newHour} </>
    )
}

export function SetDetails({ match }) {

    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [operations, setOperations] = useState([]);
    const [filterYear, setFilterYear] = useState("Z")
    const listYear = ["2021", "2020", "2019","2018","2017","2016","2015","2014","2013","2012","2010"]
    
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
    }, [match.params.id])

    const selectYear = (year) => {
        setFilterYear(year)
        console.log(filterYear)
    }

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
                                    {items.length!==0 ? items.map(item => (

                                        <li key={item.id}>
                                            <Link className="list-group-item list-group-item-action"
                                                to={'/' + match.params.id + '/' + item.pos}>
                                                <h5>
                                                    Barile {item.pos}
                                                </h5>
                                            </Link>
                                        </li>
                                    )) : <h5 className="text-normal">
                                    Nessun barile presente
                                </h5>
                                    }
                                </ul>
                            </div>

                        </Row>
                    </Col>
                    <Col>
                        <Row className="text-title">  <h3>Operazioni nella batteria </h3>
                            <AddOps match={match.params} barrelList={items} className="text-title" />
                            <div>
            <DropdownButton id="dropdown-basic-button" title="Filtro per anno" >
                {listYear.length !== 0 ? listYear.map(year => {
                    return (<Dropdown.Item key={year} name="filterYear" onClick={ () => {selectYear(year)}}>
                        {year}
                    </Dropdown.Item>)}
                ) : <>Nessuna data disponibile</>}
            </DropdownButton>
        </div>
                        </Row>
                        <Row className="text-normal">
                            <div className="list-group" id="list-tab" role="tablist">
                                <ul className="list-unstyled">
                                    {operations.length!==0 ? operations.filter(oper => oper.datetime.includes(filterYear)).map(op => (
                                        <li key={op.id}>
                                            <Link className="list-group-item list-group-item-action"
                                                to={'/' + match.params.id + '/ops/' + op.id}>
                                                <h5>{op.name}</h5>
                                            Data    <FormatDate datetime={op.datetime} />
                                            </Link>
                                        </li>
                                    ))
                                    : <h5 className="text-normal">
                                    Nessuna operazione presente
                                </h5>}
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
