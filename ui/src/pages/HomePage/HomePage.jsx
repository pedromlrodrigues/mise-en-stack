import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './HomePage.module.css';
import backgroundImage from '../../assets/kitchen-tools-bg.png';

function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchTerm) => {
    navigate(`/recipes?search=${encodeURIComponent(searchTerm)}&page=1`);
  };
  return (
    <main className={styles.mainContent}>
      <img
        src={backgroundImage}
        alt="" // Alt text is empty as the image is purely decorative
        className={styles.backgroundImage}
      />
      <SearchBar onSubmit={handleSearchSubmit} />
    </main>
  );
}

export default HomePage;
