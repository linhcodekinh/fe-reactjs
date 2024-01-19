
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, getAllPositions, getAllRole, getAllType, createNewUser, deleteUser } from '../../../../services/userService';
import ModalUser from '../ModalUser';
import { emitter } from '../../../../utils/emitter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { changeUserView } from '../../../../store/actions/userActions';
import { fetchAllUserStart, fetchAllPosStart, fetchAllRoleStart, fetchAllTypeStart, deleteUserStart, setAUserIdEdit, deleteMultiUserStart } from '../../../../store/actions/userManageActions';
import { ThreeDots } from 'react-loader-spinner'
import { setContentOfConfirmModal } from '../../../../store/actions/appActions.js';

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
      isOpenModalUser: false,
      isUserLoading: true,
      isRoleLoading: true,
      isTypeLoading: true,
      isPosLoading: true,
      isDelete: false,
      //isDeleteMulti: false,
      messageDelete: '',
      contentOfConfirmModal: {}
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
    this.props.fetchAllUserStart();
    this.props.fetchAllRoleStart();
    this.props.fetchAllTypeStart();
    this.props.fetchAllPosStart();

    await this.props.setProgress(100);
  }

  componentDidUpdate = (preProps, prevState, snapshot) => {
    if (preProps.userRedux !== this.props.userRedux) {
      this.setState({
        arrAccount: this.props.userRedux,
        arrCount: this.props.userRedux.length,
        isUserLoading: this.props.isUserLoadingRedux
      })
    }
    if (preProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        arrRole: this.props.roleRedux,
        isRoleLoading: this.props.isRoleLoadingRedux
      })
    }
    if (preProps.typeRedux !== this.props.typeRedux) {
      this.setState({
        arrType: this.props.typeRedux,
        isTypeLoading: this.props.isTypeLoadingRedux
      })
    }
    if (preProps.posRedux !== this.props.posRedux) {
      this.setState({
        arrPos: this.props.posRedux,
        isPosLoading: this.props.isPosLoadingRedux
      })
    }

    if (preProps.isDeleteLoadingRedux !== this.props.isDeleteLoadingRedux) {
      this.setState({
        isDelete: false
      })
    }

  }

  // getAllUserFromReact = async () => {
  //   let responseUser = await getAllUsers();
  //   console.log('res user: ', responseUser)
  //   if (responseUser) {
  //     this.setState({
  //       arrAccount: responseUser,
  //       arrCount: responseUser.length
  //     })
  //   } else {
  //     this.setState({
  //       arrAccount: [],
  //       arrCount: 0
  //     })
  //   }
  // }

  // createNew = async (data) => {
  //   try {
  //     let res = await createNewUser(data)
  //     if (res[0] && !res[0].bindingFailure) {
  //       alert(res[0].defaultMessage)
  //     } else if (res && res.message) {
  //       await this.getAllUserFromReact()
  //       alert(res.message)
  //       this.setState({
  //         isOpenModalUser: false
  //       })
  //       emitter.emit('EVENT_CLEAR_MODAL_DATA')
  //     }
  //     console.log('response create user: ', res)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  handleBeforeDeleteMultiUser = () => {
    this.setState({
      contentOfConfirmModal: { isOpen: true, messageId: "common.confirm-this-task", handleFunc: this.handleDeleteMultiUser, dataFunc: { ids: this.state.arrAccountChecked } }
    }, () => {
      this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
    })
  }

  handleDeleteMultiUser = (ids) => {
    this.setState({
      arrAccountChecked: [],
      isDisabled: "disabled",
      isDelete: true
    })
    this.props.deleteMultiUserStart(ids);
  }

  handleBeforeDeleteUser = (id) => {
    console.log("handleBeforeDeleteUser", id)
    this.setState({
      contentOfConfirmModal: { isOpen: true, messageId: "common.confirm-this-task", handleFunc: this.handleDeleteUser, dataFunc: id }
    }, () => {
      this.props.setContentOfConfirmModal(this.state.contentOfConfirmModal)
    })
  }

  handleDeleteUser = (id) => {
    this.setState({
      isDelete: true
    })
    this.props.deleteUserStart(id);
  }

  changeUserView = (view, id) => {
    console.log("changeView ", view)
    this.props.changeUserView(view)
    this.props.setAUserIdEdit(id)
  }

  render() {
    let arrAccount = this.state.arrAccount;
    let showUserLoading = (this.state.isUserLoading === true && this.state.isRoleLoading === true && this.state.isTypeLoading === true && this.state.isPosLoading === true);
    let showDeleteLoading = (this.state.isDelete === true && this.props.isDeleteLoadingRedux === true)

    return (
      <>
        <ThreeDots
          visible={showUserLoading || showDeleteLoading}
          height="60"
          width="60"
          color="#4e73df"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="audio-class"
        />
        <div className="container-fluid">
          {/* Page Heading */}
          {/* DataTales Example */}
          <div className="card shadow mb-4">
            {/* <ModalUser
              arrPos={this.state.arrPosition}
              isOpen={this.state.isOpenModalUser}
              arrType={this.state.arrType}
              arrRole={this.state.arrRole}
              toggleModalUser={this.toggleModalUser}
              createNew={this.createNew}
            /> */}
            <div className="card-header py-3" >
              <div className='row'>
                <div className='col-6'>
                  <h4 className="mb-2 text-gray-800">Component {">"} Account</h4>
                </div>
                <div className='col-6'>
                  <Link to={{ pathname: '/admin' }}>
                    <button className="btn btn-sm btn-secondary btn-icon-split" style={{ float: "right" }}>
                      <span className="icon text-white-50">
                        <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />
                      </span>
                      <span className="text">Back</span>
                    </button>
                  </Link>
                  <Link to={{ pathname: '/admin/user-manage' }} onClick={() => this.changeUserView('add')}>
                    <button className="btn btn-sm btn-primary btn-icon-split" style={{ float: "right", marginRight: "10px" }}>
                      <span className="icon text-white-50">
                        <FontAwesomeIcon icon={['fas', 'fa-plus']} />
                      </span>
                      <span className="text">Add new user</span>
                    </button>
                  </Link>
                  <button onClick={() => this.handleBeforeDeleteMultiUser()} className="btn btn-sm btn-danger btn-icon-split" style={{ float: "right", marginRight: "10px" }} disabled={this.state.isDisabled}>
                    <span className="icon text-white-50">
                      <FontAwesomeIcon icon={['fas', 'fa-trash']} />
                    </span>
                    <span className="text">Delete</span>
                  </button>
                </div>
              </div>
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
                  <tbody className={(showUserLoading || showDeleteLoading) ? "disabled" : ""}>
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
                            <Link onClick={() => this.changeUserView('edit', item.id)} to={{ pathname: '/admin/user-manage' }}>
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
                          <td className='fa-toggle'><FontAwesomeIcon icon={(item.isEnabled || item.isEnabled === 1) ? ['fas', 'fa-toggle-on'] : ['fas', 'fa-toggle-off']} /></td>
                          <td className='fa-edit-delete'>
                            <button className="btn btn-info btn-circle btn-sm" onClick={() => this.changeUserView('edit')} to={{ pathname: '/admin/user-manage', id: item.id }}><FontAwesomeIcon icon={['fas', 'fa-edit']} /></button>
                            <button className="btn btn-danger btn-circle btn-sm" onClick={() => { this.handleBeforeDeleteUser(item.id) }}> <FontAwesomeIcon icon={['fas', 'fa-trash']} /></button>
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
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    userRedux: state.userManage.listAllUser,
    roleRedux: state.userManage.listAllRole,
    typeRedux: state.userManage.listAllType,
    posRedux: state.userManage.listAllPos,
    contentOfConfirmModal: state.app.contentOfConfirmModal,
    isDeleteLoadingRedux: state.userManage.isDeleteLoading,
    isUserLoadingRedux: state.userManage.isUserLoading,
    isRoleLoadingRedux: state.userManage.isRoleLoading,
    isTypeLoadingRedux: state.userManage.isTypeLoading,
    isPosLoadingRedux: state.userManage.isPosLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeUserView: (view) => dispatch(changeUserView(view)),
    fetchAllUserStart: () => dispatch(fetchAllUserStart()),
    fetchAllRoleStart: () => dispatch(fetchAllRoleStart()),
    fetchAllTypeStart: () => dispatch(fetchAllTypeStart()),
    fetchAllPosStart: () => dispatch(fetchAllPosStart()),
    deleteUserStart: (id) => dispatch(deleteUserStart(id)),
    deleteMultiUserStart: (ids) => dispatch(deleteMultiUserStart(ids)),
    setAUserIdEdit: (id) => dispatch(setAUserIdEdit(id)),
    setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(setContentOfConfirmModal(contentOfConfirmModal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
