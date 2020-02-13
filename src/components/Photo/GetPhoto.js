import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Img from 'react-image'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'

const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3%',
  width: '50%',
  maxHeight: '60vh'
}

const buttonStyle = {
  textAlign: 'center',
  marginTop: '3%'
}

const button = {
  margin: '5px'
}

const GetPhoto = ({ user, match, alert, history }) => {
  const [photo, setphoto] = useState([''])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://dog.ceo/api/breeds/image/random'
    })
      .then(res => {
        setphoto(res.data.message)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  const nextOne = () => {
    event.preventDefault()
    axios({
      method: 'GET',
      url: 'https://dog.ceo/api/breeds/image/random'
    })
      .then(res => {
        setphoto(res.data.message)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  const likeThisOne = (event, url) => {
    event.persist()
    axios({
      url: `${apiUrl}/liked-photos`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      data: { 'photo': { 'url': photo } }
    })
      .then(() => alert({ heading: 'Success', message: 'Saved to your favorites!', variant: 'success' }))
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  if (!photo) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <div style={buttonStyle}>
        <Button style={button} onClick= {(photo) => likeThisOne(photo)} ariant='danger'> Like </Button>
        <Button style={button} variant='secondary' onClick={() => nextOne()}>Next</Button>
      </div>
      <Img src={photo} style={imgStyle}/>
    </Fragment>
  )
}

export default withRouter(GetPhoto)
