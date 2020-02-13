import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Img from 'react-image'

const LikedPhotos = ({ user, match, alert }) => {
  const [likedPhotos, setlikedPhotos] = useState([])

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

  if (!likedPhotos) {
    return <p>Loading...</p>
  }

  const photosJsx = likedPhotos.map(photo =>
    <Img key={photo._id} src={photo.url} />
  )

  return (
    <Fragment>{photosJsx}</Fragment>
  )
}

export default withRouter(LikedPhotos)
