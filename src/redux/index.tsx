import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from './store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { Provider as ReduxProvider } from 'react-redux';
export { store };

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type { RootState };
