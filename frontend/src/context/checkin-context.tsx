import { createContext } from "preact";
import { useContext, useReducer, type Dispatch } from "preact/hooks";

type Equipment = {
  name: string;
  quantity: number;
};

type State = {
  basicDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  companyDetails: {
    companyName: string;
    address: string;
    hostName: string;
    purposeOfVisit: string;
  };
  photograph: string | null;
  identityProof: string | null;
  equipment: {
    electrical: Equipment[];
    mechanical: Equipment[];
  };
  nda: {
    signature: string;
    date: string;
    name: string;
    company: string;
    accepted: boolean;
  };
};

type Action = { type: 'UPDATE_STATE'; payload: Partial<State> };

const initialState: State = {
  basicDetails: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  companyDetails: {
    companyName: '',
    address: '',
    hostName: '',
    purposeOfVisit: '',
  },
  photograph: null,
  identityProof: null,
  equipment: {
    electrical: [{ name: '', quantity: 1 }],
    mechanical: [{ name: '', quantity: 1 }],
  },
  nda: {
    signature: '',
    date: '',
    name: '',
    company: '',
    accepted: false,
  },
};

const CheckinContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

function checkinReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const CheckinProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(checkinReducer, initialState);

  return (
    <CheckinContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckinContext.Provider>
  );
};

export const useCheckin = () => {
  const context = useContext(CheckinContext);
  if (context === undefined) {
    throw new Error('useCheckin must be used within a CheckinProvider');
  }
  return context;
};