import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class Home extends Component {

    state = {

    }

    componentDidMount() {
    }


    render() {
        console.log("haahaheheh home admin")
        return (
            <>
            <h1>hehehweheheh</h1>
            <div className="text-center" >admin home</div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
