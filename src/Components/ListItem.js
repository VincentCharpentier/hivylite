import React, { PropTypes } from 'react'

const ListItem = ({ onClick, text }) => (
  <li className="ListItem"
    onClick={onClick}
  >
    {text}
  </li>
)

ListItem.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
}

export default ListItem
