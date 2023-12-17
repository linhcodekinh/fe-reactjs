import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Main from '../Main.js';
import history from '../../../routes/history.js'
import { path } from '../../../utils/constant.js'

class User extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            view: ''
        }
        console.log('props after pop', this.props)
    }

    shouldComponentUpdate = (nextProps) => {
        console.log('shouldComponentUpdate',nextProps)
        if(nextProps.location.view !== null && nextProps.location.view !== undefined){
            localStorage.setItem('view', nextProps.location.view)
        }
        console.log('true or false',(nextProps.location.view !== this.state.view))
        return nextProps.location.view !== this.state.view;
    }
    
    componentDidUpdate = () => {
        console.log('componentDidUpdate',this.state)
        if(this.state.view !== localStorage.getItem('view')){
            this.setState({
                view : localStorage.getItem('view')
            })
        }
    }

    componentDidMount = () => {
        console.log('componentDidMount',this.state)
        this.setState({
            view : localStorage.getItem('view')
        })
    }
    
    backListener = history.listen((loc, action) => {
      console.log('backListener', loc, action)  
      if (action === "POP") {
        if(this.state.view === 'view'){
            history.push({ pathname: path.admin.ADMIN})
        }else if(this.state.view === 'add'){
            history.push({ pathname: path.admin.USER, view: 'view'})
        }
        console.log('props pop', this.state.view)  
      }
    })

    componentWillUnmount() {
        console.log('componentWillUnmount state',this.state)
        console.log('componentWillUnmount props',this.props)
        // Unbind listener
        this.backListener();
        this._isMounted = false;
    }


    render() {
        console.log('state',this.state)
        return (
            <Main view={this.state.view} />
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
