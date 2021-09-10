import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CardForm from '../card/CardForm';
import { getCards } from '../../actions/card';

const Card = ({ getCards, card: { cards } }) => {
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
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">nickname</th>
                            <th scope="col">card_bank</th>
                            <th scope="col">name</th>
                            <th scope="col">card_no</th>
                            <th scope="col">expiry</th>
                            <th scope="col">cvv</th>
                            <th scope="col">card_pin</th>
                            <th scope="col">card_type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {cards} */}
                        {cards.map((card, index) => (
                            //   <PostItem key={post._id} post={post} />
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{card.nickname}</td>
                                <td>{card.card_bank}</td>
                                <td>{card.name}</td>
                                <td>{card.card_no}</td>
                                <td>{card.expiry}</td>
                                <td>{card.cvv}</td>
                                <td>{card.card_pin}</td>
                                <td>{card.card_type}</td>
                                <td><i class="fas fa-eye"></i> || <i class="fas fa-edit"></i> || <i class="fas fa-trash"></i></td>
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
    card: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    card: state.card
});

export default connect(mapStateToProps, { getCards })(Card);
