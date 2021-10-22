const filters = [
  { title: 'All' },
  {
    title: 'Brand Toyota',
    filterModel: {
      brand: { filterType: 'text', type: 'contains', filter: 'Toyota' }
    }
  }
];
export default filters;
