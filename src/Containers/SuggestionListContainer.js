import { connect } from 'react-redux'
import { formSuggestionChosen } from '../Actions'
import SuggestionList from '../Components/SuggestionList'




const mapStateToProps = (state) => {
    return {
        suggestions: state.form.suggestions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSuggestionClick: (suggestion) => {
            console.log("CLICK")
            dispatch(formSuggestionChosen(suggestion))
        }
    }
}

const SuggestionListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SuggestionList)

export default SuggestionListContainer
