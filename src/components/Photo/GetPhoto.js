import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Img from 'react-image'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'

// img size and display styling
const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '3%',
  width: '50%',
  maxHeight: '60vh'
}

// keep buttons in the center
const buttonStyle = {
  textAlign: 'center',
  marginTop: '3%'
}

// buttons margin
const button = {
  margin: '5px',
  fontFamily: 'Delius'
}

const GetPhoto = ({ user, match, alert, history }) => {
  const [photo, setphoto] = useState([''])

  // axios API call to DOG API to get random puppy photo
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://dog.ceo/api/breeds/image/random'
    })
      // change state of photo with array returned from res
      .then(res => {
        setphoto(res.data.message)
      })
      // catch any error
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  // API GET quest to get the next photo
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

  // API POST request to save the photo as favorite
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

  // Like button and Next buttonå
  // display the photo using Img tag
  return (
    <Fragment>
      <div style={buttonStyle}>
        <Button style={button} onClick= {(photo) => likeThisOne(photo)} variant='warning'> Like </Button>
        <Button style={button} variant='secondary' onClick={() => nextOne()}>Next</Button>
      </div>
      <Img src={photo} style={imgStyle}/>
    </Fragment>
  )
}

export default withRouter(GetPhoto)
