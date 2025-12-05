import React from 'react';
import { Box, Container, Text } from '@radix-ui/themes';

export default function ShopPage() {
  return (
    <Box style={{ padding: '100px 0' }}>
      <Container size="4">
        <Text size="8" weight="bold">
          Shop Page - Coming Soon
        </Text>
        <Text size="4" color="gray" style={{ marginTop: '16px' }}>
          This page will show all products with filters and search.
        </Text>
      </Container>
    </Box>
  );
}
