import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Img from 'react-image'
import Button from 'react-bootstrap/Button'

const imgSize = {
  width: '250px',
  height: '250px',
  margin: '10px',
  display: 'block'
}

const divStyle = {
  float: 'left',
  textAlign: 'center'
}

const font = {
  fontFamily: 'Delius'
}

const LikedPhotos = ({ user, match, alert, history }) => {
  const [likedPhotos, setlikedPhotos] = useState([])

  // API request to get all the photos that belong to the user
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/liked-photos`,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => {
        setlikedPhotos(res.data.photos)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  // API request to delete the photo
  const destroy = (id) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/liked-photos/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => alert({ zIndex: 1, heading: 'Success', message: 'Removed!', variant: 'success' }))
      .then(() => {
        history.replace('/reload')
        history.replace('/liked-photos')
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }

  // display photos and each photo has a button (remove button)
  const photosJsx = likedPhotos.map(photo => (
    <div key={photo._id} style={divStyle} >
      <Img style={imgSize} src={photo.url} />
      <Button onClick={() => destroy(photo._id)} style={font} variant='outline-warning'>Remove</Button>
    </div>
  ))

  return (
    <Fragment>
      {photosJsx}
    </Fragment>
  )
}

export default withRouter(LikedPhotos)
