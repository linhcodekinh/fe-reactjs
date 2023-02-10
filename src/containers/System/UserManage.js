import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, getAllPositions } from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props){
      super(props);
      this.state = {
        arrAccountChecked : [],
        arrAccount : '',
        arrPosition: '',
        arrCount: '',
        checkedAll : false,
        isOpenModalUser : false
      }
    }
    /** Life Cycle
     *  Run component:
     * 1. Run constructor -> init state
     * 2. Did mount: truoc khi component duoc render() thuong dung de goi api, set state,..
     * 3. Render
     */

    handleChecked = (e) => {
      var updatedList = [...this.state.arrAccountChecked];
      if(e.target.checked) {
          updatedList = [...this.state.arrAccountChecked, Number(e.target.value)];
      }else {
        updatedList.splice(this.state.arrAccountChecked.indexOf(Number(e.target.value)), 1);
      }
      if(updatedList.length === this.state.arrCount){
        this.setState({
          checkedAll : true
        })
      }else{
        this.setState({
          checkedAll : false
        })
      }
      this.setState({
        arrAccountChecked: updatedList,
      }, () => {
        console.log('this.state.arrAccountChecked', 'this.state.checkedAll', this.state.arrAccountChecked, this.state.checkedAll);
      });

    }
    // Return classes based on whether item is checked
    isActive = (id) => this.state.arrAccountChecked.includes(id) ? "active" : "";

    isChecked  = id => this.state.arrAccountChecked.includes(id) ? "true" : "";

    isCheckedAll = () => {
      if(this.state.arrCount === this.state.arrAccountChecked.length){
        return "true";
      }else {
        return "";
      }
    }
    
    handleCheckedAll = () => { 
      this.setState({
        checkedAll : !this.state.checkedAll,
      }, () => { 
        if(this.state.checkedAll === true ){
        var allList = [...this.state.arrAccount];
        var checkedAllList = [];
        for(var i = 0; i < allList.length; i++){
          checkedAllList[i] = allList[i].id;
        }
        this.setState({
          arrAccountChecked: [...checkedAllList]
        });
      }else{
        this.setState({
          arrAccountChecked: []
        });
      }
      })
    }

    handleAddNewUser = () => {
      this.setState({
        isOpenModalUser : true
      })
    }

    
    toggleModalUser = () => {
      this.setState({
        isOpenModalUser : !this.state.isOpenModalUser
      })
    }

    async componentDidMount() {
      let responseUser = await getAllUsers();
      let responsePos = await getAllPositions();
      
      if(responseUser){
        this.setState({
          arrAccount: responseUser, 
          arrCount : responseUser.length
        }, () => {
          console.log('check state account', 'arrCount', this.state.arrAccount, this.state.arrCount);
        })
      }

      if(responsePos){
        this.setState({
          arrPosition: responsePos, 
        }, () => {
          console.log('check state account', 'arrCount', this.state.arrAccount, this.state.arrCount);
        })
      }
    }

    

    render() {
        let arrAccount = this.state.arrAccount;
        let arrPosition = this.state.arrPosition;
        console.log('arrAccount', arrAccount, 'arrPosition', arrPosition);
        return (
            <div className="container">
              <ModalUser
                isOpen = {this.state.isOpenModalUser}
                toggleModalUser = {this.toggleModalUser}
                arrPos = {this.state.arrPosition}
              />
              <h2 className="mb-5 title-mana">Quản lý account</h2>
              <div className='mb-3'>
                <button className='btn btn-primary px-3'
                  onClick={() => this.handleAddNewUser()}
                ><i className='fas fa-plus' /> Add new user</button>
              </div>
              <div className="table-responsive custom-table-responsive">
                <table className="table custom-table">
                  <thead>
                    <tr>  
                      <th scope="col">
                        <label className="control control--checkbox">
                          <input type="checkbox" onChange={()=>{this.handleCheckedAll()}} checked={this.isCheckedAll()}/>
                          <div className="control__indicator" />
                        </label>
                      </th>
                      <th scope="col">ID</th>
                      <th scope="col">User Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Type</th>
                      <th scope="col">Active</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                        {arrAccount && arrAccount.map((item, index) => {
                          let arrRole = item.accountRoleList;
                          let arrType = item.accountTypeList;
                          console.log('arrRole', arrRole);
                          return (
                            <>
                              <tr key={index} className={this.isActive(item.id)}>
                                <th scope="row">
                                  <label className="control control--checkbox">
                                    <input type="checkbox" onChange={(e)=>{this.handleChecked(e)}} value={item.id} checked={this.isChecked(item.id)}/>
                                    <div className="control__indicator" />
                                  </label>
                                </th>
                                <td>{item.id}</td>
                                <td><a href="#">{item.userName}</a></td>
                                <td>
                                 {item.email}
                                </td>
                                <td>
                                  {arrRole.map((itemR, indexR) => {
                                    console.log('indexR', indexR);
                                      if (indexR === 0){
                                          return (
                                            <>
                                            {itemR.role.name}
                                            <br/>
                                            </>
                                          )
                                      }else {
                                        return (
                                          <small className="d-block">,{itemR.role.name}</small>  
                                        )
                                      }
                                  })}  
                                </td> 
                                <td>
                                  {arrType.map((itemT, indexT) => {
                                    console.log('indexR', indexT);
                                      if (indexT === 0){
                                          return (
                                            <>
                                            {itemT.type.name}
                                            <br/>
                                            </>
                                          )
                                      }else {
                                        return (
                                          <small className="d-block">,{itemT.type.name}</small>  
                                        )
                                      }
                                  })}  
                                </td>                            
                                <td className='fa-toggle'><i className={(item.isEnabled && item.isEnabled === 'true' || item.isEnabled === 1) ? 'fa fa-toggle-on' : 'fa fa-toggle-off'}></i></td>
                                <td className='fa-edit-delete'>
                                  <i className="fa fa-edit"></i> 
                                  <i className="fa fa-trash-alt"></i>
                                </td>                              
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
