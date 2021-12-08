const SET_EMPLOYEE = "set_employee";
const SET_BOX_ID = "set_box_id";


export const set_employee = (employee) => ({
	type: SET_EMPLOYEE,
	payload: employee
});

export const set_box_id = (boxId) => ({
	type: SET_BOX_ID,
	payload: boxId
});


const initialState = {
	employee: undefined,
	boxId: undefined,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_EMPLOYEE:
			return {...state, employee: action.payload};
		case SET_BOX_ID:
			return {...state, boxId: action.payload};
		default:
			return state;
	}
}