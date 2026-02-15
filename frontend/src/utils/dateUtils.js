/**
 * Date utilities using date-fns
 */
import { format, parseISO, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format a date string to display format
 * @param {string} dateString - ISO date string
 * @param {string} formatStr - Format string (default: 'dd/MM/yyyy')
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, formatStr = 'dd/MM/yyyy') => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr, { locale: es });
  } catch {
    return dateString;
  }
};

/**
 * Calculate days between two dates
 * @param {string} startDate - Start date ISO string
 * @param {string} endDate - End date ISO string
 * @returns {number} Number of days
 */
export const daysBetween = (startDate, endDate) => {
  return differenceInDays(parseISO(endDate), parseISO(startDate));
};
