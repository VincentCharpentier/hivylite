import { connect } from 'react-redux'
import { editReq } from '../Actions'
import RequestList from '../Components/RequestList'




const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRequestClick: (request) => {
            dispatch(editReq(request))
        }
    }
}

const RequestListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestList)

export default RequestListContainer
