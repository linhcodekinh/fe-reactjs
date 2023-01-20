import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {

    constructor(props){
      super(props);
      this.state = {
        isActive: false,
        arrAccount : ''
      }
    }
    /** Life Cycle
     *  Run component:
     * 1. Run constructor -> init state
     * 2. Did mount: truoc khi component duoc render() thuong dung de goi api, set state,..
     * 3. Render
     */

    handleActive = () => {
      this.setState({
        isActive : !this.state.isActive
      })
    }

    async componentDidMount() {
      let response = await getAllUsers();
      
      if(response){
        this.setState({
          arrAccount: response
        }, () => {
          console.log('check state account', this.state.arrAccount);
        })
      }
    }


    render() {
        let arrAccount = this.state.arrAccount;
        return (
            <div className="container">
              <h2 className="mb-5 title-mana">Quản lý account</h2>
              <div className="table-responsive custom-table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>  
                      <th scope="col">
                        <label className="control control--checkbox">
                          <input type="checkbox" className="js-check-all" />
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                        {arrAccount && arrAccount.map((item, index) => {
                          return (
                            <>
                              <tr key={index} className={this.state.isActive?'active':''}>
                                <th scope="row">
                                  <label className="control control--checkbox">
                                    <input type="checkbox" onClick={()=>{this.handleActive()}}/>
                                    <div className="control__indicator" />
                                  </label>
                                </th>   
                                <td>{item.id}</td>
                                <td><a href="#">{item.userName}</a></td>
                                <td>
                                  Graphic Designer
                                  <small className="d-block">{item.email}</small>
                                </td>
                                <td>{item.isEnabled}</td>
                              </tr>
                              <tr className="spacer"><td colSpan={100} /></tr>
                            </>
                          )
                        })
                        }
                  </tbody>
                </table>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
