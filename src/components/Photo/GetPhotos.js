import React, { useState, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Gallery from 'react-photo-gallery'

const GetPhotos = ({ user, match, alert, history }) => {
  const [photos, setphotos] = useState([''])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://dog.ceo/api/breeds/image/random/50'
    })
      .then(res => {
        console.log('before', res)
        setphotos(res.data.message)
      })
      .catch(() => alert({ heading: 'Rut roh', message: 'Something went wrong', variant: 'danger' }))
  }, [])

  if (!photos) {
    return <p>Loading...</p>
  }

  const photoArray = []
  photos.map(photo => {
    if (photos.indexOf(photo) % 4 === 0) {
      photoArray.push({ src: photo, width: 4, height: 3 })
    } else {
      photoArray.push({ src: photo, width: 1, height: 1 })
    }
  })

  return (
    <Fragment>
      <Gallery photos={photoArray} />
    </Fragment>
  )
}

export default withRouter(GetPhotos)
