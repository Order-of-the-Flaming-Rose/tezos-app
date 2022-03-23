/* eslint-disable no-debugger */
/* eslint-disable no-undef */
/* eslint-disable default-param-last */
export const fetchTypes = {
  START: 'START',
  CATCH: 'CATCH',
  FINISH: 'FINISH',
};

export type Tfetch = {
  loading: boolean;
  error: boolean;
};

export type Taction = {
  type: string;
};

function fetchReducer(state: Tfetch, action: Taction) {
  switch (action.type) {
    case fetchTypes.START:
      return {
        loading: true,
        error: false,
      };
    case fetchTypes.CATCH:
      return { ...state, error: false };
    case fetchTypes.FINISH:
      return { ...state, loading: false };

    default: {
      return state;
    }
  }
}

export default fetchReducer;
