const SET_AVAILABLE_OWNERS = "set_available_owners";
const SET_BOX_ID = "set_box_id";
const SET_GUESTS = "set_guests";

export const set_available_owners = (availableOwners) => ({
	type: SET_AVAILABLE_OWNERS,
	payload: availableOwners
});

export const set_box_id = (boxId) => ({
	type: SET_BOX_ID,
	payload: boxId
});

export const set_guests = (guests) => ({
	type: SET_GUESTS,
	payload: guests
});

const initialState = {
	availableOwners: [],
	boxId: undefined,
	guests: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_AVAILABLE_OWNERS:
			return {...state, availableOwners: action.payload};
		case SET_BOX_ID:
			return {...state, boxId: action.payload};
		case SET_GUESTS:
			return {...state, guests: action.payload};
		default:
			return state;
	}
}