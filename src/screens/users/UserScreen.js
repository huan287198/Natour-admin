import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers, deleteUser, countReviews } from '../../actions/userActions';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

export default function UserScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [role, setRole] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const userList = useSelector(state => state.userList);
    const { users, loading, error } = userList;
    // console.log(lenReview);

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    // const countBook = useSelector(state => state.countBook);
    // const { length: lenBook } = countBook;

    // const countReview = useSelector(state => state.countReview);
    // const { length: lenReview } = countReview;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listUsers());
        return () => {
        //
        };
    }, [dispatch, successDelete]);

    const deleteConfirmed = (id) => {
        let answer = window.confirm(
            "Are you sure you want to delete user?"
        );
        if (answer) {
            deleteHandler(id);
        }
    };

    const deleteHandler = (bookId) => {
        dispatch(deleteUser(bookId));
    }
    
    const openModal = (user) => {
        setModalVisible(true);
        setEmail(user.email);
        setName(user.name);
        setPhoto(user.photo);
        setRole(user.role);
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
                Danh sách users &nbsp;&nbsp;
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
            {modalVisible && (
                <div className="form">
                <form >
                  <div className="form-group" >
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" value={name} required="required">
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email" value={email} required="required">
                    </input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">role</label>
                    <input onChange={(e) => setRole(e.target.value)} type="text" className="form-control" id="role" value={role} required="required">
                    </input>
                  </div>
                  <div className="form-group field__module field__style2 mb-15 ">
                    <label htmlFor="imageCover">Photo</label>
                    <div className="field__wrap">
                      <img 
                        src={`http://localhost:5000/img/users/${photo}`}
                        id="outputImageCover" alt='imagecover' style={ imgStyle }
                      />
                      <input type="file" className="form-control" name="fileFeature" id="imageCover" accept="image/*"  />
                      <label htmlFor="imageCover">Choose new photo</label>          
                    </div>
                  </div> 
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
                        <th>Email</th>
                        <th>Vai trò</th>
                        <th className="td-actions text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <div>Loading...</div> : 
                            error ? <div>{error}</div> :
                            users.map((user, i) => {
                                return (<tr key={i}>
                                    <td className="text-left">{i+1}</td>
                                    <td>{user.name}</td>
                                    <td>
                                        <img 
                                            src={`http://localhost:5000/img/users/${user.photo}`} 
                                            alt="user"
                                            style={ imgStyle }
                                        />
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className="td-actions text-right">
                                        <button type="button" rel="tooltip" className="btn btn-success" onClick={() => openModal(user)}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button  type="button" rel="tooltip" onClick={() => deleteConfirmed(user._id)}
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
