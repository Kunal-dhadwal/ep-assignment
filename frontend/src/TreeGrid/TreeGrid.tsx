import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  _id: string;
  name: string;
  children?: Category[];
}

const TreeGrid: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'old'>('recent');
  const [filteredData, setFilteredData] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    axios
      .get(`/categories?sortOrder=${sortOrder}&page=${currentPage}`)
      .then((response) => {
        const categories: any = Array.isArray(response.data?.data) ? response.data : [];
        setData(categories?.data || []);
        setFilteredData(categories?.data || []);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [sortOrder]);

  const searchCategory = (categories: Category[], term: string): Category[] => {
    if (!Array.isArray(categories)) return [];

    return categories
      .filter((category) => {
        const matches = category.name.toLowerCase().includes(term.toLowerCase());
        const childrenMatch = category.children && searchCategory(category.children, term).length > 0;
        return matches || childrenMatch;
      })
      .map((category) => ({
        ...category,
        children: category.children ? searchCategory(category.children, term) : [],
      }));
  };

  useEffect(() => {
    if (search) {
      const result = searchCategory(data, search);
      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTree = (nodes: Category[] = []) => {
    return nodes.map((node) => (
      <li key={node._id} className="treegrid-item">
        {node.name}
        {node.children?.length !== 0 ? (
          <ul className="treegrid-sublist">{renderTree(node.children)}</ul>
        ) : null}
      </li>
    ));
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return <div className="pagination-controls">{pages}</div>;
  };

  return (
    <div className="treegrid-container">
      <div className="treegrid-header">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="treegrid-search"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'recent' | 'old')}
          className="treegrid-sort"
        >
          <option value="recent">Recent</option>
          <option value="old">Old</option>
        </select>
      </div>

      <ul className="treegrid-list">{renderTree(currentItems)}</ul>

      {renderPagination()}
    </div>
  );
};

export default TreeGrid;
