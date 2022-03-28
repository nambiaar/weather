import { getByTestId, screen, render } from '@testing-library/react';
import App from './App';
import { APP_TITLE } from './constants';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe("should have an input", () => {
  const app = screen.getByTestId('App');
  const zipCodeOrCity = getByTestId(screen, 'zip-input');
  app.toContainElement(zipCodeOrCity);
});

describe('With React Testing Library', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store;

  it('Shows "Weater App"', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const app = screen.getByTestId('App');
    expect(getByText(APP_TITLE)).not.toBeNull();
  });
});