import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Main from '../Main.js';
import history from '../../../routes/history.js'
import { userIsAuthenticated } from '../../../hoc/authentication.js';
import { changeUserView } from '../../../store/actions/userActions';

class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'view'
        }

    }

    componentDidUpdate = () => {
        console.log('componentDidUpdate', this._isMount)
        if (this.state.view !== this.props.view) {
            this.setState({
                view: this.props.view
            })
        }
    }

    componentDidMount = () => {
        console.log('componentDidMount', this._isMount)
        this.setState({
            view: this.props.view
        })
    }

    backListener = history.listen((loc, action) => {
        if (action === "POP") {
            this.props.changeUserView('view')
        }
    })

    render() {
        console.log('props after pop', this.props)
        return (
            <Main view={this.state.view} id={this.props.location.id} />
        );
        
    }

}
const mapStateToProps = state => {
    return {
        view: state.user.userView
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeUserView: (view) => dispatch(changeUserView(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
