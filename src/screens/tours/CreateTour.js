import React, { Component } from "react";
import { Link } from 'react-router-dom';
// import axios from "axios";
import { createTour } from './apiTour';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

class CreateTour extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            duration: '',
            maxGroupSize: '',
            difficulty: '',
            price: '',
            summary: '',
            description: ''
        };
    }

    componentDidMount() {
        
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    }

    onFileSelected = (e) => {
        this.avatar = e.target.files[0]
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    createTour = (e) => {
        e.preventDefault();
        const { name, duration, maxGroupSize, difficulty, price, summary, description } = this.state;
        const form = new FormData();
        form.append('name', name);
        form.append('summary', summary);
        form.append('description', description);
        form.append('duration', duration);
        form.append('maxGroupSize', maxGroupSize);
        form.append('difficulty', difficulty);
        form.append('price', price);
        form.append('startLocation.coordinates[0]', document.getElementById('X').value);
        form.append('startLocation.coordinates[1]', document.getElementById('Y').value);
        form.append('startLocation.description', document.getElementById('des').value);
        form.append('startLocation.address', document.getElementById('address').value);
        form.append('locations[0].coordinates[0]', document.getElementById('X1').value);
        form.append('locations[0].coordinates[1]', document.getElementById('Y1').value);
        form.append('locations[0].description', document.getElementById('des1').value);
        form.append('locations[0].day', document.getElementById('day1').value);
        form.append('locations[1].coordinates[0]', document.getElementById('X1').value);
        form.append('locations[1].coordinates[1]', document.getElementById('Y1').value);
        form.append('locations[1].description', document.getElementById('des1').value);
        form.append('locations[1].day', document.getElementById('day1').value);
        form.append('secretTour', true);
        createTour(form)
        .then(res => {
            if(res) {
                this.props.history.push(`/tours`);
            }
        });
    }

    scrollStyle = {
        overflow: 'scroll'
    }

    render(){
        const { name, duration, maxGroupSize, difficulty, price, summary, description } = this.state;
        return (
            <div className="main-wrapper">
        <Sidebar history={this.props.history}/>
        <div className="container-fluid main-content main-panel">
            <Navbar history={this.props.history}/>
            <section className="main-content__list" style={ this.scrollStyle }>
  <div className="main-content__list-title">
    <span>Tạo mới tour</span>
  </div>
  <div className="form">
    <form >
      <div className="form-group" >
        <label htmlFor="name">Name</label>
        <input onChange={this.handleChange("name")} type="text" className="form-control" id="name" value={name} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <input onChange={this.handleChange("summary")} type="text" className="form-control" id="summary" value={summary} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input onChange={this.handleChange("description")} type="text" className="form-control" id="description" value={description} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input onChange={this.handleChange("duration")} type="text" className="form-control" id="duration" value={duration} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <input onChange={this.handleChange("difficulty")} type="text" className="form-control" id="difficulty" value={difficulty} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="maxSize">MaxSize</label>
        <input onChange={this.handleChange("maxGroupSize")} type="text" className="form-control" id="maxSize" value={maxGroupSize} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input onChange={this.handleChange("price")} type="text" className="form-control" id="price" value={price} required="required">
        </input>
      </div>
      

      <div className="form-group">
        <label htmlFor="price">Start location</label>
      </div>
      <div className="form-group">
        <label htmlFor="des">Description</label>
        <input className="form-control" id="des" type="text"  />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input className="form-control" id="address" type="text"  />
      </div>
      <div className="form-group">
        <label htmlFor="X">X</label>
        <input className="form-control" id="X" type="number"  />
      </div>
      <div className="form-group">
        <label htmlFor="Y">Y</label>
        <input className="form-control" id="Y" type="number"  />
      </div>
      <div className="form-group">
        <label htmlFor="des">Location 1</label>
      </div>
      <div className="form-group">
        <label htmlFor="des1">Des</label>
        <input className="form-control" id="des1" type="text"  />
      </div>
      <div className="form-group">
        <label htmlFor="X1">X</label>
        <input className="form-control" id="X1" type="number"  />
      </div>
      <div className="form-group">
        <label htmlFor="Y1">Y</label>
        <input className="form-control" id="Y1" type="number"   />
      </div>
      <div className="form-group">
        <label htmlFor="day1">Day</label>
        <input className="form-control" id="day1" type="number"   />
      </div>
      <div className="form-group">
        <label>Location 2</label>
      </div>
      <div className="form-group">
        <label htmlFor="des2">Description</label>
        <input className="form-control" id="des2" type="text"/>
      </div>
      <div className="form-group">
        <label htmlFor="X2">X</label>
        <input className="form-control" id="X2" type="number" />
      </div>
      <div className="form-group">
        <label htmlFor="Y2">Y</label>
        <input className="form-control" id="Y2" type="number"  />
      </div>
      <div className="form-group">
        <label htmlFor="day2">Day</label>
        <input className="form-control" id="day2" type="number"  />
      </div>

      <div className="form-group pull-right">
        <button onClick={this.createTour} type="submit" name="submit" className="btn btn-primary">Submit</button>
        <Link to='/tours'>
            <button className="btn btn-primary">Cancle</button>
        </Link>
      </div>
    </form>
  </div>
</section>
        </div>
        </div>
            
        )
    }
}
export default CreateTour;