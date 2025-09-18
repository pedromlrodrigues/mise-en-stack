import Typography from '@mui/material/Typography';

function ResultsFooter({ paginationInfo, dataLength, itemNounPlural = 'items' }) {
  if (!paginationInfo || dataLength === 0) {
    return null;
  }

  const { totalDocuments, currentPage, limit } = paginationInfo;

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = startItem + dataLength - 1;

  return (
    <Typography
      sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
      variant="body1"
      color="text.secondary"
    >
      Showing {startItem}–{endItem} of {totalDocuments} {itemNounPlural}
    </Typography>
  );
}

export default ResultsFooter;
