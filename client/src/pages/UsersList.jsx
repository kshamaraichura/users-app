import React, {Component} from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

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

class DeleteUser extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
          window.confirm(
            `Do tou want to delete the user ${this.props.id} permanently?`,
          )
        ) {
            api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading: true})

        await api.getAllUsers().then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
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

export default UsersList
