import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
  
    // const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    useEffect(() => {
      if (userInfo) {
        props.history.push('/dashboard');
      }
      return () => {
        //
      };
    }, [props.history, userInfo]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(signin(email, password));
    }
    return (<div className="off-canvas-sidebar">
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
        <div className="container">
            <div className="navbar-wrapper">
                <a className="navbar-brand" href="<?php echo '?route=login' ?>">Login Page</a>
            </div>
            <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    aria-controls="navigation-index"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
                <span className="navbar-toggler-icon icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <a href="<?php echo '?route=register'; ?>" className="nav-link">
                            <i className="material-icons">person_add</i> Register
                        </a>
                    </li>
                    <li className="nav-item  active ">
                        <a href="<?php  echo '?route=login' ?>" className="nav-link">
                            <i className="material-icons">fingerprint</i> Login
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div className="wrapper wrapper-full-page">
    <div className="page-header login-page header-filter" filter-color="black">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
                    <form className="form" onSubmit={submitHandler}>
                        <div className="card card-login card-hidden">
                            <div className="card-header card-header-rose text-center">
                                <h4 className="card-title">Login</h4>
                                <div className="social-line">
                                    <a href="!#" className="btn btn-just-icon btn-link btn-white">
                                        <i className="fa fa-facebook-square"></i>
                                    </a>
                                    <a href="!#" className="btn btn-just-icon btn-link btn-white">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                    <a href="!#" className="btn btn-just-icon btn-link btn-white">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body ">
                                <p className="card-description text-center">Or Be ClassNameical</p>
                                <div className="form__group">
                                    {loading && <div>Loading...</div>}
                                    {error && <div>{error}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="bmd-label-floating"> Email *</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email" required="required" name={email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="examplePasswords" className="bmd-label-floating"> Password *</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="examplePasswords" required="required" name={password}/>
                                </div>
                            </div>
                            <div className="card-footer ml-auto mr-auto">
                                <button type="submit" className="btn btn-rose" name="login">Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        <footer className="footer">
            <div className="container">
                <nav className="float-left">
                    <ul>
                        <li>
                            <a href="#">
                                Creative Tim
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                Licenses
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    </div>
</div>
    )
}
