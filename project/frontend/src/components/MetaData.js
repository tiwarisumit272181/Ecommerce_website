import React from 'react'
import {Helmet} from 'react-helmet'
const MetaData = ({title}) => {
  return (
    <Helmet>
     <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <link
      href="//db.onlinewebfonts.com/c/157c6cc36dd65b1b2adc9e7f3329c761?family=Amazon+Ember"
      rel="stylesheet"
      type="text/css"
    />
    <title>{`${title}- Shopit`}</title>
    </Helmet>
    
  )
}

export default MetaData