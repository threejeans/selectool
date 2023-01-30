import styles from 'styles/components/Spinner.module.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Spinner = () => {
  return <AiOutlineLoading3Quarters className={styles.loader} />
}

export default Spinner
