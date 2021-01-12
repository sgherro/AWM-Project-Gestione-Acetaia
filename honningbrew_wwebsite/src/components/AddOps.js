import React, { Component } from 'react'


export class AddOps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typeOps: "Prelievo",
            quantity: 0,
            flag: false,
            barrel: 0,
            barrelDestination: 0,
            typeMosto: "",
            data: "",
            description: "Nessuna descrizione",
            typeMeasure: "",
        };
    }

    addQuantity = (barrelId) =>{
        console.log("barrel " + barrelId)
        console.log(this.state.quantity)
        const body_instance = {
            'datetime': new Date(Date.now()).toISOString(),
            'quantity': this.state.quantity,
            'barrel': barrelId
        }
        if(this.state.typeOps==="Aggiunta mosto" || this.state.barrelDestination!==0){
            if(barrelId===this.state.barrelDestination || this.state.typeOps==="Aggiunta mosto")
                body_instance['quantity'] = (0 - this.state.quantity).toString()
        }
              const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body_instance)
              };
              fetch('http://127.0.0.1:8000/api/v1/barrel/' , requestOptions)
              .then((res) => res.json())
              .then((result) => console.log(result))
        }

    setFlag = () => {
        this.flag = this.setState({ flag: !this.state.flag })
    }

    myChangeHandler = (event) => {
        this.setState({ typeOps: event.target.value })
    }

    targetChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        console.log(this.state)
    }

    formBarrelList = () => {

        const barrelList = this.props.barrelList
        const { barrel } = this.state
        return (
        <form>
            <p>Scegli un barile da associare</p>
            <p>
                <select value={barrel} name="barrel" onChange={this.targetChangeHandler}>
                    <option> - </option>
                    {barrelList.map((b, key) => {
                        return (<option key={key} value={b.id}>{b.pos}</option>)
                    }
                    )}
                </select>
            </p>
        </form>
        )
    }

    formBarrelDestList = () => {

        const barrelList = this.props.barrelList
        const { barrelDestination } = this.state
        return (<form>
            <p>Scegli il barile di destinazione</p>
            <p>
                <select value={barrelDestination} name="barrelDestination" onChange={this.targetChangeHandler}>
                <option> - </option>
                    {barrelList.map((b, key) => {
                        return (<option key={key} value={b.id}>{b.pos}</option>)
                    }
                    )}
                </select>
            </p>
        </form>
        )
    }

    submitHandler = () => {

        var body_instance = {}
        if (this.state.typeOps !== "") {
            body_instance = {
                'datetime': new Date(Date.now()).toISOString(),
                'quantity': this.state.quantity,
                'name': this.state.typeOps,
                'barrel': this.state.barrel
            }
            if (this.state.typeOps === "Rabbocco" )
            if(this.state.barrelDestination!== 0) {
                body_instance['barrel_destination'] = this.state.barrelDestination
                body_instance['quantity'] = (0 - this.state.quantity).toString()

            }else{
                alert("Errore nella scelta del barile di destinazione, per favore riprovare")
            }
        
            if (this.state.typeOps === "Misurazione")
            if(this.state.typeMeasure!=="") {
                body_instance['type_measure'] = this.state.typeMeasure
            }else{
                alert("Errore nella descrizione della misurazione, per favore riprovare")
            }
        
            if (this.state.typeOps === "Aggiunta mosto")
            if (this.state.typeMosto!=="") {
                body_instance['type_mosto'] = this.state.typeMosto
                body_instance['quantity'] = (0 - this.state.quantity).toString()
            }else{
                alert("Errore nella descrizione del mosto, per favore riprovare")
            }
            if (this.state.typeOps === "Degustazione") {
                body_instance['description'] = this.state.description
                body_instance['quantity'] = 0
            }
        } else {
            alert("Errore nel body request, riprovare")
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body_instance)
        };
        console.log(requestOptions.body)
        fetch('http://127.0.0.1:8000/api/v1/' + this.props.match.id + '/ops', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
        
        this.addQuantity(body_instance.barrel)
        if (this.state.barrelDestination !== 0){
            this.addQuantity(body_instance.barrel_destination)
        }

    }

    formPrelievo = () => {
        const { quantity } = this.state
        return (
            <div className="text-normal">
                <form>
                    <h6 >Capacità</h6>
                    <input type="number" name="quantity" value={quantity} onChange={this.targetChangeHandler} />
                </form>
                <h6>Barile coinvolto</h6>
                <this.formBarrelList />
            </div>
        )
    }

    formDegustazione = () => {
        const { description } = this.state
        return (
            <div className="text-normal">
                <form>
                    <h6 >Descrizione</h6>
                    <input type="text" name="description" value={description} onChange={this.targetChangeHandler} />
                </form>
                <h6>Barile coinvolto</h6>
                <this.formBarrelList />
            </div>
        )
    }

    formMisurazione = () => {
        const { quantity, typeMeasure } = this.state
        return (
            <div className="text-normal">
                <form>
                    <h6 >Capacità</h6>
                    <input type="number" name="quantity" value={quantity} onChange={this.targetChangeHandler} />
                    <h6 >Tipo di misurazione</h6>
                    <input type="text" name="typeMeasure" value={typeMeasure} onChange={this.targetChangeHandler} />
                </form>
                <h6>Barile coinvolto</h6>
                <this.formBarrelList />
            </div>
        )
    }

    formAddMosto = () => {
        const { quantity, typeMosto } = this.state
        return (
            <div className="text-normal">
                <form>
                    <h6 >Capacità</h6>
                    <input type="number" name="quantity" value={quantity} onChange={this.targetChangeHandler} />
                    <h6 >Tipo di mosto</h6>
                    <input type="text" name="typeMosto" value={typeMosto} onChange={this.targetChangeHandler} />
                </form>
                <h6>Barile coinvolto</h6>
                <this.formBarrelList />
            </div>
        )
    }

    formRabbocco = () => {
        const { quantity} = this.state
        return (
            <div className="text-normal">
                <form>
                    <h6 >Capacità</h6>
                    <input type="number" name="quantity" value={quantity} onChange={this.targetChangeHandler} />
                </form>
                <h6> Barile coinvolto</h6>
                <this.formBarrelList />
                <h6> Barile destinazione</h6>
                <this.formBarrelDestList />
            </div>
        )
    }


    formBody = () => {
        const { typeOps } = this.state
        return (
            <div className="card">
                <div className="card-body">
                    <form>
                        <h6>Tipo di operazione</h6>
                        <p className="text-normal">Scegli un tipo di operazione indicato</p>
                        <p className="text-normal">
                            <select value={typeOps} onChange={this.myChangeHandler}>
                                <option>Prelievo</option>
                                <option>Rabbocco</option>
                                <option>Misurazione</option>
                                <option>Aggiunta mosto</option>
                                <option>Degustazione</option>
                            </select>
                        </p>
                    </form>
                    {this.state.typeOps === "Rabbocco" ? <this.formRabbocco /> : null}
                    {this.state.typeOps === "Misurazione" ? <this.formMisurazione /> : null}
                    {this.state.typeOps === "Aggiunta mosto" ? <this.formAddMosto /> : null}
                    {this.state.typeOps === "Degustazione" ? <this.formDegustazione /> : null}
                    {this.state.typeOps === "Prelievo" ? <this.formPrelievo /> : null}

                    <form onSubmit={this.submitHandler}>
                        <p className="button">
                            <button className="btn btn-light" type="submit">Aggiungi operazione</button>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
    render() {

        return (
            <div>
                <div className="text-title"><button type="button"
                    className="btn btn-light" onClick={() => this.setFlag()} >
                    Aggiungi </button> </div>
                {this.state.flag ? <this.formBody /> : null}

            </div>
        );
    }
}

export default AddOps;