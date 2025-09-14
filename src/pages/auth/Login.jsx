import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Copy, User } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const demoCredentials = [
    {
      role: "Admin",
      email: "admin@recofy.com",
      password: "recofyadmin@123",
      icon: <User className="w-4 h-4 text-purple-600" />,
    },
    {
      role: "Manager",
      email: "manager@recofy.com",
      password: "recofymanager@123",
      icon: <User className="w-4 h-4 text-blue-600" />,
    },
    {
      role: "User",
      email: "user@recofy.com",
      password: "recofyuser@123",
      icon: <User className="w-4 h-4 text-green-600" />,
    },
  ];

  const copyToClipboard = (text) => {
    navigator?.clipboard?.writeText?.(text);
  };

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
    setErrors({});
    setAuthError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setAuthError("");

    if (!validateForm()) return;

    setLoading(true);

    // Success - redirect to dashboard
    setTimeout(() => {
      setLoading(false);
      navigate("/main-dashboard");
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setAuthError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center bg-indigo-600 rounded-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  className={`pl-10 ${
                    errors?.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">{errors?.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData?.password || ""}
                  onChange={handleInputChange}
                  className={`pl-10 pr-10 ${
                    errors?.password
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="mt-1 text-sm text-red-600">{errors?.password}</p>
              )}
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Authentication Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{authError}</p>
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(authError)}
                        className="text-xs text-red-600 hover:text-red-800 underline"
                      >
                        Copy error message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Do not have an account?{" "}
                <Link
                  to="/auth/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up here
                </Link>
              </span>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center mb-4">
              <h3 className="text-sm font-medium text-gray-700">
                Demo Credentials
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Click to auto-fill login form
              </p>
            </div>
            <div className="space-y-3">
              {demoCredentials?.map?.((cred, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() =>
                    fillDemoCredentials(cred?.email, cred?.password)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {cred?.icon}
                      <span className="text-sm font-medium text-gray-900">
                        {cred?.role}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">
                        {cred?.email}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e?.stopPropagation();
                          copyToClipboard(`${cred?.email} / ${cred?.password}`);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Password: {cred?.password}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
