"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Box, Container, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!result) {
        toast.error("Something went wrong.");
        return;
      }

      if (result.error) {
        toast.error(result.error || "Invalid credentials");
      } else {
        toast.success("Logged in successfully!");
        router.push("/account");
      }
    },
    [router]
  );

  const handleOAuthSignIn = useCallback((provider) => {
    signIn(provider, { callbackUrl: "/account" });
  }, []);

  return (
    <Box style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      <Container size="2">
        <Flex direction="column" align="center" gap="6">
          <Text size="8" weight="bold">
            Login
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
                {/* Email */}
                <Box>
                  <Text size="2" weight="bold">
                    Email
                  </Text>
                  <TextField.Root
                    size="3"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <Text size="1" color="red">
                      {errors.email.message}
                    </Text>
                  )}
                </Box>

                {/* Password */}
                <Box>
                  <Text size="2" weight="bold">
                    Password
                  </Text>
                  <TextField.Root
                    size="3"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <Text size="1" color="red">
                      {errors.password.message}
                    </Text>
                  )}
                </Box>

                {/* Submit */}
                <Button
                  type="submit"
                  size="3"
                  disabled={isSubmitting}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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
                style={{ width: "100%" }}
              >
                <FcGoogle />
                <span>Continue with Google</span>
              </Button>
              <Button
                variant="outline"
                size="3"
                onClick={() => handleOAuthSignIn("facebook")}
                style={{ width: "100%" }}
              >
                <FaFacebook />
                <span>Continue with Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="3"
                onClick={() => handleOAuthSignIn("github")}
                style={{ width: "100%" }}
              >
                <FaGithub />
                <span>Continue with GitHub</span>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LoginPage;
