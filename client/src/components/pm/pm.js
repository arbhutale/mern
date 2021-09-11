import React, { Fragment, useEffect, useState, forwardRef, useRef, useImperativeHandle } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPms, deletePm, addPm, updatePm } from '../../actions/pm';
import CryptoJS from 'crypto-js'
import ModalPM from './pmModal'
const Pm = ({ getPms, pm: { pms }, deletePm, addPm, auth: { user }, updatePm }) => {
    const [key, setKey] = useState("")
    const [lock, setLock] = useState(false)
    const childRef = useRef();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(() => {
        getPms();
    }, [getPms]);
    return (
        <Fragment>


<div className="row">
                <div className="col-md-2">
                <Button disabled={!lock} to="#" onClick={() => childRef.current.toggle1({}, "Add Creds", "add")} className="btn btn-success">
                    Add Creds
                    </Button>
                </div>
                <div className="col-md-3">
                    <div className="my-1">
                        <input type='password' placeholder="Enter Key to  Encrpt or Decrypt " className='form-control' value={key}
                            onChange={e => { setKey(e.target.value) }} />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="my-1">
                        <input disabled={lock} type='button' className='btn btn-primary' value="Lock Key"
                            onClick={e => {
                                setLock(true)
                            }} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="my-1">
                        <small>Note: *Actions Button will show after key locked</small>
                    </div>
                </div>
            </div>
            <div className="posts table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">password</th>
                            <th scope="col">website</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pms.map((card, index) => (
                            <tr key={index}>
                                <th scope="row">{index}</th>
                                <td>{card.username}</td>
                                <td>{card.password}</td>
                                <td>{card.website}</td>
                                <td>{card.comments}</td>
                                
                                <td  className="width150"><span hidden={!lock}><Link onClick={() => childRef.current.toggle1(card, "Creds", "view")} to='#'> <i className="fas fa-eye pointer blue"> </i></Link> || <Link to="#" onClick={() => childRef.current.toggle1(card, "Update Creds", "update")}> <i className="fas fa-edit pointer"> </i></Link> || <i onClick={e => {
                                    e.preventDefault();
                                    deletePm(card._id);
                                }} className="fas fa-trash red pointer"> </i></span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ModalPM cipkey={key} getPms={getPms} addPm={addPm} updatePm={updatePm} user={user} ref={childRef} />
        </Fragment>
    );
};

Pm.propTypes = {
    getPms: PropTypes.func.isRequired,
    deletePm: PropTypes.func.isRequired,
    updatePm: PropTypes.func.isRequired,
    pm: PropTypes.object.isRequired,
    addPm: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    pm: state.pm,
    auth: state.auth
});

export default connect(mapStateToProps, { getPms, deletePm, addPm, updatePm })(Pm);
