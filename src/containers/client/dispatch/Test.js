import React, { Component } from 'react';
import { connect } from 'react-redux';
import TestMain from '../section/test/TestMain';

class Test extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
           <TestMain />
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
