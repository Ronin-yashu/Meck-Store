"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Box, Container, Flex, Text, Button, Card } from "@radix-ui/themes";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Box style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "80vh" }}>
        <Container size="2">
          <Flex justify="center" align="center" style={{ minHeight: "60vh" }}>
            <Text size="5">Loading...</Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <Box style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "80vh" }}>
      <Container size="2">
        <Flex direction="column" gap="6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Text size="8" weight="bold">
              My Account
            </Text>
          </motion.div>

          {/* Account Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card size="3">
              <Flex direction="column" gap="4">
                {/* Profile Picture / Avatar */}
                <Flex justify="center">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "4px solid var(--gray-a5)",
                      }}
                    />
                  ) : (
                    <Flex
                      align="center"
                      justify="center"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        fontSize: "48px",
                        fontWeight: "bold",
                      }}
                    >
                      {session?.user?.name?.[0]?.toUpperCase() || "U"}
                    </Flex>
                  )}
                </Flex>

                {/* User Info */}
                <Flex direction="column" gap="3" style={{ marginTop: "16px" }}>
                  {/* Name */}
                  <Flex gap="3" align="center">
                    <User size={20} color="#667eea" />
                    <Box>
                      <Text size="2" color="gray" style={{ display: "block" }}>
                        Full Name
                      </Text>
                      <Text size="4" weight="bold">
                        {session?.user?.name || "Not provided"}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Email */}
                  <Flex gap="3" align="center">
                    <Mail size={20} color="#667eea" />
                    <Box>
                      <Text size="2" color="gray" style={{ display: "block" }}>
                        Email
                      </Text>
                      <Text size="4" weight="bold">
                        {session?.user?.email}
                      </Text>
                    </Box>
                  </Flex>

                  {/* Role */}
                  <Flex gap="3" align="center">
                    <Shield size={20} color="#667eea" />
                    <Box>
                      <Text size="2" color="gray" style={{ display: "block" }}>
                        Role
                      </Text>
                      <Text size="4" weight="bold" style={{ textTransform: "capitalize" }}>
                        {session?.user?.role || "customer"}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>

                {/* Divider */}
                <Box
                  style={{
                    height: "1px",
                    background: "var(--gray-a5)",
                    margin: "16px 0",
                  }}
                />

                {/* Logout Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="3"
                    variant="outline"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      borderColor: "#ef4444",
                      color: "#ef4444",
                    }}
                  >
                    <LogOut size={18} />
                    Sign Out
                  </Button>
                </motion.div>
              </Flex>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <Flex direction="column" gap="3">
                <Text size="5" weight="bold">
                  Quick Links
                </Text>
                <Flex direction="column" gap="2">
                  <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
                    My Orders
                  </Button>
                  <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
                    Wishlist
                  </Button>
                  <Button variant="ghost" style={{ justifyContent: "flex-start" }}>
                    Settings
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </motion.div>
        </Flex>
      </Container>
    </Box>
  );
}