import React, { Component } from 'react'

export const TYPE_WOODS = [
  { value: 'Rovere', label: 'Rovere' },
  { value: 'Castagno', label: 'Castagno' },
  { value: 'Frassino', label: 'Frassino' },
  { value: 'Ginepro', label: 'Ginepro' },
  { value: 'Ciliegio', label: 'Ciliegio' },
  { value: 'Pero e melo', label: 'Pero e melo' },
  { value: 'Robinia', label: 'Robinia' },
  { value: 'Gelso', label: 'Gelso' }]

export class AddBarrel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typeWood: "Rovere",
      capacity: 0,
      flag: false,
    };
  }

  setFlag = () => {
    this.flag = this.setState({ flag: !this.state.flag })
  }

  myChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value })

  }

  submitHandler = () => {

    var set_name = this.props.match.id
    var number_battery = set_name.toString().charCodeAt(0) - 64
    var body_instance = {}
    if (this.state.typeWood !== "" && this.state.capacity >= 0) {
      body_instance = {
        'type_wood': this.state.typeWood,
        'capacity': this.state.capacity,
        'battery': number_battery
      }
    } else {
      if (this.state.typeWood !== "") {
        body_instance = {
          'type_wood': this.state.typeWood,
          'battery': number_battery
        }
      }
      if (this.state.capacity >= 0) {
        body_instance = {
          'capacity': this.state.capacity,
          'battery': number_battery
        }
      }
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body_instance)
    };
    fetch('http://127.0.0.1:8000/api/v1/' + this.props.match.id + '/' , requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));

  }

  formBody = () => {
    const { typeWood, capacity } = this.state
    return (
      <div class="card">
        <div class="card-body">
          <form onSubmit={this.submitHandler}>
            <h6>Tipo di legno</h6>
            <select name="typeWood" value={typeWood} onChange={this.myChangeHandler}>
              {TYPE_WOODS.map((tw, key) => {
                return (<option key={key} value={tw.value}>{tw.label}</option>)
              })}

            </select>
            <h6>Capacità</h6>
            <input type="number" name="capacity" value={capacity} onChange={this.myChangeHandler} />
            <p className="button"><button class="btn btn-light" type="submit">Aggiungi barile</button></p>
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

export default AddBarrel;