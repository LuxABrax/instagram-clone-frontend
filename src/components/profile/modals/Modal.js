import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toggleModal } from "../../../redux/modalSlice";
import "../../../styles/profile/modal.scss";

const Modal = ({ profile, children }) => {
	const dispatch = useDispatch();
	const { push } = useHistory();

	function closeModal() {
		if (profile !== undefined && profile.length > 0)
			push(`/profile/${profile}`);
		dispatch(toggleModal());
	}

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => (document.body.style.overflow = "unset");
	}, []);

	return (
		<div className='modal'>
			<div className='background' onClick={closeModal}></div>
			<div className='modalContent'>{children}</div>
		</div>
	);
};

export default Modal;
