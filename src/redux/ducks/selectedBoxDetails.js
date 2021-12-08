const SET_AVAILABLE_OWNERS = "set_available_owners";
const SET_BOX_ID = "set_box_id";
const SET_GUESTS = "set_guests";

const SET_EMPLOYEE = "set_employee"; // session info
const SET_SIGNS = "set_signs"

const SET_DEBUG = "set_debug";

export const set_available_owners = (availableOwners) => ({
	type: SET_AVAILABLE_OWNERS, // name technically
	payload: availableOwners
});

export const set_box_id = (boxID) => ({
	type: SET_BOX_ID,
	payload: boxID
});

export const set_guests = (guests) => ({
	type: SET_GUESTS,
	payload: guests
});

export const set_employee = (employee) => ({
	type: SET_EMPLOYEE,
	payload: employee
});

export const set_signs = (signs) => ({ // signatures from current session
	type: SET_SIGNS,
	payload: signs
})

export const set_debug = (debug) => ({
	type: SET_DEBUG,
	payload: debug
})

const initialState = {
	availableOwners: [],
	boxID: undefined,
	guests: [],
	employee: undefined, // session info
	signs: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_AVAILABLE_OWNERS:
			return {...state, availableOwners: action.payload};
		case SET_BOX_ID:
			return {...state, boxID: action.payload};
		case SET_GUESTS:
			return {...state, guests: action.payload};
		case SET_EMPLOYEE:
			return {...state, employee: action.payload};
		case SET_SIGNS:
			return {...state, signs: action.payload};
		case SET_DEBUG:
			return {...state, debug: action.payload};
		default:
			return state;
	}
}