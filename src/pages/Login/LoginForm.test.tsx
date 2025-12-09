import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render login form with email and password inputs", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("heading", { name: /đăng nhập/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng nhập/i })
    ).toBeInTheDocument();
  });

  it("should disable submit button initially", () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });
    expect(submitButton).toBeDisabled();
  });

  it("should validate email format", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "invalid-email");
    await waitFor(() => {
      expect(screen.getByText("Email phải đúng định dạng")).toBeInTheDocument();
    });
  });

  it("should validate password minimum length", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("Password");

    await user.type(passwordInput, "12345");
    await waitFor(() => {
      expect(
        screen.getByText("Password tối thiểu 6 ký tự")
      ).toBeInTheDocument();
    });
  });

  it("should enable submit button when form is valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("should clear error messages when input becomes valid", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");

    await user.type(emailInput, "invalid");
    await waitFor(() => {
      expect(screen.getByText("Email phải đúng định dạng")).toBeInTheDocument();
    });

    await user.clear(emailInput);
    await user.type(emailInput, "test@example.com");

    await waitFor(() => {
      expect(
        screen.queryByText("Email phải đúng định dạng")
      ).not.toBeInTheDocument();
    });
  });

  it("should submit form with correct data", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Form data:", {
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("should not submit form when email is invalid", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "password123");

    expect(submitButton).toBeDisabled();
    await user.click(submitButton);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  it("should not submit form when password is too short", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /đăng nhập/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "12345");

    expect(submitButton).toBeDisabled();
    await user.click(submitButton);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });
});
