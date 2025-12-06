"use client"
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Box, Container, Flex, Text, TextField, Select, Button, IconButton, Separator, Badge, Card } from '@radix-ui/themes';
import { MagnifyingGlassIcon, MixerHorizontalIcon, Cross2Icon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { ShopProvider, useShop } from '@/contexts/ShopContext';

// Memoized Search Bar Component
const SearchBar = memo(({ onSearch }) => {
  const { filters, updateFilter } = useShop();
  const [localSearch, setLocalSearch] = useState(filters.search);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    updateFilter('search', localSearch);
  }, [localSearch, updateFilter]);

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: '250px' }}>
      <TextField.Root
        size="3"
        placeholder="Search products..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon width="18" height="18" />
        </TextField.Slot>
        <TextField.Slot>
          <Button size="1" type="submit" variant="soft">
            Search
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
});

SearchBar.displayName = 'SearchBar';

// Memoized Sort Select Component
const SortSelect = memo(() => {
  const { filters, updateFilter } = useShop();

  const handleChange = useCallback((value) => {
    updateFilter('sort', value);
  }, [updateFilter]);

  return (
    <Select.Root value={filters.sort} onValueChange={handleChange}>
      <Select.Trigger style={{ minWidth: '200px' }} />
      <Select.Content>
        <Select.Item value="newest">Newest First</Select.Item>
        <Select.Item value="price-low">Price: Low to High</Select.Item>
        <Select.Item value="price-high">Price: High to Low</Select.Item>
        <Select.Item value="rating">Highest Rated</Select.Item>
        <Select.Item value="name">Name: A to Z</Select.Item>
      </Select.Content>
    </Select.Root>
  );
});

SortSelect.displayName = 'SortSelect';

