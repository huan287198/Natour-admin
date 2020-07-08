import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listTours, deleteTour, saveTour } from '../../actions/tourActions';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

export default function TourScreen2(props) {
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
    const [id, setId] = useState('');
    const [imageCoverName, setImageCoverName] = useState('');
    const [image1Name, setImage1Name] = useState('');
    const [image2Name, setImage2Name] = useState('');
    const [image3Name, setImage3Name] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [startDescription, setStartDescription] = useState('');
    const [startCoorX, setStartCoorX] = useState('');
    const [startCoorY, setStartCoorY] = useState('');
    const [secretTour, setSecretTour] = useState(true);
    const [locations, setLocations] = useState([{
      description: 'abc',
      day: 2,
      coordinates: [1,2]
    }]);
    // let locations = [];
    const [modalVisible, setModalVisible] = useState(false);

    const tourList = useSelector(state => state.tourList);
    const { tours, loading, error } = tourList;
    // console.log(tours);
    const tourDelete = useSelector(state => state.tourDelete);
    const { success: successDelete } = tourDelete;
    
    const tourSave = useSelector(state => state.tourSave);
    const { success: successSave } = tourSave;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listTours());
        return () => {
            //
        };
    }, [successSave, successDelete, dispatch]);

    const openModal = (tour) => {
        setModalVisible(true);
        setId(tour._id);
        setName(tour.name);
        setSummary(tour.summary);
        setDescription(tour.description);
        setDuration(tour.duration);
        setDifficulty(tour.difficulty);
        setMaxSize(tour.maxGroupSize);
        setPrice(tour.price);
        setStartAddress(tour.startLocation.address);
        setStartDescription(tour.startLocation.description);
        setStartCoorX(tour.startLocation.coordinates[0]);
        setStartCoorY(tour.startLocation.coordinates[0]);
        setSecretTour(tour.secretTour);
        tour.imageCover ? setImageCoverName(tour.imageCover) : setImageCoverName(null);
        tour.images ? setImage1Name(tour.images[0]) : setImage1Name(null);
        tour.images ? setImage2Name(tour.images[1]) : setImage2Name(null);
        tour.images ? setImage3Name(tour.images[2]) : setImage3Name(null);
        // tour.locations.length > 0 ? locations = [...tour.locations] : locations = [];
        tour.locations.length > 0 ? setLocations(tour.locations) : setLocations(null);
        
      }
      // setLocations([1,2]);
      // console.log(locations);

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
        // form.append('startLocation.coordinates[0]', startCoorX);
        // form.append('startLocation.coordinates[1]', startCoorY);
        // form.append('startLocation.description', startDescription);
        // form.append('startLocation.address', startAddress);
        form.append('imageCover', imageCover);
        form.append('images', image1);
        form.append('images', image2);
        form.append('images', image3);
        
        // form.append('secretTour', false);
        dispatch(saveTour(form, id));
    }

    const deleteConfirmed = (id) => {
        let answer = window.confirm(
            "Are you sure you want to delete tour?"
        );
        if (answer) {
            deleteHandler(id);
        }
    };

    const deleteHandler = (tourId) => {
        dispatch(deleteTour(tourId));
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

    const scrollStyle = {
        overflow: 'scroll'
    }

    const imgStyle = {
        height: '8rem',
        width: '8rem'
    }

    return (<div className="main-wrapper">
    <Sidebar history={props.history}/>
    <div className="container-fluid main-content main-panel">
        <Navbar history={props.history}/>
        <section className="main-content__list" style={ scrollStyle }>
            <div className="main-content__list-title">
                <span>
                Danh sách tours &nbsp;&nbsp;
                <Link to='/tours/create'>
                    <button className="btn btn-success btn-round">
                        <i className="material-icons">create</i>
                        Tạo mới
                    </button>
                </Link>
                </span>
                <div className="p-pagination">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                    {/* <li>1</li>
                    <li>2</li> */}
                    </ul>
                </nav>
                </div>
            </div>
            {modalVisible && (
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
                    <textarea onChange={(e) => setDescription(e.target.value)} type="textarea" className="form-control" id="description" value={description} required="required">
                    </textarea>
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
                    <label htmlFor="imageCover">Image Cover</label>
                    <div className="field__wrap">
                      <img 
                        src={`http://localhost:5000/img/tours/${imageCoverName}`}
                        id="outputImageCover" alt='imagecover' style={ imgStyle }
                      />
                      <input type="file" className="form-control" name="fileFeature" id="imageCover" accept="image/*"  onChange={onChange}/>
                      <label htmlFor="imageCover">Choose new photo</label>          
                    </div>
                  </div> 
                  <div className="form-group field__module field__style2 mb-15 ">
                    <label htmlFor="image1">Image 1</label>
                    <div className="field__wrap">
                      <img 
                        src={image1Name ? `http://localhost:5000/img/tours/${image1Name}` : `http://localhost:5000/img/tours/tour-1-1.jpg`}
                        id="outputImage1" alt='image1' style={ imgStyle }
                      />
                      <input type="file" className="form-control" name="fileFeature" id="image1" accept="image/*"  onChange={onChange1}/>
                      <label htmlFor="image1">Choose new photo</label>          
                    </div>
                  </div> 
                  <div className="form-group field__module field__style2 mb-15 ">
                    <label htmlFor="image2">Image 2</label>
                    <div className="field__wrap">
                      <img 
                        src={image2Name ? `http://localhost:5000/img/tours/${image2Name}` : `http://localhost:5000/img/tours/tour-1-1.jpg`}
                        id="outputImage2" alt='image2' style={ imgStyle }
                      />
                      <input type="file" className="form-control" name="fileFeature" id="image2" accept="image/*"  onChange={onChange2}/>
                      <label htmlFor="image2">Choose new photo</label>          
                    </div>
                  </div> 
                  <div className="form-group field__module field__style2 mb-15 ">
                    <label htmlFor="image3">Image 3</label>
                    <div className="field__wrap">
                      <img 
                        src={image3Name ? `http://localhost:5000/img/tours/${image3Name}` : `http://localhost:5000/img/tours/tour-1-1.jpg`}
                        id="outputImage3" alt='image3' style={ imgStyle }
                       />
                      <input type="file" className="form-control" name="fileFeature" id="image3" accept="image/*"  onChange={onChange3}/>
                      <label htmlFor="image3">Choose new photo</label>          
                    </div>
                  </div> 
            
                  <div className="form-group">
                    <label htmlFor="price">Start location</label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="des">Description</label>
                    <input onChange={(e) => setStartDescription(e.target.value)} type="text" className="form-control" id="des" value={startDescription} required="required">
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input onChange={(e) => setStartAddress(e.target.value)} type="text" className="form-control" id="address" value={startAddress} required="required">
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="X">X</label>
                    <input onChange={(e) => setStartCoorX(e.target.value)} type="text" className="form-control" id="X" value={startCoorX} required="required">
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Y">Y</label>
                    <input onChange={(e) => setStartCoorY(e.target.value)} type="text" className="form-control" id="Y" value={startCoorY} required="required">
                    </input>
                  </div>
                  {locations ? locations.map((location, i) => {
                      return (
                        <div>
                          <div className="form-group" key={i}>
                            <label>{`Location ${i+1}`}</label>
                          </div>
                          <div className="form-group" key={i}>
                            <label htmlFor={`des${i+1}`}>Description</label>
                            <input className="form-control" id={`des${i+1}`} type="text" value={location.description} />
                          </div>
                          <div className="form-group" >
                            <label htmlFor={`X${i+1}`}>X</label>
                            <input className="form-control" id={`X${i+1}`} type="number" value={location.coordinates[0]} />
                          </div>
                          <div className="form-group" >
                            <label htmlFor={`Y${i+1}`}>Y</label>
                            <input className="form-control" id={`Y${i+1}`} type="number" value={location.coordinates[1]}  />
                          </div>
                          <div className="form-group" >
                            <label htmlFor={`day${i+1}`}>Day</label>
                            <input className="form-control" id={`day${i+1}`} type="number" value={location.day} />
                          </div>
                        </div>
                      )
                  }) : ''}
                  <div className="form-group">
                    <input type="checkbox" id="secretTour" name="secreTour" value="secretTour" 
                      checked={secretTour === false ? 'checked' : null}>
                    </input>
                    <label htmlFor="secretTour"> Public </label>
                  </div>
                  {/* <div className="form-group">
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
                  </div> */}
                  
                  <div className="form-group pull-right">
                    <button type="submit" name="submit" className="btn btn-primary">Submit</button>
                    <button className="btn btn-primary" onClick={() => setModalVisible(false)}>
                        Cancle
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="list table-responsive">
                <table className="table border">
                    <thead>
                        <tr>
                        <th className="text-left">#</th>
                        <th>Tên</th>
                        <th>Ảnh đại diện</th>
                        <th width="200px">Tổng quan</th>
                        <th>Thời gian</th>
                        <th>Loại tour</th>
                        <th>Trạng thái</th>
                        <th className="td-actions text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <div>Loading...</div> : 
                            error ? <div>{error}</div> :
                            tours.map((tour, i) => {
                                // const date = new Date(tour.createdAt).toDateString();
                                return (<tr key={i}>
                                    <td className="text-left">{i+1}</td>
                                    <td>{tour.name}</td>
                                    <td>
                                        <img 
                                            src={`http://localhost:5000/img/tours/${tour.imageCover}`} 
                                            alt="tour"
                                            style={ imgStyle }
                                        />
                                    </td>
                                    <td>{tour.summary}</td>
                                    <td>{`${tour.duration} ngày`}</td>
                                    <td>Tour ngoài nước</td>
                                    <td>Còn chỗ</td>
                                    <td className="td-actions text-right">
                                        <button type="button" rel="tooltip" className="btn btn-success" onClick={() => openModal(tour)}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        
                                        <button  type="button" rel="tooltip"  onClick={() => deleteConfirmed(tour._id)}
                                        className="btn btn-list-category-delete btn-danger">
                                        <i className="material-icons">close</i>
                                        </button>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</div>
    )
}
