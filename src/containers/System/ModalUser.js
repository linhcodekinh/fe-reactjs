import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {DatePicker} from 'reactstrap-date-picker'
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            userName: '',
            email: '',
            password: '',
            isEnabled: false,
            name: '',
            gender: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            idCard: '',
            positionId: '',
            idRoleList: [],
            idTypeList: []
            // datetime: new Date().toISOString(),
            
        }

        this.listenToEmitter();

    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            console.log('listen emitter from parent: ')
            this.setState({
                userName: '',
                email: '',
                password: '',
                isEnabled: false,
                name: '',
                gender: '',
                phone: '',
                address: '',
                dateOfBirth: '',
                idCard: '',
                positionId: '',
                idRoleList: [],
                idTypeList: []
            })
        })
    }// bus event

    toggle = () => {
        this.props.toggleModalUser();
    }

    handleOnCheckBox = (e, id) => {
        var updatedList = [...this.state[id]];
        if(e.target.checked) {
            updatedList = [...this.state[id], Number(e.target.value)];
        }else {
            updatedList.splice(this.state[id].indexOf(Number(e.target.value)), 1);
        }
        if(id === 'idRoleList'){
            this.setState({
                idRoleList : updatedList
            }, () => {
                console.log('this.state', this.state)
            })
        }else{
            this.setState({
                idTypeList : updatedList
            }, () => {
                console.log('this.state', this.state)
            })
        }
    }

    handleOnChangeText = (e, id) => {
        let copyState = {...this.state};
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('check state', this.state)
        })
    }

    handleOnChangeActive = (e) => {
        
        if(e.target.checked) {
            this.setState({
                isEnabled : (e.target.value === 'true')
            },() => {
                console.log('check state', this.state)
            })
        }
       
    }

    handleOnChangeGender = (e) => {
        if(e.target.checked) {
            this.setState({
                gender : e.target.value
            },() => {
                console.log('check state', this.state)
            })
        }
    }

    handleOnChangePos = (e) => {
        if(e.target.checked) {
            this.setState({
                positionId : Number(e.target.value)
            },() => {
                console.log('check state', this.state)
            })
        }
    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['userName', 'email', 'password', 'name', 'gender']
        for(let i=0;i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
                isValid = false
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    
    handleAddNew = () => {
        let isValid = this.checkValidInput();
        console.log('check isValid', isValid)
        if(isValid === true){
            this.props.createNew(this.state);
        }
        //console.log('check state', this.state)
    }

    componentDidMount() {
        
    }
 
    componentWillMount() {
        
    }


    render() {
        //console.log('check createNew props ', this.props.createNew())
        let arrPos = this.props.arrPos;
        let arrRole = this.props.arrRole;
        let arrType = this.props.arrType;

        return (
            <Modal 
              isOpen={this.props.isOpen}
              toggle={() => this.toggle()}
              className={'modaluser-class'}
              size = "lg"
              centered
            >
              <ModalHeader toggle={() => this.toggle()}>Add New User</ModalHeader>
              <ModalBody>
                <Form>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="exampleUserName">
                        User Name
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleUserName"
                        name="userName"
                        placeholder="input user name"
                        type="text"
                        onChange = {(e) => this.handleOnChangeText(e, 'userName')}
                    />
                    </Col>

                    <Col>
                    <Label className="label-input-text" for="exampleEmail">
                        Email
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleEmail"
                        name="email"
                        placeholder="with a placeholder"
                        type="email"
                        onChange = {(e) => this.handleOnChangeText(e, 'email')}
                    />
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="examplePassword">
                        Password
                    </Label>
                    <Input
                        className="input-text"
                        id="examplePassword"
                        name="password"
                        placeholder="input password"
                        type="password"
                        onChange = {(e) => this.handleOnChangeText(e, 'password')}
                    />
                    </Col>

                    <Col>
                        <Label className="label-input-text">
                            Active
                        </Label>
                        <Label className="label-radio">
                            <Input 
                                name="isEnabled" 
                                type="radio" 
                                onChange = {(e) => this.handleOnChangeActive(e)} 
                                value={true}
                            />{' '}TRUE
                        </Label>
                        <Label className="label-radio">
                            <Input 
                                name="isEnabled"
                                type="radio" 
                                onChange = {(e) => this.handleOnChangeActive(e)} 
                                value={false}
                            />{' '}FALSE
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Role
                        </Label>
                        {arrRole && arrRole.map((item, index)=>{
                            return(
                                <Label className="label-checkbox" key={index}>
                                    <Input 
                                        type="checkbox" 
                                        name="idRoleList" 
                                        onChange = {(e) => this.handleOnCheckBox(e, 'idRoleList')} 
                                        value={item.id}
                                    />{' '}{item.name}
                                </Label>
                            )
                        })}
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Type
                        </Label>
                        {arrType && arrType.map((item, index)=>{
                            return(
                                <Label className="label-checkbox" key={index}>
                                <Input
                                    type="checkbox" 
                                    name="idTypeList" 
                                    onChange = {(e) => this.handleOnCheckBox(e, 'idTypeList')} 
                                    value={item.id}
                                />{' '}{item.name}
                            </Label>
                            )
                        })}
                        
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                    <Label className="label-input-text" for="exampleYourName">
                        Name
                    </Label>
                    <Input
                        className="input-text"
                        id="exampleYourName"
                        name="name"
                        placeholder="input your name"
                        type="text"
                        onChange = {(e) => this.handleOnChangeText(e, 'name')}
                    />
                    </Col>

                    <Col>
                        <Label className="label-input-text">
                            Gender
                        </Label>
                        <Label className="label-radio">
                            <Input 
                                name="gender" 
                                type="radio"
                                onChange = {(e) => this.handleOnChangeGender(e)} 
                                value="male"
                            />{' '}MALE
                        </Label>
                        <Label className="label-radio">
                            <Input 
                                name="gender" 
                                type="radio"
                                onChange = {(e) => this.handleOnChangeGender(e)} 
                                value="female"
                            />{' '}FEMALE
                        </Label>
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    {/* <Col>
                        <Label className="label-input-text" for="exampleYourName">
                            Date of birth
                        </Label>

                        <Label className="label-radio">
                            <Input name="dateOfBirth" type="radio" />{' '}TRUE
                        </Label>
                        <Label className="label-radio">
                            <Input name="dateOfBirth" type="radio" />{' '}FALSE
                        </Label>
                    </Col> */}
                    <Col>
                        <Label className="label-input-text">
                            Phone
                        </Label>
                        <Input
                            className="input-text"
                            id="exampleYourPhone"
                            name="phone"
                            placeholder="input your phone"
                            type="text"
                            onChange = {(e) => this.handleOnChangeText(e, 'phone')}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className="row-cols-lg-12 g-3 align-items-center">
                    <Col>
                        <Label className="label-input-text">
                            Address
                        </Label>
                        <Input
                            className="input-text"
                            id="exampleYourAddress"
                            name="address"
                            placeholder="input your address"
                            type="text"
                            onChange = {(e) => this.handleOnChangeText(e, 'address')}
                        />
                    </Col>
                    <Col>
                        <Label className="label-input-text">
                            Position
                        </Label>
                        {arrPos && arrPos.map((item,index) => {
                            return (
                                <Label className="label-radio" key={index}>
                                    <Input 
                                    name="positionId" 
                                    type="radio" 
                                    value={item.id}
                                    onChange = {(e) => this.handleOnChangePos(e)}
                                    />{' '}{item.name}
                                </Label>
                            )
                        })}
                    </Col>
                </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button 
                    color="primary px-3" 
                    onClick={() => {this.handleAddNew() }}
                >Add new</Button>{' '}
                <Button color="secondary px-3" onClick={this.toggle}>Close</Button>
              </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
