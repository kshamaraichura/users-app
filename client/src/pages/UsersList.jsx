import React, {Component} from 'react'
import {connect} from "react-redux"
import ReactTable from 'react-table'

import styled from 'styled-components'

import 'react-table/react-table.css'
import {deleteUser, getAllUsers} from "../action"

const Wrapper = styled.div`
    text-align: center;
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteUserComponent extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
          window.confirm(
            `Do you want to delete the user ${this.props.id} permanently?`,
          )
        ) {
            this.props.deleteUser(this.props.id)
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

const mapDispatchToPropsDeleteUser = dispatch => ({
    deleteUser: (id) => dispatch(deleteUser(id))
})

const DeleteUser = connect(undefined, mapDispatchToPropsDeleteUser)(DeleteUserComponent)

class UsersList extends Component {
    constructor(props) {
        super(props)
        const userList = props.user && props.user.list && props.user.list.success
        const isLoading = props.user && props.user.list && props.user.list.isLoading
        this.state = {
            users: userList || [],
            columns: [],
            isLoading: isLoading,
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {user} = nextProps
        const userList = user && user.list && user.list.success
        const isLoading = user && user.list && user.list.isLoading
        this.setState({users: userList || [], isLoading})
    }

    render() {
        const {users, isLoading} = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'DOB',
                accessor: 'dob',
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: true,
            },
            {
                Header: 'Phone',
                accessor: 'phone',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                      <span>
                            <DeleteUser id={props.original._id}/>
                      </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                      <span>
                            <UpdateUser id={props.original._id}/>
                      </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!users.length) {
            showTable = false
        }

        return (
          <Wrapper>
              {showTable && (
                <ReactTable
                  data={users}
                  columns={columns}
                  loading={isLoading}
                  defaultPageSize={10}
                  showPageSizeOptions={true}
                  minRows={0}
                />
              )}
              {!users.length && <h1>No users found!</h1>}
          </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
