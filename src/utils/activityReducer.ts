/* eslint-disable no-undef */
/* eslint-disable default-param-last */
export const types = {
  GETACTIVITY: 'GETACTIVITY',
};

export type Tstate = {
  activity: any[];
  lastId: number;
};

export type Taction = {
  type: string;
  payload: Tstate;
};

function activityReducer(state: Tstate, action: Taction) {
  switch (action.type) {
    case types.GETACTIVITY:
      return {
        activity: state.activity.concat(action.payload.activity),
        lastId: action.payload.lastId,
      };

    default: {
      return state;
    }
  }
}

export default activityReducer;
