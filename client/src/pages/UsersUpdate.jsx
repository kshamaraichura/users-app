import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
import {formatDate} from "../utils"
import {updateUser} from "../action"
import {connect} from "react-redux"

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
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

class UsersUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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
        this.setState({ name })
    }

    handleChangeInputDOB = async event => {
        const dob = event.target.value
        this.setState({ dob })
    }

    handleChangeInputEmail = async event => {
        const email = event.target.validity.valid
          ? event.target.value
          : this.state.email
        this.setState({ email })
    }

    handleChangeInputPhone = async event => {
        const phone = event.target.value
        this.setState({ phone })
    }

    handleUpdateUser = async () => {
        const { id, name, dob, email, phone } = this.state
        const payload = { name, dob, email, phone }

        this.props.updateUser(id, payload)
        this.setState({
            name: '',
            dob: '',
            email: '',
            phone: '',
        })
        window.location.href = '/'
    }

    componentDidMount = async () => {
        const { id } = this.state
        const user = await api.getUserById(id)
        if (user && user.data && user.data.data) {
            const {name, dob, email, phone} = user.data.data
            this.setState({
                name,
                dob: formatDate(dob),
                email,
                phone,
            })
        }
    }

    render() {
        const { name, dob, email, phone } = this.state
        return (
            <Wrapper>
                <Title>Update User</Title>

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

                <Button onClick={this.handleUpdateUser}>Update User</Button>
                <CancelButton href={'/users/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    updateUser: (id, payload) => dispatch(updateUser(id, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersUpdate)
