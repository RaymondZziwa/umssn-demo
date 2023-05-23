import  Modal  from "react-modal"

const SessionExpiredModal = ({isOpen, onClose})=>{
    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Session Expired Modal"
        >
            <h1>Session Expired</h1>
            <p>Your session has expired. Please log in again.</p>
            <button onClick={onClose}>Close</button>
        </Modal>
    )
}

export default SessionExpiredModal