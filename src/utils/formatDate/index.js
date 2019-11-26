export default (date) => date.split('-').length === 1 ? `${date}-01-01` : date

