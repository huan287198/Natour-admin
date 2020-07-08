import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailTour } from '../../actions/tourActions';
import { updateTour } from './apiTour';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

export default function EditTour(props) {
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [maxSize, setMaxSize] = useState('');
    const [price, setPrice] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');

    const tourDetail = useSelector(state => state.tourDetail);
    const { tour, loading, error } = tourDetail;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailTour(props.match.params.tourId));
        return () => {
            //
        };
    }, [dispatch, props.history, props.match.params.tourId]);

    const scrollStyle = {
        overflow: 'scroll'
    }
    const imageStyle = {
        height: '10rem',
        width: '10rem'
    }

    const onChange = e => {
        setImageCover(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImageCover');
          output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const onChange1 = e => {
        setImage1(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImage1');
          output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const onChange2 = e => {
        setImage2(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImage2');
          output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const onChange3 = e => {
        setImage3(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('outputImage3');
          output.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const submitHandle = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', name);
        form.append('summary', summary);
        form.append('description', description);
        form.append('duration', duration);
        form.append('maxGroupSize', maxSize);
        form.append('difficulty', difficulty);
        form.append('price', price);
        form.append('imageCover', imageCover);
        // form.append('image', image1);
        // form.append('image', image2);
        // form.append('image', image3);
        form.append('startLocation.coordinates[0]', document.getElementById('X').value);
        form.append('startLocation.coordinates[1]', document.getElementById('Y').value);
        form.append('startLocation.description', document.getElementById('des').value);
        form.append('startLocation.address', document.getElementById('address').value);
        // form.append('locations[0].coordinates[0]', document.getElementById('X1').value);
        // form.append('locations[0].coordinates[1]', document.getElementById('Y1').value);
        // form.append('locations[0].description', document.getElementById('des1').value);
        // form.append('locations[0].day', document.getElementById('day1').value);
        // form.append('locations[1].coordinates[0]', document.getElementById('X1').value);
        // form.append('locations[1].coordinates[1]', document.getElementById('Y1').value);
        // form.append('locations[1].description', document.getElementById('des1').value);
        // form.append('locations[1].day', document.getElementById('day1').value);

        updateTour({form});

    }

    return (
    loading ? <div>loading...</div> :
    error ? <div>{error}</div>:
    <div className="main-wrapper">
        <Sidebar history={props.history}/>
        <div className="container-fluid main-content main-panel">
            <Navbar history={props.history}/>
            <section className="main-content__list" style={ scrollStyle }>
  <div className="main-content__list-title">
    <span>Tạo mới tour</span>
  </div>
  <div className="form">
    <form onSubmit={submitHandle}>
      <div className="form-group" >
        <label htmlFor="name">Name</label>
        <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" value={name} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="summary">Summary</label>
        <input onChange={(e) => setSummary(e.target.value)} type="text" className="form-control" id="summary" value={summary} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" id="description" value={description} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input onChange={(e) => setDuration(e.target.value)} type="text" className="form-control" id="duration" value={duration} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <input onChange={(e) => setDifficulty(e.target.value)} type="text" className="form-control" id="difficulty" value={difficulty} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="maxSize">MaxSize</label>
        <input onChange={(e) => setMaxSize(e.target.value)} type="text" className="form-control" id="maxSize" value={maxSize} required="required">
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input onChange={(e) => setPrice(e.target.value)} type="text" className="form-control" id="price" value={price} required="required">
        </input>
      </div>
      <div className="form-group field__module field__style2 mb-15 ">
        <label for="imageCover">Image Cover</label>
        <div className="field__wrap">
          <img id="outputImageCover" alt='imagecover' style={ imageStyle }/>
          <input type="file" className="form-control" name="fileFeature" id="imageCover" accept="image/*"  onChange={onChange}/>
          <label htmlFor="imageCover">Choose new photo</label>          
        </div>
      </div> 
      <div className="form-group field__module field__style2 mb-15 ">
        <label for="image1">Image 1</label>
        <div className="field__wrap">
          <img id="outputImage1" alt='image1' style={ imageStyle }/>
          <input type="file" className="form-control" name="fileFeature" id="image1" accept="image/*"  onChange={onChange1}/>
          <label htmlFor="image1">Choose new photo</label>          
        </div>
      </div> 
      <div className="form-group field__module field__style2 mb-15 ">
        <label for="image2">Image 2</label>
        <div className="field__wrap">
          <img id="outputImage2" alt='image2' style={ imageStyle }/>
          <input type="file" className="form-control" name="fileFeature" id="image2" accept="image/*"  onChange={onChange2}/>
          <label htmlFor="image2">Choose new photo</label>          
        </div>
      </div> 
      <div className="form-group field__module field__style2 mb-15 ">
        <label for="image3">Image 3</label>
        <div className="field__wrap">
          <img id="outputImage3" alt='image3' style={ imageStyle }/>
          <input type="file" className="form-control" name="fileFeature" id="image3" accept="image/*"  onChange={onChange3}/>
          <label htmlFor="image3">Choose new photo</label>          
        </div>
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
        <button type="submit" name="submit" className="btn btn-primary">Submit</button>
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
