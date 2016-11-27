import React, { PropTypes } from 'react'
import ListItem from './ListItem'

const SuggestionList = ({ suggestions, onSuggestionClick }) => (
    <ul className="SuggestionList">
    {suggestions.map(suggestion =>
        <ListItem
            key={suggestion.id}
            text={suggestion.name}
            onClick={() => onSuggestionClick(suggestion)}
        />
    )}
    </ul>
)

SuggestionList.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onSuggestionClick: PropTypes.func.isRequired
}


export default SuggestionList;
