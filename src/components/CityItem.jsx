import styles from './CityItem.module.css';
export default function CityItem({ city, selected, onClick }) {
    console.log('CityItem rendered', city.cityName, selected);
    return (
        <>
            <li className={`${styles.cityItem} ${selected ? styles['cityItem--active'] : ''}`} onClick={() => onClick(city)}>
                <div className={styles.cityInfoSection}>
                    <span className={styles.emoji}>{city.emoji}</span>
                    <span className={styles.name}>{city.cityName}</span>
                </div>
                <div className={styles.cityInfoSection}>
                    <span className={styles.date}>({new Date(city.date).toLocaleDateString()})</span>
                    <button className={styles.deleteBtn}>×</button>
                </div>
            </li>
        </>
    )
}
