import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCards, deleteCard } from '../../actions/card';
import CryptoJS from 'crypto-js'
const Card = ({ getCards, card: { cards },deleteCard }) => {
    useEffect(() => {
        getCards();
    }, [getCards]);
    return (
        <Fragment>
            <Link to="/cards/add" className="btn">
                Add Card
            </Link>
            {/* <CardForm/> */}
            <div className="posts">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">nickname</th>
                            <th scope="col">card_bank</th>
                            <th scope="col">name</th>
                            <th scope="col">card_no</th>
                            <th scope="col">expiry</th>
                            {/* <th scope="col">cvv</th>
                            <th scope="col">card_pin</th> */}
                            <th scope="col">card_type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {cards} */}
                        {cards.map((card, index) => (
                            //   <PostItem key={post._id} post={post} />
                            <tr key ={index}>
                                <th scope="row">{index}</th>
                                <td>{card.nickname}</td>
                                <td>{card.card_bank}</td>
                                <td>{card.name}</td>
                                <td>{card.card_no}</td>
                                <td>{card.expiry}</td>
                                {/* <td> {CryptoJS.AES.decrypt(card.cvv, 'secret key 123').toString(CryptoJS.enc.Utf8)}</td>
                                <td>{CryptoJS.AES.decrypt(card.cvv, 'secret key 123').toString(CryptoJS.enc.Utf8)}</td> */}
                                <td>{card.card_type}</td>
                                <td><Link to= {"/card/view/" + card._id}><i className="fas fa-eye pointer blue"> </i></Link> || <Link to= {"/card/update/" + card._id}> <i className="fas fa-edit pointer"> </i></Link> || <i onClick={e => {
                    e.preventDefault();
                    deleteCard( card._id );
                    // setText('');
                }} className="fas fa-trash red pointer"> </i></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

Card.propTypes = {
    getCards: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
    card: state.card
});

export default connect(mapStateToProps, { getCards, deleteCard })(Card);
