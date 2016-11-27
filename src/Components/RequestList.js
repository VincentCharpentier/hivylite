import React, { PropTypes } from 'react'
import ListItem from './ListItem'

const RequestList = ({ requests, onRequestClick }) => (
    <ul className="RequestList">
    {requests.map(request =>
        <ListItem
            key={request.id}
            text={request.title}
            onClick={() => onRequestClick(request)}
        />
    )}
    </ul>
)

RequestList.propTypes = {
    requests: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onRequestClick: PropTypes.func.isRequired
}


export default RequestList;
