import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listTours, deleteTour } from '../../actions/tourActions';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

export default function TourScreen(props) {
    const tourList = useSelector(state => state.tourList);
    const { tours, loading, error } = tourList;
    // console.log(tours);
    const tourDelete = useSelector(state => state.tourDelete);
    const { success: successDelete } = tourDelete;
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listTours());
        return () => {
        //
        };
    }, [dispatch, successDelete]);

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
    

    const imgStyle = {
        height: '8rem',
        width: '8rem'
    }

    return (<div className="main-wrapper">
    <Sidebar history={props.history}/>
    <div className="container-fluid main-content main-panel">
        <Navbar history={props.history}/>
        <section className="main-content__list">
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
            <div className="list table-responsive">
                <table className="table border">
                    <thead>
                        <tr>
                        <th className="text-left">#</th>
                        <th>Tên</th>
                        <th>Ảnh đại diện</th>
                        <th>Tổng quan</th>
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
                                    <td>{tour.duration}</td>
                                    <td>{tour.difficulty}</td>
                                    <td className="td-actions text-right">
                                        <Link to={`/edit/${tour._id}`}>
                                            <button type="button" rel="tooltip" className="btn btn-success">
                                                <i className="material-icons">edit</i>
                                            </button>
                                        </Link>
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
