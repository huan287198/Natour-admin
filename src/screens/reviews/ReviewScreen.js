import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listReviews } from '../../actions/reviewActions';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

export default function UserScreen(props) {
    const reviewList = useSelector(state => state.reviewList);
    const { reviews, loading, error } = reviewList;
    console.log(reviews);

    // const userDelete = useSelector(state => state.userDelete);
    // const { success: successDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listReviews());
        return () => {
        //
        };
    }, [dispatch]);

    // const deleteConfirmed = (id) => {
    //     let answer = window.confirm(
    //         "Are you sure you want to delete user?"
    //     );
    //     if (answer) {
    //         deleteHandler(id);
    //     }
    // };

    // const deleteHandler = (bookId) => {
    //     dispatch(deleteUser(bookId));
    // }

    // const imgStyle = {
    //     height: '8rem',
    //     width: '8rem'
    // }

    return (<div className="main-wrapper">
    <Sidebar history={props.history}/>
    <div className="container-fluid main-content main-panel">
        <Navbar history={props.history}/>
        <section className="main-content__list">
            <div className="main-content__list-title">
                <span>
                Danh sách reviews &nbsp;&nbsp;
                <button className="btn btn-success btn-round">
                    <a href="!">
                    <i className="material-icons">create</i>
                    Tạo mới
                    </a>
                </button>
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
                        <th>Tour</th>
                        <th>User</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th className="td-actions text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <div>Loading...</div> : 
                            error ? <div>{error}</div> :
                            reviews.map((review, i) => {
                                // const date = new Date(user.createdAt).toDateString();
                                console.log(review);
                                return (<tr key={i}>
                                    <td className="text-left">{i+1}</td>
                                    <td>{review.tour.name}</td>
                                    <td>{review.user.name}</td>
                                    <td>{review.review}</td>
                                    <td>{review.rating}</td>
                                    <td className="td-actions text-right">
                                        <button type="button" rel="tooltip" className="btn btn-success">
                                        <a href="!">
                                            <i className="material-icons">edit</i>
                                        </a>
                                        </button>
                                        <button  type="button" rel="tooltip"
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