// Memoized Filter Sidebar Component
const FilterSidebar = memo(({ show, onClose, availableFilters }) => {
  const { filters, updateFilter, clearFilters } = useShop();

  const handleCategoryChange = useCallback((value) => {
    updateFilter('category', value);
  }, [updateFilter]);

  const handleBrandChange = useCallback((value) => {
    updateFilter('brand', value);
  }, [updateFilter]);

  const handleMinPriceChange = useCallback((e) => {
    updateFilter('minPrice', e.target.value);
  }, [updateFilter]);

  const handleMaxPriceChange = useCallback((e) => {
    updateFilter('maxPrice', e.target.value);
  }, [updateFilter]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -250, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        style={{
          padding: '24px',
          position: 'sticky',
          top: '100px',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto'
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Text size="5" weight="bold">Filters</Text>
          <IconButton variant="ghost" onClick={onClose}>
            <Cross2Icon width="18" height="18" />
          </IconButton>
        </Flex>

        <Flex direction="column" gap="4">
          {/* Category Filter */}
          <Box>
            <Text size="3" weight="bold" mb="2" as="div">
              Category
            </Text>
            <Select.Root value={filters.category} onValueChange={handleCategoryChange}>
              <Select.Trigger style={{ width: '100%' }} />
              <Select.Content>
                <Select.Item value="all">All Categories</Select.Item>
                {availableFilters.categories.map((cat) => (
                  <Select.Item key={cat} value={cat}>{cat}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <Separator size="4" />

          {/* Brand Filter */}
          <Box>
            <Text size="3" weight="bold" mb="2" as="div">
              Brand
            </Text>
            <Select.Root value={filters.brand} onValueChange={handleBrandChange}>
              <Select.Trigger style={{ width: '100%' }} />
              <Select.Content>
                <Select.Item value="all">All Brands</Select.Item>
                {availableFilters.brands.map((brand) => (
                  <Select.Item key={brand} value={brand}>{brand}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Box>

          <Separator size="4" />

          {/* Price Range */}
          <Box>
            <Text size="3" weight="bold" mb="2" as="div">
              Price Range
            </Text>
            <Flex gap="2" direction="column">
              <TextField.Root
                size="2"
                placeholder="Min Price"
                type="number"
                value={filters.minPrice}
                onChange={handleMinPriceChange}
              />
              <TextField.Root
                size="2"
                placeholder="Max Price"
                type="number"
                value={filters.maxPrice}
                onChange={handleMaxPriceChange}
              />
            </Flex>
          </Box>

          <Separator size="4" />

          {/* Clear Filters */}
          <Button
            size="2"
            variant="outline"
            onClick={clearFilters}
            style={{ width: '100%' }}
          >
            Clear All Filters
          </Button>
        </Flex>
      </Card>
    </motion.div>
  );
});

FilterSidebar.displayName = 'FilterSidebar';

// Memoized Product Grid Component
const ProductGrid = memo(({ products, loading }) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: '400px' }}>
        <Text size="5">Loading products...</Text>
      </Flex>
    );
  }

  if (products.length === 0) {
    return (
      <Flex direction="column" align="center" gap="4" style={{ minHeight: '400px', paddingTop: '80px' }}>
        <Text size="6" weight="bold">No products found</Text>
        <Text size="3" color="gray">Try adjusting your filters</Text>
      </Flex>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(index * 0.03, 0.5) }}
          layout
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

// Memoized Pagination Component
const Pagination = memo(({ pagination }) => {
  const { filters, setPage } = useShop();
  const currentPage = filters.page;

  const handlePageChange = useCallback((page) => {
    setPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      if (
        i === 1 ||
        i === pagination.totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages.filter((item, index, arr) => arr.indexOf(item) === index);
  }, [pagination.totalPages, currentPage]);

  if (pagination.totalPages <= 1) return null;

  return (
    <Flex justify="center" align="center" gap="2">
      <IconButton
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon width="18" height="18" />
      </IconButton>

      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <Text key={`ellipsis-${index}`} size="3">...</Text>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'solid' : 'outline'}
            onClick={() => handlePageChange(page)}
            style={{
              minWidth: '40px',
              background: currentPage === page 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : undefined
            }}
          >
            {page}
          </Button>
        )
      )}

      <IconButton
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pagination.totalPages}
      >
        <ChevronRightIcon width="18" height="18" />
      </IconButton>
    </Flex>
  );
});

Pagination.displayName = 'Pagination';

// Main Shop Content Component
const ShopContentInner = () => {
  const { filters } = useShop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableFilters, setAvailableFilters] = useState({ categories: [], brands: [] });
  const [pagination, setPagination] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: filters.page,
        sort: filters.sort,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      });

      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.brand && filters.brand !== 'all') params.append('brand', filters.brand);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/shop?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setAvailableFilters(data.filters);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.brand !== 'all') count++;
    if (filters.search) count++;
    if (filters.minPrice !== '0' || filters.maxPrice !== '100000') count++;
    return count;
  }, [filters]);

  return (
    <Box style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
      <Container size="4">
        {/* Header */}
        <Flex direction="column" gap="4" mb="6">
          <Flex justify="between" align="center" wrap="wrap" gap="4">
            <Text size="8" weight="bold">Shop</Text>
            <Badge size="2" variant="soft">
              {pagination.totalProducts || 0} Products
            </Badge>
          </Flex>

          {/* Search and Sort Bar */}
          <Flex gap="3" wrap="wrap" align="end">
            <SearchBar />
            <SortSelect />

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <MixerHorizontalIcon width="18" height="18" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge size="1" ml="1">{activeFiltersCount}</Badge>
              )}
            </Button>
          </Flex>
        </Flex>

        <div style={{ display: 'grid', gridTemplateColumns: showFilters ? '250px 1fr' : '1fr', gap: '32px' }}>
          {/* Filters Sidebar */}
          <AnimatePresence>
            <FilterSidebar
              show={showFilters}
              onClose={() => setShowFilters(false)}
              availableFilters={availableFilters}
            />
          </AnimatePresence>

          {/* Products Section */}
          <Box>
            <ProductGrid products={products} loading={loading} />
            <Pagination pagination={pagination} />
          </Box>
        </div>
      </Container>
    </Box>
  );
};

// Wrapper with Context Provider
const ShopContent = () => {
  return (
    <ShopProvider>
      <ShopContentInner />
    </ShopProvider>
  );
};

export default ShopContent;
