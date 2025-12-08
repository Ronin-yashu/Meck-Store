"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Chrome, Facebook, Github } from 'lucide-react';
import { signIn } from "next-auth/react";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/register-mysql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      
      // Auto login after registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error("Please login with your credentials");
        router.push("/login");
      } else {
        router.push("/account");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider) => {
    signIn(provider, { callbackUrl: "/account" });
  };

  return (
    <Box style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      <Container size="2">
        <Flex direction="column" align="center" gap="6">
          <Text size="8" weight="bold">
            Create Account
          </Text>

          <Box
            style={{
              width: "100%",
              maxWidth: "420px",
              borderRadius: "16px",
              border: "1px solid var(--gray-a5)",
              padding: "24px",
              background: "white",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="4">
                {/* Name */}
                <Box>
                  <Text size="2" weight="bold" style={{ marginBottom: '8px', display: 'block' }}>
                    Full Name
                  </Text>
                  <TextField.Root
                    size="3"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <Text size="1" color="red" style={{ marginTop: '4px', display: 'block' }}>
                      {errors.name.message}
                    </Text>
                  )}
                </Box>

                {/* Email */}
                <Box>
                  <Text size="2" weight="bold" style={{ marginBottom: '8px', display: 'block' }}>
                    Email
                  </Text>
                  <TextField.Root
                    size="3"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <Text size="1" color="red" style={{ marginTop: '4px', display: 'block' }}>
                      {errors.email.message}
                    </Text>
                  )}
                </Box>

                {/* Password */}
                <Box>
                  <Text size="2" weight="bold" style={{ marginBottom: '8px', display: 'block' }}>
                    Password
                  </Text>
                  <TextField.Root
                    size="3"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <Text size="1" color="red" style={{ marginTop: '4px', display: 'block' }}>
                      {errors.password.message}
                    </Text>
                  )}
                </Box>

                {/* Confirm Password */}
                <Box>
                  <Text size="2" weight="bold" style={{ marginBottom: '8px', display: 'block' }}>
                    Confirm Password
                  </Text>
                  <TextField.Root
                    size="3"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <Text size="1" color="red" style={{ marginTop: '4px', display: 'block' }}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Box>

                {/* Submit */}
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </Flex>
            </form>

            {/* Divider */}
            <Flex align="center" gap="2" style={{ margin: "20px 0" }}>
              <Box style={{ flex: 1, height: "1px", background: "var(--gray-a5)" }} />
              <Text size="2" color="gray">
                OR
              </Text>
              <Box style={{ flex: 1, height: "1px", background: "var(--gray-a5)" }} />
            </Flex>

            {/* OAuth Buttons */}
            <Flex direction="column" gap="2">
              <Button
                variant="outline"
                size="3"
                onClick={() => handleOAuthSignIn("google")}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <Chrome size={18} />
                <span>Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                size="3"
                onClick={() => handleOAuthSignIn("facebook")}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <Facebook size={18} />
                <span>Continue with Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="3"
                onClick={() => handleOAuthSignIn("github")}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <Github size={18} />
                <span>Continue with GitHub</span>
              </Button>
            </Flex>

            {/* Login Link */}
            <Flex justify="center" style={{ marginTop: "20px" }}>
              <Text size="2" color="gray">
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#667eea", fontWeight: "bold" }}>
                  Login
                </Link>
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default RegisterPage;