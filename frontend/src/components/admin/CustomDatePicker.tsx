import { getMonth, getYear } from 'date-fns'
import ko from 'date-fns/locale/ko'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import {
  AiOutlineCalendar,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai'
import styles from 'styles/admin/components/CustomDatePicker.module.css'

const CustomDatePicker = ({ date, setDate, dateRef }: any) => {
  const years = _.range(2010, getYear(new Date()) + 1, 1)
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  return (
    <div className={styles.container} ref={dateRef}>
      <DatePicker
        className={styles.datepicker}
        selected={date}
        onChange={date => setDate(date)}
        locale={ko}
        dateFormat={'yyyy. MM. dd.'}
        placeholderText={'예시: yyyy.MM.dd.'}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={styles.header}>
            <button
              className={styles.arrowBtn}
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <AiOutlineLeft />
            </button>
            <select
              className={styles.select}
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {years.map(option => (
                <option key={option} value={option}>
                  {`${option}년`}
                </option>
              ))}
            </select>
            <select
              className={styles.select}
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map(option => (
                <option key={option} value={option}>
                  {`${option}월`}
                </option>
              ))}
            </select>
            <button
              className={styles.arrowBtn}
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <AiOutlineRight />
            </button>
          </div>
        )}
      />
      <AiOutlineCalendar className={styles.calendarBtn} />
    </div>
  )
}

export default CustomDatePicker
