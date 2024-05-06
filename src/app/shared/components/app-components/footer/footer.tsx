import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>&#169; 2023 </div>
    </footer>
  );
};

export { Footer };
