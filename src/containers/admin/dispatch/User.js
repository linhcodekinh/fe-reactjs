import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Main from '../Main.js';

class User extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
    }

    render() {
        return (
            <Main view="user" />
        );
    }

}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
