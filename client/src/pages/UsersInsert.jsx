import React, {Component} from 'react'

import styled from 'styled-components'
import {insertUser} from "../action"
import {connect} from "react-redux"

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
    margin: 0px 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
  className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class UsersInsert extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      dob: '',
      email: '',
      phone: '',
    }
  }

  handleChangeInputName = async event => {
    const name = event.target.validity.valid
      ? event.target.value
      : this.state.name
    this.setState({name})
  }

  handleChangeInputDOB = async event => {
    const dob = event.target.value
    this.setState({dob})
  }

  handleChangeInputEmail = async event => {
    const email = event.target.validity.valid
      ? event.target.value
      : this.state.email
    this.setState({email})
  }

  handleChangeInputPhone = async event => {
    const phone = event.target.value
    this.setState({phone})
  }

  handleIncludeUser = async () => {
    const {name, dob, email, phone} = this.state
    const payload = {name, dob, email, phone}

    this.props.insertUser(payload)
    this.setState({
      name: '',
      dob: '',
      email: '',
      phone: '',
    })
    window.location.href = '/'
  }

  render() {
    const {name, dob, email, phone} = this.state
    return (
      <Wrapper>
        <Title>Create User</Title>

        <Label>Name: </Label>
        <InputText
          type="text"
          value={name}
          required
          onChange={this.handleChangeInputName}
        />

        <Label>Date of Birth: </Label>
        <InputText
          type="date"
          value={dob}
          onChange={this.handleChangeInputDOB}
        />

        <Label>Email: </Label>
        <InputText
          type="text"
          value={email}
          required
          onChange={this.handleChangeInputEmail}
        />

        <Label>Phone: </Label>
        <InputText
          type="text"
          value={phone}
          onChange={this.handleChangeInputPhone}
        />

        <Button onClick={this.handleIncludeUser}>Add User</Button>
        <CancelButton href={'/users/list'}>Cancel</CancelButton>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  insertUser: (payload) => dispatch(insertUser(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersInsert)
