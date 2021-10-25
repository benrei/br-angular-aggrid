const filters = [
  { title: 'All' },
  {
    title: 'Brand Toyota',
    filterModel: {
      brand: { filterType: 'text', type: 'contains', filter: 'Toyota' },
    },
  },
  {
    title: 'Brand Ford',
    filterModel: {
      brand: { filterType: 'text', type: 'contains', filter: 'Ford' },
    },
  },
];
export default filters;
