import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {getAllUsers} from "../action"
import {connect} from "react-redux"

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    componentDidMount = () => {
        this.props.getAllUsers()
    }

    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand" onClick={() => this.props.getAllUsers()}>
                    User management application
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/users/list" className="nav-link" onClick={() => this.props.getAllUsers()}>
                                List Users
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/users/create" className="nav-link">
                                Create User
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Links)
