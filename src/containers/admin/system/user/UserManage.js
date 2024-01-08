
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, getAllPositions, getAllRole, getAllType, createNewUser, deleteUser } from '../../../../services/userService';
import ModalUser from '../ModalUser';
import { emitter } from '../../../../utils/emitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import  {changeUserView } from '../../../../store/actions/userActions';

class UserManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrAccountChecked: [],
      arrAccount: [],
      arrPosition: [],
      arrRole: [],
      arrType: [],
      arrCount: '',
      isDisabled: "disabled",
      checkedAll: false,
      isOpenModalUser: false
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
    if (e.target.checked) {
      updatedList = [...this.state.arrAccountChecked, Number(e.target.value)];
    } else {
      updatedList.splice(this.state.arrAccountChecked.indexOf(Number(e.target.value)), 1);
    }
    if (updatedList.length === this.state.arrCount) {
      this.setState({
        checkedAll: true
      })
    } else {
      this.setState({
        checkedAll: false
      })
    }
    this.setState({
      arrAccountChecked: updatedList
    }, () => {
      console.log('this.state.arrAccountChecked', 'this.state.checkedAll', this.state.arrAccountChecked, this.state.checkedAll);
      if (updatedList.length >= 1) {
        this.setState({
          isDisabled: null
        })
      } else {
        this.setState({
          isDisabled: "disabled"
        })
      }
    });
  }
  // Return classes based on whether item is checked
  isActive = (id) => this.state.arrAccountChecked.includes(id) ? "active" : "";

  isChecked = id => this.state.arrAccountChecked.includes(id) ? "true" : "";

  isCheckedAll = () => {
    if (this.state.arrCount === this.state.arrAccountChecked.length) {
      return "true";
    } else {
      return "";
    }
  }

  handleCheckedAll = () => {
    this.setState({
      checkedAll: !this.state.checkedAll,
    }, () => {
      if (this.state.checkedAll === true) {
        var allList = [...this.state.arrAccount];
        var checkedAllList = [];
        for (var i = 0; i < allList.length; i++) {
          checkedAllList[i] = allList[i].id;
        }
        this.setState({
          arrAccountChecked: [...checkedAllList],
          isDisabled: null
        });
      } else {
        console.log('co check');
        this.setState({
          arrAccountChecked: [],
          isDisabled: "disabled"
        });
      }
    })
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true
    })
  }


  toggleModalUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser
    })
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
    let responsePos = await getAllPositions();
    let responseRole = await getAllRole();
    let responseType = await getAllType();

    if (responsePos) {
      this.setState({
        arrPosition: responsePos
      })
    }

    if (responseRole) {
      this.setState({
        arrRole: responseRole
      })
    }

    if (responseType) {
      this.setState({
        arrType: responseType
      })
    }
    await this.props.setProgress(100);
  }

  getAllUserFromReact = async () => {
    let responseUser = await getAllUsers();
    console.log('res user: ', responseUser)
    if (responseUser) {
      this.setState({
        arrAccount: responseUser,
        arrCount: responseUser.length
      })
    } else {
      this.setState({
        arrAccount: [],
        arrCount: 0
      })
    }
  }

  createNew = async (data) => {
    try {
      let res = await createNewUser(data)
      if (res[0] && !res[0].bindingFailure) {
        alert(res[0].defaultMessage)
      } else if (res && res.message) {
        await this.getAllUserFromReact()
        alert(res.message)
        this.setState({
          isOpenModalUser: false
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
      console.log('response create user: ', res)
    } catch (e) {
      console.log(e)
    }
  }

  handleDeleteUser = async (data) => {
    console.log('data: ', data)
    try {
      let res = await deleteUser(data.id);
      console.log(res)
      if (res.message) {
        await this.getAllUserFromReact()
      }
    } catch (e) {
      console.log(e)
    }
  }

  changeUserView = (view) => {
    console.log("changeView ", view)
    this.props.changeUserView(view)
  }

  render() {
    let arrAccount = this.state.arrAccount;
    let disabled = this.state.isDisabled;
    console.log('render UserManage')
    return (
      <div className="container-fluid">
        {/* Page Heading */}
        {/* DataTales Example */}
        <div className="card shadow mb-4">
          <ModalUser
            arrPos={this.state.arrPosition}
            isOpen={this.state.isOpenModalUser}
            arrType={this.state.arrType}
            arrRole={this.state.arrRole}
            toggleModalUser={this.toggleModalUser}
            createNew={this.createNew}
          />
          <div className="card-header py-3" >
            <h1 className="h3 mb-2 text-gray-800">Component {">"} Account</h1>
            <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
              For more information about DataTables, please visit the <a target="_blank"
                href="https://datatables.net">official DataTables documentation</a>.</p>
            {/* <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6> */}
            {/* <button onClick={() => this.handleAddNewUser()} className="btn btn-sm btn-primary btn-icon-split" style={{ float: "right" }}> */}
            <Link to={{ pathname: '/admin'}}>
              <button className="btn btn-sm btn-secondary btn-icon-split" style={{ float: "right" }}>
                <span className="icon text-white-50">
                  <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />
                </span>
                <span className="text">Back</span>
              </button>
            </Link>
            <Link to={{ pathname: '/admin/user-manage'}} onClick={()=>this.changeUserView('add')}>
              <button className="btn btn-sm btn-primary btn-icon-split" style={{ float: "right", marginRight: "10px" }}>
                <span className="icon text-white-50">
                  <FontAwesomeIcon icon={['fas', 'fa-plus']} />
                </span>
                <span className="text">Add new user</span>
              </button>
            </Link>
            <button onClick={() => this.handleAddNewUser()} className="btn btn-sm btn-danger btn-icon-split" style={{ float: "right", marginRight: "10px" }} disabled={disabled}>
              <span className="icon text-white-50">
                <FontAwesomeIcon icon={['fas', 'fa-trash']} />
              </span>
              <span className="text">Delete</span>
            </button>
          </div>

          <div className="card-body">
            <div className="table-responsive custom-table-responsive">
              <table className="table table-bordered custom-table" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th scope="col">
                      <label className="control control--checkbox">
                        <input type="checkbox" onChange={() => { this.handleCheckedAll() }} checked={this.isCheckedAll()} />
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
                {/* <tfoot>
                  <tr>
                    <th scope="col">
                      <label className="control control--checkbox">
                        <input type="checkbox" onChange={() => { this.handleCheckedAll() }} checked={this.isCheckedAll()} />
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
                </tfoot> */}
                <tbody>
                  {arrAccount && arrAccount.map((item, index) => {
                    var iRole = 1;
                    var iType = 1;
                    let arrRole = item.accountRoleList;
                    let arrType = item.accountTypeList;
                    return (
                      <tr className={this.isActive(item.id)} key={index}>
                        <th scope="row">
                          <label className="control control--checkbox">
                            <input type="checkbox" onChange={(e) => { this.handleChecked(e) }} value={item.id} checked={this.isChecked(item.id)} />
                            <div className="control__indicator" />
                          </label>
                        </th>
                        <td>{item.id}</td>
                        <td>
                            <Link onClick={()=>this.changeUserView('edit')} to={{ pathname: '/admin/user-manage', id: item.id}}>
                              <span>{item.userName}</span>
                            </Link>
                        </td>
                        <td>{item.email}</td>
                        <td>
                          {arrRole.map((itemR, indexR) => {
                            if (iRole === 1) {
                              iRole++
                              return (
                                <div key={indexR}>
                                  {itemR.role.name}
                                  <br />
                                </div>
                              )
                            } else {
                              return (
                                <small className="d-block" key={indexR}>,{itemR.role.name}</small>
                              )
                            }
                          })}
                        </td>
                        <td>
                          {arrType.map((itemT, indexT) => {
                            if (iType === 1) {
                              iType++
                              return (
                                <div key={indexT}>
                                  {itemT.type.name}
                                  <br />
                                </div>
                              )
                            } else {
                              return (
                                <small className="d-block" key={indexT}>,{itemT.type.name}</small>
                              )
                            }
                          })}
                        </td>
                        <td className='fa-toggle'><FontAwesomeIcon icon={(item.isEnabled && item.isEnabled === 'true' || item.isEnabled === 1) ? ['fas', 'fa-toggle-on'] : ['fas', 'fa-toggle-off']} /></td>
                        <td className='fa-edit-delete'>
                          <button className="btn btn-info btn-circle btn-sm" onClick={() => { this.handleDeleteUser(item) }}><FontAwesomeIcon icon={['fas', 'fa-edit']} /></button>
                          <button className="btn btn-danger btn-circle btn-sm" onClick={() => { this.handleDeleteUser(item) }}> <FontAwesomeIcon icon={['fas', 'fa-trash']} /></button>
                        </td>
                        {/* <tr ><td colSpan={2} /></tr> */}
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </div>
          </div>
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
    changeUserView: (view) => dispatch(changeUserView(view))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
