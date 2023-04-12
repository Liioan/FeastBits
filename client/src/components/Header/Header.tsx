import { motion } from 'framer-motion';

//. styles
import styles from './Header.module.css';

interface ComponentProps {
  text: string;
  step: string;
}

export default function Header({ text, step }: ComponentProps) {
  return (
    <>
      {step === 'h2' && (
        <motion.h2
          className={styles.h2}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'backInOut' }}
        >
          <span>{text}</span>
        </motion.h2>
      )}
      {step === 'h3' && (
        <motion.h3
          className={styles.h3}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'backInOut' }}
        >
          <span>{text}</span>
        </motion.h3>
      )}
    </>
  );
}
