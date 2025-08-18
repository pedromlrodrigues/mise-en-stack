import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    navigate(`/recipes?search=${encodeURIComponent(searchTerm)}`);
  };
  return (
    <>
      <main className={styles.mainContent}>
        <SearchBar onSubmit={handleSearchSubmit} />
      </main>
    </>
  );
}

export default HomePage;
