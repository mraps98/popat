//Actions
export const actionTypes = {
    SET_USER: "SET_USER",
};

export const userReducer = (initialState = {uid: "1234", uername: "preet", userPhotoUrl: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Round&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Gray01&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Concerned&skinColor=Pale"}, action) =>{
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...initialState, 
                uid: action.payload.uid,
                username: action.payload.username, 
                userPhotoUrl: action.payload.userPhotoUrl
            }
        default:
            return initialState;
    }
};
