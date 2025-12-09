import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

test("renders login form", () => {
  const { getByRole, getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByRole("heading", { name: /đăng nhập/i })).toBeInTheDocument();
  expect(getByLabelText("Email")).toBeInTheDocument();
  expect(getByLabelText("Password")).toBeInTheDocument();
});
